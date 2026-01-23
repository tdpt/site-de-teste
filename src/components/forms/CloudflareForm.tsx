import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Paperclip, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

interface Attachment {
  content: string;
  filename: string;
  type: string;
}

const CloudflareForm = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:*/*;base64, prefix
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "❌ Ficheiro demasiado grande",
        description: "O ficheiro deve ter no máximo 5MB.",
        variant: "destructive"
      });
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "❌ Tipo de ficheiro não permitido",
        description: "Apenas PDF, imagens (JPG, PNG, WebP), Word e Excel são aceites.",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const messageHtml = `
        <h2>Novo contacto do site</h2>
        <p><strong>Nome:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Empresa:</strong> ${formData.company || "Não indicada"}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
      `;

      let attachments: Attachment[] = [];
      if (selectedFile) {
        const base64Content = await fileToBase64(selectedFile);
        attachments = [{
          content: base64Content,
          filename: selectedFile.name,
          type: selectedFile.type
        }];
      }

      const response = await fetch("https://form-handler.tecladigital.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to_email: "tecladigital@gmail.com",
          from_name: "Site de Teste",
          reply_to: formData.email,
          subject: `Novo contacto do site | ${formData.name}`,
          message_html: messageHtml,
          attachments: attachments.length > 0 ? attachments : undefined
        })
      });

      const responseText = await response.text();
      console.log("Cloudflare Response:", response.status, responseText);

      if (response.ok) {
        toast({
          title: "✅ Mensagem enviada!",
          description: "A sua mensagem foi enviada com sucesso."
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          message: ""
        });
        setSelectedFile(null);
        setAcceptedPrivacy(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        console.error("Cloudflare Error:", response.status, responseText);
        throw new Error(responseText || "Erro no envio");
      }
    } catch (error) {
      console.error("Cloudflare Exception:", error);
      toast({
        title: "❌ Erro no envio",
        description: error instanceof Error ? error.message : "Erro desconhecido. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-secondary rounded-2xl p-6 lg:p-8">
      <h3 className="text-xl font-semibold text-foreground mb-6">Formulário de Contacto (CloudFlare)</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Nome *" className="bg-card" />
        </div>
        <div>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email *" className="bg-card" />
        </div>
        <div>
          <Input name="company" value={formData.company} onChange={handleChange} placeholder="Empresa" className="bg-card" />
        </div>
        <div>
          <Textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Mensagem *" rows={4} className="bg-card resize-none" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 px-4 py-2 bg-card border border-input rounded-md cursor-pointer hover:bg-accent transition-colors text-sm text-muted-foreground"
            >
              <Paperclip className="h-4 w-4" />
              Anexar ficheiro
            </label>
            <span className="text-xs text-muted-foreground">
              (PDF, imagens, Word, Excel - máx. 5MB)
            </span>
          </div>
          {selectedFile && (
            <div className="mt-2 flex items-center gap-2 bg-card px-3 py-2 rounded-md border border-input">
              <Paperclip className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground flex-1 truncate">{selectedFile.name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="privacy-policy"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            required
            className="mt-1 h-4 w-4 rounded border-input accent-primary"
          />
          <label htmlFor="privacy-policy" className="text-sm text-muted-foreground">
            Li e aceito a{" "}
            <a href="#" className="text-primary underline hover:text-primary/80 transition-colors">
              política de privacidade
            </a>
          </label>
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting || !acceptedPrivacy}>
          {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
        </Button>
      </form>
    </div>
  );
};

export default CloudflareForm;
