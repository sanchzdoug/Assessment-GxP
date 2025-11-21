import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, BarChart3, Users, FileText, TrendingUp, Award, 
  CheckCircle, ArrowRight, Building, Beaker, Microscope,
  Pill, Syringe, FlaskConical
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/softexpert-logo.svg" alt="SoftExpert" className="h-8" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">
              Recursos
            </a>
            <a href="#industries" className="text-muted-foreground hover:text-foreground transition-smooth">
              Indústrias
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary hover:bg-primary-hover shadow-glow">
                Iniciar Assessment
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit bg-primary-light border-primary/20 text-primary">
                  ✨ Confiado por 500+ Empresas de Life Sciences
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-space-grotesk font-bold text-foreground leading-tight">
                  Transforme Seu <span className="bg-gradient-primary bg-clip-text text-transparent">Compliance GxP</span> Assessment
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Plataforma digital abrangente para avaliar a maturidade operacional, regulatória e tecnológica de sua organização de Life Sciences. Obtenha insights acionáveis, identifique gaps críticos e impulsione a excelência regulatória.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover shadow-glow group">
                    Iniciar Assessment Gratuito
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                    Ver Dashboard Demo
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">Sem configuração necessária</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">Segurança padrão da indústria</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=800&fit=crop" 
                  alt="Profissional de Life Sciences"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Score de Compliance</div>
                      <div className="text-2xl font-bold text-foreground">94%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-space-grotesk font-bold text-foreground">
              Plataforma de Assessment Abrangente
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para avaliar, rastrear e melhorar sua postura de compliance GxP em todas as áreas de negócio críticas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:border-primary/50 transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Assessment de Compliance GxP</CardTitle>
                <CardDescription>
                  Avaliação abrangente em todos os frameworks regulatórios incluindo 21 CFR Part 11, EU GMP Annex 11, e RDC 658/2022.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border hover:border-primary/50 transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pontuação de Maturidade & Analytics</CardTitle>
                <CardDescription>
                  Algoritmos de pontuação avançados fornecem insights detalhados sobre maturidade operacional, regulatória e tecnológica.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border hover:border-primary/50 transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Assessment Multi-Área</CardTitle>
                <CardDescription>
                  Avalie Qualidade, Validação, TI, Produção, Supply Chain e mais de 10 áreas críticas de negócio.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border hover:border-primary/50 transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mapeamento de Sistemas & Análise de Custos</CardTitle>
                <CardDescription>
                  Inventário completo de sistemas corporativos (ERP, MES, LIMS, QMS) com análise detalhada de custos e ROI.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border hover:border-primary/50 transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Relatórios Automatizados</CardTitle>
                <CardDescription>
                  Gere relatórios PDF profissionais com scores, análise de gaps, avaliação de riscos e recomendações acionáveis.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border hover:border-primary/50 transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Benchmarking da Indústria</CardTitle>
                <CardDescription>
                  Compare a maturidade de sua organização com padrões da indústria e pares concorrentes em seu setor.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-space-grotesk font-bold text-foreground">
              Construído para Life Sciences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Frameworks de assessment especializados para cada segmento da indústria de Life Sciences.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Farmacêutico', icon: Pill },
              { name: 'Biotecnologia', icon: Microscope },
              { name: 'Dispositivos Médicos', icon: Syringe },
              { name: 'Veterinário', icon: Beaker },
              { name: 'Cosméticos', icon: FlaskConical },
              { name: 'Químico', icon: Building }
            ].map((industry, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-smooth cursor-pointer">
                <CardContent className="p-6 text-center">
                  <industry.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-sm font-medium text-foreground">{industry.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/softexpert-logo.svg" alt="SoftExpert" className="h-6" />
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 SoftExpert. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;