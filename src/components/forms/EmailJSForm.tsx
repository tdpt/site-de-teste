import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
const EmailJSForm = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const SERVICE_ID = "service_j9blovp";
      const TEMPLATE_ID = "template_eec1gdh";
      const PUBLIC_KEY = "R02ysBh1ZYQjkiNuh";
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: {
            to: "info@tecladigital.info",
            title: "Nova mensagem do formulário de contacto | Site de Teste",
            name: formData.name,
            email: formData.email,
            message: [`Nome: ${formData.name}`, `Email: ${formData.email}`, `Empresa: ${formData.company || "Não indicada"}`, `Mensagem: ${formData.message}`].join("\n")
          }
        })
      });
      const responseText = await response.text();
      console.log("EmailJS Response:", response.status, responseText);
      if (response.ok) {
        toast({
          title: "✅ EmailJS - Sucesso!",
          description: "Mensagem enviada via EmailJS."
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          message: ""
        });
      } else {
        console.error("EmailJS Error:", response.status, responseText);
        throw new Error(responseText || "Erro no envio");
      }
    } catch (error) {
      console.error("EmailJS Exception:", error);
      toast({
        title: "❌ EmailJS - Erro",
        description: error instanceof Error ? error.message : "Erro desconhecido. Verifique a consola.",
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
      <h3 className="text-xl font-semibold text-foreground mb-6">Formulário de Contacto (EmailJS)</h3>
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
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
        </Button>
      </form>
    </div>
  );
};
export default EmailJSForm;