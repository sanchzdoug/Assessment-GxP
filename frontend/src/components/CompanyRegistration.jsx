import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, Building, Users, ArrowRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    segment: '',
    size: '',
    employees: '',
    type: 'headquarters' // headquarters or branch
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const segments = [
    "Farmacêutico",
    "Biotecnologia", 
    "Dispositivos Médicos",
    "Veterinário",
    "Cosméticos",
    "Químico",
    "Organização de Pesquisa por Contrato (CRO)",
    "Organização de Fabricação por Contrato (CMO)"
  ];

  const companySizes = [
    { value: "startup", label: "Startup (1-50 funcionários)", employees: "1-50" },
    { value: "small", label: "Pequeno (51-200 funcionários)", employees: "51-200" },
    { value: "medium", label: "Médio (201-1000 funcionários)", employees: "201-1000" },
    { value: "large", label: "Grande (1001-5000 funcionários)", employees: "1001-5000" },
    { value: "enterprise", label: "Corporação (5000+ funcionários)", employees: "5000+" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.companyName || !formData.cnpj || !formData.segment || !formData.companySize) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store company data in localStorage (mock)
      localStorage.setItem('companyData', JSON.stringify(formData));
      
      toast.success("Empresa registrada com sucesso!");
      
      // Navigate to assessment
      setTimeout(() => {
        navigate('/assessment');
      }, 1000);
      
    } catch (error) {
      toast.error("Falha no registro. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="px-6 py-4 backdrop-blur-xl bg-white/90 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            
            <img src="/softexpert-logo.svg" alt="SoftExpert" className="h-8" />
          </Link>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Voltar para Início
            </Button>
          </Link>
        </div>
      </nav>

      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-space-grotesk font-bold text-foreground">
              Registro da Empresa
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conte-nos sobre sua organização para personalizar sua experiência de assessment de compliance GxP.
            </p>
          </div>

          {/* Registration Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Building className="h-5 w-5" />
                Informações da Organização
              </CardTitle>
              <CardDescription>
                Forneça informações básicas sobre sua organização de Life Sciences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome da Empresa */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-foreground font-medium">
                    Nome da Empresa *
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Digite o nome da sua empresa"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    required
                    className="bg-background border-border"
                  />
                </div>

                {/* CNPJ */}
                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="text-foreground font-medium">
                    CNPJ *
                  </Label>
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={(e) => updateFormData('cnpj', e.target.value)}
                    required
                    className="bg-background border-border"
                  />
                </div>

                {/* Segmento Industrial */}
                <div className="space-y-2">
                  <Label htmlFor="segment" className="text-foreground font-medium">
                    Segmento Industrial *
                  </Label>
                  <Select value={formData.segment} onValueChange={(value) => updateFormData('segment', value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecione seu segmento industrial" />
                    </SelectTrigger>
                    <SelectContent>
                      {segments.map((segment) => (
                        <SelectItem key={segment} value={segment}>
                          {segment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Type */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">Tipo de Organização *</Label>
                  <RadioGroup 
                    value={formData.type} 
                    onValueChange={(value) => updateFormData('type', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="headquarters" id="headquarters" />
                      <Label htmlFor="headquarters" className="text-foreground">Matriz</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="branch" id="branch" />
                      <Label htmlFor="branch" className="text-foreground">Filial/Subsidiária</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Porte da Empresa */}
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-foreground font-medium">
                    Porte da Empresa *
                  </Label>
                  <Select value={formData.companySize} onValueChange={(value) => updateFormData('companySize', value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecione o porte da empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Exact Employee Count */}
                <div className="space-y-2">
                  <Label htmlFor="employees" className="text-foreground font-medium">
                    Número de Funcionários
                    <span className="text-muted-foreground font-normal ml-1">(Opcional)</span>
                  </Label>
                  <Input
                    id="employees"
                    type="number"
                    placeholder="Digite o número exato de funcionários"
                    value={formData.employees}
                    onChange={(e) => updateFormData('employees', e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-4">
                  <Link to="/">
                    <Button variant="outline" type="button">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Voltar
                    </Button>
                  </Link>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-hover shadow-glow group"
                  >
                    {isSubmitting ? (
                      <>Configurando seu assessment...</>
                    ) : (
                      <>
                        Continuar para Assessment
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mt-8 bg-primary-light border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">O que acontece a seguir?</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Após o registro, você prosseguirá para nosso assistente de assessment abrangente cobrindo 12 áreas-chave de compliance GxP. 
                    O assessment normalmente leva 30-45 minutos para completar e pode ser salvo e retomado a qualquer momento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;