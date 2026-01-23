import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CloudflareForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const response = await fetch("https://form-handler.tecladigital.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to_email: "tecladigital@gmail.com",
          from_name: "Site de Teste",
          reply_to: formData.email,
          subject: `Novo contacto do site | ${formData.name}`,
          message_html: messageHtml,
        }),
      });

      const responseText = await response.text();
      console.log("Cloudflare Response:", response.status, responseText);

      if (response.ok) {
        toast({
          title: "✅ Mensagem enviada!",
          description: "A sua mensagem foi enviada com sucesso.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        console.error("Cloudflare Error:", response.status, responseText);
        throw new Error(responseText || "Erro no envio");
      }
    } catch (error) {
      console.error("Cloudflare Exception:", error);
      toast({
        title: "❌ Erro no envio",
        description: error instanceof Error ? error.message : "Erro desconhecido. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-secondary rounded-2xl p-6 lg:p-8">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Formulário de Contacto
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nome *"
            className="bg-card"
          />
        </div>
        <div>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email *"
            className="bg-card"
          />
        </div>
        <div>
          <Input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Empresa"
            className="bg-card"
          />
        </div>
        <div>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Mensagem *"
            rows={4}
            className="bg-card resize-none"
          />
        </div>
        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
        </Button>
      </form>
    </div>
  );
};

export default CloudflareForm;
