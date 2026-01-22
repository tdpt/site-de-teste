import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Web3FormsForm = () => {
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
      const ACCESS_KEY = "b884d851-4e40-4058-bcea-c2db05f78661";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          to: "info@tecladigital.info",
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          subject: "Nova mensagem do website - Tecla Digital",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "✅ Web3Forms - Sucesso!",
          description: "Mensagem enviada via Web3Forms.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error("Erro no envio");
      }
    } catch (error) {
      toast({
        title: "❌ Web3Forms - Erro",
        description: "Configure o ACCESS_KEY no código. Registe-se em web3forms.com",
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
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <h3 className="text-lg font-semibold text-foreground">
          Web3Forms
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Gratuito até 250 submissões/mês. Apenas precisa de uma Access Key.
      </p>
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
          {isSubmitting ? "A enviar..." : "Enviar via Web3Forms"}
        </Button>
      </form>
    </div>
  );
};

export default Web3FormsForm;
