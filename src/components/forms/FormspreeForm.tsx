import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FormspreeForm = () => {
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
      // Replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "✅ Formspree - Sucesso!",
          description: "Mensagem enviada via Formspree.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error("Erro no envio");
      }
    } catch (error) {
      toast({
        title: "❌ Formspree - Erro",
        description: "Configure o FORM_ID no código. Registe-se em formspree.io",
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
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <h3 className="text-lg font-semibold text-foreground">
          Formspree
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Simples, sem backend. Basta criar conta e obter o Form ID.
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
          {isSubmitting ? "A enviar..." : "Enviar via Formspree"}
        </Button>
      </form>
    </div>
  );
};

export default FormspreeForm;
