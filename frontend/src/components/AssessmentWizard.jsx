import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, ChevronLeft, ChevronRight, CheckCircle, 
  AlertCircle, BookOpen, BarChart3, Save 
} from 'lucide-react';
import { toast } from 'sonner';

const AssessmentWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const assessmentAreas = [
    {
      id: 'quality',
      name: 'Garantia da Qualidade',
      description: 'Sistemas de gestão da qualidade, documentação e processos de compliance',
      weight: 20,
      questions: [
        { id: 'q1', text: 'Existe Política de Qualidade atualizada e comunicada?', category: 'Política e Documentação' },
        { id: 'q2', text: 'Os processos críticos possuem Procedimentos Operacionais Padrão vigentes?', category: 'Procedimentos' },
        { id: 'q3', text: 'O sistema de Gestão da Qualidade possui indicadores definidos e monitorados?', category: 'Indicadores' },
        { id: 'q4', text: 'Há revisão da qualidade pela alta direção?', category: 'Revisão Gerencial' },
        { id: 'q5', text: 'Documentos críticos possuem controle de versão?', category: 'Controle de Documentos' },
        { id: 'q6', text: 'Documentos eletrônicos possuem trilha de auditoria completa?', category: 'Integridade de Dados' },
        { id: 'q7', text: 'Há metodologia formal de Gestão de Riscos da Qualidade?', category: 'Gestão de Riscos' },
        { id: 'q8', text: 'Riscos são revisados periodicamente?', category: 'Gestão de Riscos' },
        { id: 'q9', text: 'Desvios são registrados de forma estruturada?', category: 'Gestão de Desvios' },
        { id: 'q10', text: 'CAPAs possuem avaliação formal de eficácia?', category: 'CAPA' },
        { id: 'q11', text: 'Existe processo estruturado de Gestão de Mudanças?', category: 'Gestão de Mudanças' },
        { id: 'q12', text: 'Mudanças críticas são avaliadas pela Qualidade?', category: 'Gestão de Mudanças' },
        { id: 'q13', text: 'Auditorias internas são planejadas e executadas?', category: 'Auditoria Interna' },
        { id: 'q14', text: 'Fornecedores críticos são avaliados e auditados?', category: 'Qualificação de Fornecedores' },
        { id: 'q15', text: 'Há matriz de competência por função?', category: 'Treinamento' },
        { id: 'q16', text: 'Treinamentos críticos possuem avaliação obrigatória?', category: 'Treinamento' },
        { id: 'q17', text: 'Resultados de treinamento são rastreáveis eletronicamente?', category: 'Treinamento' },
        { id: 'q18', text: 'Existe política formal de integridade de dados (ALCOA+)?', category: 'Integridade de Dados' },
        { id: 'q19', text: 'Auditorias de integridade são realizadas periodicamente?', category: 'Integridade de Dados' },
        { id: 'q20', text: 'O sistema de qualidade está alinhado à RDC 658/2022?', category: 'Conformidade Regulatória' },
        { id: 'q21', text: 'Há conformidade com IN 134/2022 e IN 138/2022?', category: 'Conformidade Regulatória' },
        { id: 'q22', text: 'Fluxos BPx possuem registros completos e auditáveis?', category: 'Boas Práticas' },
        { id: 'q23', text: 'Parâmetros ambientais são controlados e monitorados?', category: 'Controle Ambiental' },
        { id: 'q24', text: 'Documentação de lote é revisada antes da liberação?', category: 'Liberação de Lotes' },
        { id: 'q25', text: 'Registros de lote possuem rastreabilidade ponta a ponta?', category: 'Rastreabilidade' },
        { id: 'q26', text: 'A empresa possui gestão de lições aprendidas?', category: 'Melhoria Contínua' },
        { id: 'q27', text: 'Há programa formal de melhoria contínua?', category: 'Melhoria Contínua' },
        { id: 'q28', text: 'Comunicados de qualidade são registrados e acompanhados?', category: 'Comunicação' }
      ]
    },
    {
      id: 'validation',
      name: 'Validação de Sistemas',
      description: 'Validação de sistemas computadorizados, GAMP 5 e conformidade Part 11',
      weight: 15,
      questions: [
        { id: 'v1', text: 'Existe Política de Validação vigente?', category: 'Política de Validação' },
        { id: 'v2', text: 'Há inventário atualizado de sistemas computadorizados?', category: 'Inventário de Sistemas' },
        { id: 'v3', text: 'Os sistemas são classificados quanto ao impacto GxP?', category: 'Classificação GxP' },
        { id: 'v4', text: 'Requisitos do usuário (URS) são elaborados formalmente?', category: 'Especificações' },
        { id: 'v5', text: 'Especificações funcionais e técnicas são mantidas atualizadas?', category: 'Especificações' },
        { id: 'v6', text: 'Existe matriz de rastreabilidade completa?', category: 'Rastreabilidade' },
        { id: 'v7', text: 'Análises de risco seguem GAMP 5?', category: 'Análise de Riscos' },
        { id: 'v8', text: 'Riscos são revisados por mudança?', category: 'Análise de Riscos' },
        { id: 'v9', text: 'Testes seguem padrões de QI/QO/QD?', category: 'Testes de Qualificação' },
        { id: 'v10', text: 'Evidências de teste são auditáveis e rastreáveis?', category: 'Evidências de Teste' },
        { id: 'v11', text: 'Execução de testes é controlada por sistema?', category: 'Controle de Testes' },
        { id: 'v12', text: 'Há autenticação individual para cada usuário?', category: 'Segurança' },
        { id: 'v13', text: 'Trilhas de auditoria são completas e imutáveis?', category: 'Auditoria' },
        { id: 'v14', text: 'Assinaturas eletrônicas cumprem requisitos regulatórios?', category: '21 CFR Part 11' },
        { id: 'v15', text: 'Sessões possuem controle de tempo e travamento?', category: 'Segurança' },
        { id: 'v16', text: 'Mudanças são avaliadas quanto ao impacto na validação?', category: 'Gestão de Mudanças' },
        { id: 'v17', text: 'Atualizações, releases e patches passam por revisão?', category: 'Gestão de Mudanças' },
        { id: 'v18', text: 'Backup e restauração são validados?', category: 'Backup e Recuperação' },
        { id: 'v19', text: 'Há plano de recuperação de desastres testado?', category: 'Continuidade' },
        { id: 'v20', text: 'Dados são retidos conforme legislação?', category: 'Retenção de Dados' },
        { id: 'v21', text: 'Existe processo de manutenção do estado validado?', category: 'Estado Validado' },
        { id: 'v22', text: 'Revisões periódicas de validação são executadas?', category: 'Revisão Periódica' },
        { id: 'v23', text: 'Fornecedores de serviços em nuvem são avaliados?', category: 'Cloud Computing' },
        { id: 'v24', text: 'Contratos de nuvem abordam requisitos regulatórios?', category: 'Cloud Computing' },
        { id: 'v25', text: 'Integrações entre sistemas são validadas?', category: 'Integrações' },
        { id: 'v26', text: 'Logs de integrações são monitorados?', category: 'Integrações' },
        { id: 'v27', text: 'Segurança cibernética integra o processo de validação?', category: 'Segurança Cibernética' },
        { id: 'v28', text: 'Vulnerabilidades são tratadas formalmente?', category: 'Segurança Cibernética' },
        { id: 'v29', text: 'Arquivamento segue práticas regulamentares?', category: 'Arquivamento' },
        { id: 'v30', text: 'Sistemas descontinuados possuem plano formal de encerramento?', category: 'Encerramento' }
      ]
    },
    {
      id: 'it',
      name: 'Information Technology',
      description: 'IT infrastructure, systems management, and technical controls',
      weight: 15,
      questions: [
        {
          id: 'it1',
          text: 'Inventário de hardware e software existe e está atualizado?',
          category: 'Asset Management'
        },
        {
          id: 'it2',
          text: 'Ambientes segregados DEV/QA/PRD estão estabelecidos?',
          category: 'Environment Management'
        },
        {
          id: 'it3',
          text: 'Backups possuem teste de restauração periódico?',
          category: 'Backup & Recovery'
        },
        {
          id: 'it4',
          text: 'Atualizações e patches seguem governança?',
          category: 'Patch Management'
        },
        {
          id: 'it5',
          text: 'Network, banco e servidores possuem monitoramento contínuo?',
          category: 'Infrastructure Monitoring'
        },
        {
          id: 'it6',
          text: 'Existe controle de acesso baseado em papéis (RBAC)?',
          category: 'Access Control'
        },
        {
          id: 'it7',
          text: 'Sistemas críticos possuem redundância e alta disponibilidade?',
          category: 'High Availability'
        },
        {
          id: 'it8',
          text: 'Há SLA formal com áreas de negócio?',
          category: 'Service Management'
        }
      ]
    },
    {
      id: 'security',
      name: 'Information Security',
      description: 'Cybersecurity, data protection, and security controls',
      weight: 15,
      questions: [
        {
          id: 's1',
          text: 'Política de Segurança está vigente?',
          category: 'Security Policy'
        },
        {
          id: 's2',
          text: 'MFA está implementado?',
          category: 'Multi-Factor Authentication'
        },
        {
          id: 's3',
          text: 'Logs de segurança são centralizados?',
          category: 'Security Logging'
        },
        {
          id: 's4',
          text: 'Gestão de vulnerabilidades ocorre periodicamente?',
          category: 'Vulnerability Management'
        },
        {
          id: 's5',
          text: 'A empresa segue princípios ISO 27001?',
          category: 'ISO 27001 Compliance'
        },
        {
          id: 's6',
          text: 'Controle de dispositivos removíveis está implementado?',
          category: 'Device Control'
        },
        {
          id: 's7',
          text: 'Treinamentos de segurança são recorrentes?',
          category: 'Security Training'
        },
        {
          id: 's8',
          text: 'Existe monitoramento de ameaças?',
          category: 'Threat Monitoring'
        }
      ]
    }
  ];

  const scoreOptions = [
    { value: 0, label: "Não existe", description: "Processo ou controle não implementado" },
    { value: 1, label: "Existe informalmente", description: "Processo existe mas não documentado" },
    { value: 2, label: "Parcial / não implantado", description: "Documentado mas implementação incompleta" },
    { value: 3, label: "Implantado e inconsistente", description: "Implementado mas com gaps de execução" },
    { value: 4, label: "Estável e controlado", description: "Bem implementado e monitorado" },
    { value: 5, label: "Otimizado / digitalizado / GxP Ready", description: "Excelência operacional atingida" }
  ];

  const currentArea = assessmentAreas[currentStep];
  const totalSteps = assessmentAreas.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const handleQuestionResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [currentArea.id]: {
        ...prev[currentArea.id],
        [questionId]: parseInt(value)
      }
    }));
  };

  const getAreaCompletion = (areaId) => {
    const areaResponses = responses[areaId] || {};
    const area = assessmentAreas.find(a => a.id === areaId);
    const answeredCount = Object.keys(areaResponses).length;
    return (answeredCount / area.questions.length) * 100;
  };

  const isCurrentAreaComplete = () => {
    return getAreaCompletion(currentArea.id) === 100;
  };

  const handleNext = () => {
    if (!isCurrentAreaComplete()) {
      toast.error("Please answer all questions before proceeding");
      return;
    }
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('assessmentResponses', JSON.stringify(responses));
      toast.success("Assessment progress saved successfully");
    } catch (error) {
      toast.error("Failed to save progress");
    } finally {
      setIsSaving(false);
    }
  };

  const handleComplete = async () => {
    try {
      // Calculate scores
      const areaScores = assessmentAreas.map(area => {
        const areaResponses = responses[area.id] || {};
        const scores = Object.values(areaResponses);
        const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        return {
          area: area.name,
          score: Math.round((avgScore / 5) * 100),
          weight: area.weight
        };
      });

      // Calculate overall score
      const totalWeightedScore = areaScores.reduce((sum, area) => sum + (area.score * area.weight / 100), 0);
      const totalWeight = areaScores.reduce((sum, area) => sum + area.weight, 0);
      const overallScore = Math.round((totalWeightedScore / totalWeight) * 100);

      // Save results
      const results = {
        responses,
        areaScores,
        overallScore,
        completedAt: new Date().toISOString()
      };
      
      localStorage.setItem('assessmentResults', JSON.stringify(results));
      
      toast.success("Assessment completed successfully!");
      
      setTimeout(() => {
        navigate('/systems');
      }, 1500);
      
    } catch (error) {
      toast.error("Failed to complete assessment");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 4) return "text-success";
    if (score >= 2) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-space-grotesk font-bold text-foreground">GxP Compass</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleSave} 
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Progress'}
            </Button>
            <Link to="/dashboard">
              <Button variant="outline">
                Exit Assessment
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-space-grotesk font-bold text-foreground">
                  GxP Compliance Assessment
                </h1>
                <p className="text-muted-foreground">
                  Step {currentStep + 1} of {totalSteps}: {currentArea.name}
                </p>
              </div>
              <Badge variant="outline" className="bg-primary-light border-primary/20 text-primary">
                {Math.round(progressPercentage)}% Complete
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Assessment Progress</span>
                <span className="text-foreground font-medium">{currentStep + 1} / {totalSteps} areas</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </div>

          {/* Area Overview */}
          <Card className="mb-6 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                    {currentArea.name}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {currentArea.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      Weight: {currentArea.weight}%
                    </Badge>
                    <Badge variant="outline">
                      {currentArea.questions.length} Questions
                    </Badge>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className={`font-medium ${getAreaCompletion(currentArea.id) === 100 ? 'text-success' : 'text-warning'}`}>
                        {Math.round(getAreaCompletion(currentArea.id))}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-6">
            {currentArea.questions.map((question, qIndex) => {
              const currentResponse = responses[currentArea.id]?.[question.id];
              
              return (
                <Card key={question.id} className={`transition-all ${
                  currentResponse !== undefined ? 'border-success/30 bg-success-light/20' : 'hover:shadow-medium'
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-foreground">
                          {qIndex + 1}. {question.text}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Category: {question.category}
                        </CardDescription>
                      </div>
                      {currentResponse !== undefined && (
                        <CheckCircle className="h-5 w-5 text-success mt-1" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={currentResponse?.toString()} 
                      onValueChange={(value) => handleQuestionResponse(question.id, value)}
                      className="space-y-3"
                    >
                      {scoreOptions.map((option) => (
                        <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value={option.value.toString()} id={`${question.id}_${option.value}`} className="mt-0.5" />
                          <Label 
                            htmlFor={`${question.id}_${option.value}`} 
                            className="flex-1 cursor-pointer space-y-1"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">
                                {option.value} - {option.label}
                              </span>
                              <Badge variant="outline" className={`text-xs ${
                                option.value >= 4 ? 'bg-success-light text-success border-success/20' :
                                option.value >= 2 ? 'bg-warning-light text-warning border-warning/20' :
                                'bg-destructive-light text-destructive border-destructive/20'
                              }`}>
                                {option.value >= 4 ? 'Excellent' : option.value >= 2 ? 'Moderate' : 'Poor'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Area
            </Button>
            
            <div className="flex items-center gap-2">
              {!isCurrentAreaComplete() && (
                <div className="flex items-center gap-2 text-warning">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Please answer all questions</span>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleNext}
              disabled={!isCurrentAreaComplete()}
              className="bg-primary hover:bg-primary-hover flex items-center gap-2"
            >
              {currentStep === totalSteps - 1 ? 'Complete Assessment' : 'Next Area'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Area Navigation */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Assessment Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {assessmentAreas.map((area, index) => {
                const completion = getAreaCompletion(area.id);
                const isCurrentArea = index === currentStep;
                
                return (
                  <Button
                    key={area.id}
                    variant={isCurrentArea ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentStep(index)}
                    className={`justify-start h-auto p-3 ${
                      isCurrentArea 
                        ? 'bg-primary text-primary-foreground' 
                        : completion === 100 
                        ? 'border-success bg-success-light text-success' 
                        : 'border-border'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">{area.name}</div>
                      <div className="text-xs opacity-75">{Math.round(completion)}% complete</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentWizard;