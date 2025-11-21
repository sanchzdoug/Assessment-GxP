import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [assessmentId, setAssessmentId] = useState(null);

  // Load existing assessment data if in edit mode
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get('edit');
    
    if (editId) {
      setEditMode(true);
      setAssessmentId(editId);
      
      // Load existing assessment data
      const assessmentResults = JSON.parse(localStorage.getItem('assessmentResults') || '{}');
      if (assessmentResults.responses) {
        setResponses(assessmentResults.responses);
        toast.success("Dados do assessment carregados para edição");
      }
    }
  }, [location]);

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
      name: 'Tecnologia da Informação',
      description: 'Infraestrutura de TI, gestão de sistemas e controles técnicos',
      weight: 15,
      questions: [
        { id: 'it1', text: 'A área possui normas e procedimentos formalizados?', category: 'Políticas e Procedimentos' },
        { id: 'it2', text: 'Há inventário atualizado de ativos de TI?', category: 'Gestão de Ativos' },
        { id: 'it3', text: 'Ambientes são separados entre desenvolvimento, testes e produção?', category: 'Gestão de Ambientes' },
        { id: 'it4', text: 'Há política de backup e restauração?', category: 'Backup e Recuperação' },
        { id: 'it5', text: 'Testes de restauração são realizados periodicamente?', category: 'Backup e Recuperação' },
        { id: 'it6', text: 'Existe monitoramento de capacidade e desempenho?', category: 'Monitoramento' },
        { id: 'it7', text: 'Há redundância para ambientes críticos?', category: 'Alta Disponibilidade' },
        { id: 'it8', text: 'Sistema de monitoramento registra falhas e alertas?', category: 'Monitoramento' },
        { id: 'it9', text: 'Mudanças em infraestrutura seguem processo formal?', category: 'Gestão de Mudanças' },
        { id: 'it10', text: 'Atualizações são avaliadas antes da aplicação?', category: 'Gestão de Atualizações' },
        { id: 'it11', text: 'Criação e remoção de acessos seguem fluxo controlado?', category: 'Controle de Acesso' },
        { id: 'it12', text: 'Perfis são revisados periodicamente?', category: 'Controle de Acesso' },
        { id: 'it13', text: 'Sistemas críticos utilizam autenticação forte?', category: 'Autenticação' },
        { id: 'it14', text: 'Há plano de continuidade de TI?', category: 'Continuidade' },
        { id: 'it15', text: 'Testes de contingência são documentados?', category: 'Continuidade' },
        { id: 'it16', text: 'Contratos de suporte estão vigentes?', category: 'Gestão de Contratos' },
        { id: 'it17', text: 'Chamados são registrados e analisados?', category: 'Service Desk' },
        { id: 'it18', text: 'Há prazos de atendimento definidos?', category: 'SLA' },
        { id: 'it19', text: 'Ferramentas de segurança estão atualizadas?', category: 'Segurança' },
        { id: 'it20', text: 'Dispositivos externos são controlados?', category: 'Controle de Dispositivos' },
        { id: 'it21', text: 'TI atende requisitos regulatórios aplicáveis?', category: 'Conformidade' },
        { id: 'it22', text: 'TI participa da validação de sistemas?', category: 'Validação' },
        { id: 'it23', text: 'Logs são coletados e monitorados?', category: 'Auditoria' },
        { id: 'it24', text: 'Eventos críticos têm tratamento prioritário?', category: 'Gestão de Incidentes' },
        { id: 'it25', text: 'Configurações de servidores são documentadas?', category: 'Documentação' }
      ]
    },
    {
      id: 'security',
      name: 'Segurança da Informação',
      description: 'Cibersegurança, proteção de dados e controles de segurança',
      weight: 15,
      questions: [
        { id: 's1', text: 'Existe Política de Segurança da Informação vigente?', category: 'Política de Segurança' },
        { id: 's2', text: 'Há programa de conscientização em segurança?', category: 'Conscientização' },
        { id: 's3', text: 'Senhas seguem políticas restritivas?', category: 'Controle de Acesso' },
        { id: 's4', text: 'Há autenticação forte para sistemas críticos?', category: 'Autenticação' },
        { id: 's5', text: 'Perfis seguem princípio do menor privilégio?', category: 'Controle de Acesso' },
        { id: 's6', text: 'Acessos de terceiros são controlados?', category: 'Controle de Terceiros' },
        { id: 's7', text: 'Dados pessoais seguem LGPD?', category: 'Proteção de Dados' },
        { id: 's8', text: 'Inventário de dados sensíveis é atualizado?', category: 'Classificação de Dados' },
        { id: 's9', text: 'O descarte de informações é seguro?', category: 'Gestão de Dados' },
        { id: 's10', text: 'Logs de segurança são analisados?', category: 'Monitoramento' },
        { id: 's11', text: 'Há processo de resposta a incidentes?', category: 'Gestão de Incidentes' },
        { id: 's12', text: 'Incidentes são registrados e avaliados?', category: 'Gestão de Incidentes' },
        { id: 's13', text: 'Vulnerabilidades são verificadas periodicamente?', category: 'Gestão de Vulnerabilidades' },
        { id: 's14', text: 'Sistemas desatualizados são corrigidos rapidamente?', category: 'Gestão de Patches' },
        { id: 's15', text: 'Firewalls estão configurados adequadamente?', category: 'Segurança de Rede' },
        { id: 's16', text: 'Dispositivos externos são bloqueados ou controlados?', category: 'Controle de Dispositivos' },
        { id: 's17', text: 'Há proteção contra softwares maliciosos?', category: 'Proteção contra Malware' },
        { id: 's18', text: 'Fornecedores em nuvem são avaliados?', category: 'Segurança em Nuvem' },
        { id: 's19', text: 'Ambientes em nuvem possuem configurações auditáveis?', category: 'Segurança em Nuvem' },
        { id: 's20', text: 'Segurança segue boas práticas ISO 27001?', category: 'Padrões ISO' },
        { id: 's21', text: 'Auditorias internas de segurança são realizadas?', category: 'Auditoria' },
        { id: 's22', text: 'Segurança participa de planos de continuidade?', category: 'Continuidade' },
        { id: 's23', text: 'Mecanismos de recuperação garantem proteção de dados?', category: 'Recuperação' },
        { id: 's24', text: 'Perfis de usuário são revisados periodicamente?', category: 'Revisão de Acesso' },
        { id: 's25', text: 'Contas inativas são removidas rapidamente?', category: 'Gestão de Contas' }
      ]
    },
    {
      id: 'production',
      name: 'Produção / Manufatura',
      description: 'Sistemas de execução da manufatura e controles de produção',
      weight: 12,
      questions: [
        { id: 'prod1', text: 'Ordens de produção são eletrônicas?', category: 'Ordens de Produção' },
        { id: 'prod2', text: 'Procedimentos de operação padrão são seguidos?', category: 'Procedimentos' },
        { id: 'prod3', text: 'Parâmetros críticos de processo são monitorados?', category: 'Controle de Processo' },
        { id: 'prod4', text: 'Matéria-prima e intermediários são rastreáveis?', category: 'Rastreabilidade' },
        { id: 'prod5', text: 'Registros seguem ALCOA+?', category: 'Integridade de Dados' },
        { id: 'prod6', text: 'Sistema de produção integra com ERP?', category: 'Integração' },
        { id: 'prod7', text: 'Equipamentos são qualificados (instalação, operação, desempenho)?', category: 'Qualificação' },
        { id: 'prod8', text: 'Intervenções possuem trilha de auditoria?', category: 'Auditoria' },
        { id: 'prod9', text: 'Eficiência dos equipamentos é monitorada?', category: 'OEE' },
        { id: 'prod10', text: 'Perdas são registradas?', category: 'Controle de Perdas' },
        { id: 'prod11', text: 'Ambiente de produção é monitorado?', category: 'Controle Ambiental' },
        { id: 'prod12', text: 'Utilidades (água, ar, vapor) são monitoradas?', category: 'Utilidades' },
        { id: 'prod13', text: 'Colaboradores são treinados?', category: 'Treinamento' },
        { id: 'prod14', text: 'Lotes possuem rastreabilidade completa?', category: 'Rastreabilidade de Lotes' },
        { id: 'prod15', text: 'Registros não são editáveis?', category: 'Integridade de Dados' },
        { id: 'prod16', text: 'Anomalias são registradas?', category: 'Controle de Anomalias' },
        { id: 'prod17', text: 'Ações corretivas são aplicadas?', category: 'Ações Corretivas' },
        { id: 'prod18', text: 'Equipamentos críticos possuem manutenção preventiva?', category: 'Manutenção' },
        { id: 'prod19', text: 'Manutenções são registradas?', category: 'Manutenção' },
        { id: 'prod20', text: 'Processos são revisados periodicamente?', category: 'Revisão de Processos' },
        { id: 'prod21', text: 'Mudanças são avaliadas pela qualidade?', category: 'Gestão de Mudanças' },
        { id: 'prod22', text: 'Documentos de produção são completos?', category: 'Documentação' },
        { id: 'prod23', text: 'Registros seguem integridade de dados?', category: 'Integridade de Dados' },
        { id: 'prod24', text: 'Lotes só são liberados após revisão?', category: 'Liberação de Lotes' },
        { id: 'prod25', text: 'Divergências são investigadas?', category: 'Investigação' }
      ]
    },
    {
      id: 'laboratory',
      name: 'Laboratório / LIMS',
      description: 'Sistema de gestão de informações laboratoriais e controles analíticos',
      weight: 10,
      questions: [
        { id: 'lab1', text: 'Todas as amostras são registradas eletronicamente?', category: 'Gestão de Amostras' },
        { id: 'lab2', text: 'Existe rastreabilidade completa (data, lote, responsável, armazenamento)?', category: 'Rastreabilidade' },
        { id: 'lab3', text: 'Condições de armazenamento (temperatura, validade) são monitoradas?', category: 'Armazenamento' },
        { id: 'lab4', text: 'Métodos analíticos estão validados?', category: 'Validação de Métodos' },
        { id: 'lab5', text: 'Resultados são registrados de forma eletrônica e auditável?', category: 'Registro de Resultados' },
        { id: 'lab6', text: 'Revisões e aprovações de resultados são rastreáveis?', category: 'Aprovação' },
        { id: 'lab7', text: 'Equipamentos possuem qualificação (instalação, operação e desempenho)?', category: 'Qualificação' },
        { id: 'lab8', text: 'Manutenções e calibrações são registradas no sistema?', category: 'Calibração' },
        { id: 'lab9', text: 'Reagentes, padrões e soluções possuem rastreabilidade?', category: 'Materiais' },
        { id: 'lab10', text: 'Vencimentos são controlados eletronicamente?', category: 'Controle de Vencimento' },
        { id: 'lab11', text: 'Registros seguem ALCOA+?', category: 'Integridade de Dados' },
        { id: 'lab12', text: 'O sistema possui trilha de auditoria completa?', category: 'Auditoria' },
        { id: 'lab13', text: 'Edições, exclusões ou correções são registradas e justificadas?', category: 'Controle de Mudanças' },
        { id: 'lab14', text: 'Ensaios de controle interno (curva, repetibilidade, brancos) são monitorados?', category: 'Controle de Qualidade' },
        { id: 'lab15', text: 'OOS seguem procedimento formal?', category: 'Out of Specification' },
        { id: 'lab16', text: 'Investigações são documentadas?', category: 'Investigação' },
        { id: 'lab17', text: 'Perfis de acesso são controlados?', category: 'Controle de Acesso' },
        { id: 'lab18', text: 'Usuários possuem permissões adequadas ao cargo?', category: 'Controle de Acesso' },
        { id: 'lab19', text: 'LIMS integra com ERP, produção ou equipamentos?', category: 'Integração' },
        { id: 'lab20', text: 'Dados de equipamentos são importados automaticamente?', category: 'Automação' },
        { id: 'lab21', text: 'Há rotina validada de backup?', category: 'Backup' },
        { id: 'lab22', text: 'Métodos e especificações são controlados eletronicamente?', category: 'Controle de Métodos' },
        { id: 'lab23', text: 'Analistas possuem treinamento documentado em métodos aplicáveis?', category: 'Treinamento' },
        { id: 'lab24', text: 'Amostras retidas são controladas eletronicamente?', category: 'Amostras Retidas' },
        { id: 'lab25', text: 'Indicadores laboratoriais são monitorados (produtividade, retrabalho, tempo de ciclo)?', category: 'Indicadores' }
      ]
    },
    {
      id: 'supply',
      name: 'Supply Chain / WMS / TMS',
      description: 'Gestão da cadeia de suprimentos, armazenagem e transporte',
      weight: 8,
      questions: [
        { id: 'sup1', text: 'Entradas e saídas são registradas eletronicamente?', category: 'Movimentação' },
        { id: 'sup2', text: 'Movimentações possuem trilha de auditoria?', category: 'Auditoria' },
        { id: 'sup3', text: 'Inventário é realizado periodicamente?', category: 'Inventário' },
        { id: 'sup4', text: 'Rastreamento por lote é garantido?', category: 'Rastreabilidade' },
        { id: 'sup5', text: 'Há controle de serialização?', category: 'Serialização' },
        { id: 'sup6', text: 'Armazenagem segue boas práticas?', category: 'Armazenagem' },
        { id: 'sup7', text: 'Temperatura é monitorada?', category: 'Controle de Temperatura' },
        { id: 'sup8', text: 'Transporte é rastreável?', category: 'Transporte' },
        { id: 'sup9', text: 'Documentos eletrônicos são preservados?', category: 'Documentação' },
        { id: 'sup10', text: 'WMS integra com ERP?', category: 'Integração' },
        { id: 'sup11', text: 'Conferência é eletrônica?', category: 'Conferência' },
        { id: 'sup12', text: 'Expedição segue fluxos definidos?', category: 'Expedição' },
        { id: 'sup13', text: 'Indicadores de perdas são avaliados?', category: 'Controle de Perdas' },
        { id: 'sup14', text: 'Acesso ao armazém é controlado?', category: 'Controle de Acesso' },
        { id: 'sup15', text: 'Operação segue RDC 430?', category: 'Conformidade Regulatória' },
        { id: 'sup16', text: 'Códigos de barras são utilizados?', category: 'Tecnologia' },
        { id: 'sup17', text: 'Dispositivos móveis são usados?', category: 'Tecnologia' },
        { id: 'sup18', text: 'Transportadoras são avaliadas?', category: 'Qualificação de Fornecedores' },
        { id: 'sup19', text: 'Registros críticos são eletrônicos?', category: 'Registros' },
        { id: 'sup20', text: 'Divergências são analisadas?', category: 'Análise de Divergências' }
      ]
    },
    {
      id: 'training',
      name: 'Treinamentos / LMS',
      description: 'Sistema de gestão de aprendizagem e desenvolvimento de competências',
      weight: 8,
      questions: [
        { id: 'train1', text: 'Existe matriz de competência para cada função?', category: 'Matriz de Competência' },
        { id: 'train2', text: 'Competências críticas estão definidas e vinculadas a treinamentos?', category: 'Competências' },
        { id: 'train3', text: 'Treinamentos são planejados e registrados eletronicamente?', category: 'Planejamento' },
        { id: 'train4', text: 'Participação é registrada automaticamente?', category: 'Registro de Participação' },
        { id: 'train5', text: 'Há avaliação obrigatória para treinamentos críticos?', category: 'Avaliação' },
        { id: 'train6', text: 'Há critérios mínimos de aprovação?', category: 'Critérios de Aprovação' },
        { id: 'train7', text: 'A eficácia do treinamento é avaliada?', category: 'Eficácia' },
        { id: 'train8', text: 'Há controle de vencimento dos treinamentos?', category: 'Controle de Vencimento' },
        { id: 'train9', text: 'Treinamentos previstos por BPx são recorrentes?', category: 'Treinamentos BPx' },
        { id: 'train10', text: 'Evidências possuem trilha de auditoria?', category: 'Auditoria' },
        { id: 'train11', text: 'Conteúdos são controlados por versão?', category: 'Controle de Versão' },
        { id: 'train12', text: 'Materiais (vídeos, documentos) são armazenados no sistema?', category: 'Materiais' },
        { id: 'train13', text: 'Indicadores de treinamentos pendentes são monitorados?', category: 'Indicadores' },
        { id: 'train14', text: 'Há relatório de capacitação por setor?', category: 'Relatórios' },
        { id: 'train15', text: 'Perfis de instrutores são controlados?', category: 'Controle de Instrutores' },
        { id: 'train16', text: 'Treinamentos obrigatórios por área são definidos?', category: 'Treinamentos Obrigatórios' },
        { id: 'train17', text: 'Integração com Gestão da Qualidade é realizada?', category: 'Integração' },
        { id: 'train18', text: 'Treinamentos de sistemas são integrados ao ciclo de validação?', category: 'Validação' },
        { id: 'train19', text: 'Planos individuais de capacitação são estruturados?', category: 'Planos Individuais' },
        { id: 'train20', text: 'Revisões periódicas dos conteúdos são realizadas?', category: 'Revisão de Conteúdos' }
      ]
    },
    {
      id: 'engineering',
      name: 'Engenharia & Manutenção',
      description: 'Gestão de equipamentos, manutenção e infraestrutura técnica',
      weight: 8,
      questions: [
        { id: 'eng1', text: 'Há plano preventivo para equipamentos críticos?', category: 'Manutenção Preventiva' },
        { id: 'eng2', text: 'Execuções são registradas em sistema?', category: 'Registro de Execução' },
        { id: 'eng3', text: 'Ocorrências são tratadas com prioridade?', category: 'Gestão de Ocorrências' },
        { id: 'eng4', text: 'Indicadores de falhas (MTBF/MTTR) são monitorados?', category: 'Indicadores' },
        { id: 'eng5', text: 'Sistemas críticos (HVAC, vapor, água, ar comprimido) são monitorados?', category: 'Utilidades' },
        { id: 'eng6', text: 'Alarmes de falhas são registrados e tratados?', category: 'Gestão de Alarmes' },
        { id: 'eng7', text: 'Equipamentos passam por qualificação inicial?', category: 'Qualificação' },
        { id: 'eng8', text: 'Requalificações periódicas estão estabelecidas?', category: 'Requalificação' },
        { id: 'eng9', text: 'Equipamentos de medição são calibrados conforme plano?', category: 'Calibração' },
        { id: 'eng10', text: 'Certificados são anexados ao sistema?', category: 'Certificados' },
        { id: 'eng11', text: 'Existe análise de riscos para equipamentos?', category: 'Análise de Riscos' },
        { id: 'eng12', text: 'Operadores são treinados formalmente?', category: 'Treinamento' },
        { id: 'eng13', text: 'Há cadastro completo dos ativos com status atualizado?', category: 'Gestão de Ativos' },
        { id: 'eng14', text: 'Registros de manutenção são eletrônicos e auditáveis?', category: 'Registros' },
        { id: 'eng15', text: 'Fornecedores de manutenção são qualificados?', category: 'Qualificação de Fornecedores' },
        { id: 'eng16', text: 'Mudanças estruturais são registradas em sistema?', category: 'Gestão de Mudanças' },
        { id: 'eng17', text: 'Engenharia revisa consistentemente a documentação técnica?', category: 'Documentação' },
        { id: 'eng18', text: 'Instalações seguem requisitos sanitários e GMP?', category: 'GMP' },
        { id: 'eng19', text: 'Há utilização de CMMS (Sistema de Gestão de Manutenção)?', category: 'CMMS' },
        { id: 'eng20', text: 'Engenharia integra com Produção e Qualidade para tomada de decisão?', category: 'Integração' }
      ]
    },
    {
      id: 'rnd',
      name: 'P&D / Desenvolvimento',
      description: 'Pesquisa e desenvolvimento de produtos e processos',
      weight: 6,
      questions: [
        { id: 'rnd1', text: 'Processo de desenvolvimento é documentado?', category: 'Processo' },
        { id: 'rnd2', text: 'Fórmulas possuem controle de versões?', category: 'Controle de Versão' },
        { id: 'rnd3', text: 'Projetos possuem estrutura formal (escopo, responsáveis, prazos)?', category: 'Gestão de Projetos' },
        { id: 'rnd4', text: 'Testes de formulação são documentados?', category: 'Testes' },
        { id: 'rnd5', text: 'Há validação de métodos aplicáveis?', category: 'Validação de Métodos' },
        { id: 'rnd6', text: 'Registros seguem ALCOA+?', category: 'Integridade de Dados' },
        { id: 'rnd7', text: 'Resultados são eletrônicos e auditáveis?', category: 'Registros' },
        { id: 'rnd8', text: 'Equipamentos de P&D são qualificados?', category: 'Qualificação' },
        { id: 'rnd9', text: 'Manutenções e calibrações são registradas?', category: 'Manutenção' },
        { id: 'rnd10', text: 'Relatórios de estudos são rastreáveis?', category: 'Rastreabilidade' },
        { id: 'rnd11', text: 'Resultados são aprovados formalmente?', category: 'Aprovação' },
        { id: 'rnd12', text: 'Substâncias com risco possuem controle?', category: 'Controle de Riscos' },
        { id: 'rnd13', text: 'P&D se integra com Qualidade, Regulatórios e Produção?', category: 'Integração' },
        { id: 'rnd14', text: 'Há pipeline de novos produtos?', category: 'Pipeline' },
        { id: 'rnd15', text: 'Lições aprendidas são documentadas?', category: 'Lições Aprendidas' },
        { id: 'rnd16', text: 'Indicadores de desenvolvimento são monitorados?', category: 'Indicadores' },
        { id: 'rnd17', text: 'Documentação de transferência para produção é controlada?', category: 'Transferência' },
        { id: 'rnd18', text: 'Estudos de escala seguem critérios formais?', category: 'Scale-up' },
        { id: 'rnd19', text: 'Informações técnicas são protegidas e controladas?', category: 'Proteção IP' },
        { id: 'rnd20', text: 'Revisões técnicas periódicas são realizadas?', category: 'Revisão Técnica' }
      ]
    },
    {
      id: 'pharmacovigilance',
      name: 'Farmacovigilância',
      description: 'Sistema de monitoramento de segurança de medicamentos',
      weight: 5,
      questions: [
        { id: 'pv1', text: 'Notificações são registradas eletronicamente?', category: 'Notificações' },
        { id: 'pv2', text: 'Eventos adversos são classificados adequadamente?', category: 'Classificação' },
        { id: 'pv3', text: 'Há análise de causalidade aplicável?', category: 'Análise de Causalidade' },
        { id: 'pv4', text: 'Revisão médica é documentada?', category: 'Revisão Médica' },
        { id: 'pv5', text: 'Relatórios obrigatórios são enviados no prazo (ANVISA)?', category: 'Relatórios' },
        { id: 'pv6', text: 'Sistema de segurança possui trilha de auditoria?', category: 'Auditoria' },
        { id: 'pv7', text: 'Dados seguem ALCOA+?', category: 'Integridade de Dados' },
        { id: 'pv8', text: 'Processos de farmacovigilância são auditáveis?', category: 'Auditabilidade' },
        { id: 'pv9', text: 'Equipe é treinada em procedimentos de farmacovigilância?', category: 'Treinamento' },
        { id: 'pv10', text: 'A área integra com Qualidade e Reclamações?', category: 'Integração' },
        { id: 'pv11', text: 'Reclamações correlacionadas são tratadas formalmente?', category: 'Reclamações' },
        { id: 'pv12', text: 'Há Plano de Farmacovigilância vigente?', category: 'Plano de PV' },
        { id: 'pv13', text: 'Sinais e tendências são analisados?', category: 'Análise de Sinais' },
        { id: 'pv14', text: 'Atividades seguem legislações aplicáveis?', category: 'Conformidade' },
        { id: 'pv15', text: 'Registros de casos são completos e auditáveis?', category: 'Registros' },
        { id: 'pv16', text: 'Há protocolo para eventos críticos?', category: 'Eventos Críticos' },
        { id: 'pv17', text: 'Parceiros e distribuidores são qualificados?', category: 'Qualificação' },
        { id: 'pv18', text: 'Processos internacionais (quando aplicável) seguem regulações específicas?', category: 'Regulações Internacionais' },
        { id: 'pv19', text: 'Há sistema de detecção de sinais?', category: 'Detecção de Sinais' },
        { id: 'pv20', text: 'Alta direção recebe indicadores periódicos?', category: 'Indicadores' }
      ]
    },
    {
      id: 'clinical',
      name: 'Pesquisa Clínica',
      description: 'Gestão de estudos clínicos e boas práticas clínicas',
      weight: 5,
      questions: [
        { id: 'clin1', text: 'Estudos seguem normas de Boas Práticas Clínicas?', category: 'GCP' },
        { id: 'clin2', text: 'Protocolos estão alinhados às regulamentações nacionais?', category: 'Protocolos' },
        { id: 'clin3', text: 'A documentação do estudo é controlada eletronicamente?', category: 'Documentação' },
        { id: 'clin4', text: 'Registros seguem ALCOA+?', category: 'Integridade de Dados' },
        { id: 'clin5', text: 'Existe plano mestre do estudo?', category: 'Planejamento' },
        { id: 'clin6', text: 'Cronograma clínico é monitorado?', category: 'Cronograma' },
        { id: 'clin7', text: 'Há gestão de risco do protocolo?', category: 'Gestão de Riscos' },
        { id: 'clin8', text: 'Seleção de centros segue procedures definidos?', category: 'Seleção de Centros' },
        { id: 'clin9', text: 'Há qualificação inicial dos centros?', category: 'Qualificação' },
        { id: 'clin10', text: 'Encerramento de centros é documentado?', category: 'Encerramento' },
        { id: 'clin11', text: 'Investigadores são treinados e qualificados?', category: 'Investigadores' },
        { id: 'clin12', text: 'Delegação de responsabilidades é rastreável?', category: 'Delegação' },
        { id: 'clin13', text: 'eCRF é validado antes do uso?', category: 'eCRF' },
        { id: 'clin14', text: 'Há plano de gerenciamento de dados?', category: 'Gerenciamento de Dados' },
        { id: 'clin15', text: 'Consultas e inconsistências são registradas?', category: 'Queries' },
        { id: 'clin16', text: 'Encerramento do banco de dados segue procedimento?', category: 'Database Lock' },
        { id: 'clin17', text: 'Monitoramento segue plano definido?', category: 'Monitoramento' },
        { id: 'clin18', text: 'Relatórios de visitas são padronizados?', category: 'Relatórios' },
        { id: 'clin19', text: 'Eventos adversos são registrados e investigados?', category: 'Eventos Adversos' },
        { id: 'clin20', text: 'Relatórios são enviados dentro dos prazos?', category: 'Relatórios Regulatórios' },
        { id: 'clin21', text: 'Consentimento é rastreável e controlado?', category: 'Consentimento' },
        { id: 'clin22', text: 'Registros dos participantes são completos?', category: 'Registros de Participantes' },
        { id: 'clin23', text: 'Estudo possui aprovação ética válida?', category: 'Aprovação Ética' },
        { id: 'clin24', text: 'A comunicação com comitês é documentada?', category: 'Comitês' },
        { id: 'clin25', text: 'Sistemas utilizados possuem trilha de auditoria?', category: 'Auditoria' },
        { id: 'clin26', text: 'Acesso é controlado via perfis?', category: 'Controle de Acesso' },
        { id: 'clin27', text: 'Pagamentos são registrados e rastreáveis?', category: 'Pagamentos' },
        { id: 'clin28', text: 'Encerramento do estudo segue procedures?', category: 'Encerramento do Estudo' },
        { id: 'clin29', text: 'Dados são arquivados pelo período legal?', category: 'Arquivamento' },
        { id: 'clin30', text: 'CROs e fornecedores são qualificados?', category: 'Qualificação de CROs' },
        { id: 'clin31', text: 'Responsabilidades estão claras?', category: 'Responsabilidades' },
        { id: 'clin32', text: 'O patrocinador acompanha indicadores críticos do estudo?', category: 'Indicadores' }
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
          weight: area.weight,
          status: avgScore >= 4 ? 'excellent' : avgScore >= 2 ? 'good' : 'moderate',
          gaps: scores.filter(score => score < 3).length
        };
      });

      // Calculate overall score
      const totalWeightedScore = areaScores.reduce((sum, area) => sum + (area.score * area.weight / 100), 0);
      const totalWeight = areaScores.reduce((sum, area) => sum + area.weight, 0);
      const overallScore = Math.round(totalWeightedScore / totalWeight);

      // Get company data
      const companyData = JSON.parse(localStorage.getItem('companyData') || '{}');
      
      // Create assessment record
      const assessmentRecord = {
        id: Date.now(),
        companyName: companyData.companyName || 'Empresa Não Informada',
        companySegment: companyData.segment || 'Segmento Não Informado',
        assessmentDate: new Date().toISOString(),
        completionDate: new Date().toISOString(),
        status: 'completed',
        overallScore,
        areasCompleted: assessmentAreas.length,
        totalAreas: assessmentAreas.length,
        lastUpdated: new Date().toISOString(),
        assessor: 'Sistema',
        companyId: `comp_${Date.now()}`,
        responses,
        areaScores,
        companyData
      };

      // Save individual assessment results
      localStorage.setItem('assessmentResults', JSON.stringify({
        responses,
        areaScores,
        overallScore,
        completedAt: new Date().toISOString(),
        companyData
      }));

      // Save to assessments list
      const existingAssessments = JSON.parse(localStorage.getItem('assessmentsList') || '[]');
      existingAssessments.push(assessmentRecord);
      localStorage.setItem('assessmentsList', JSON.stringify(existingAssessments));
      
      toast.success("Assessment concluído com sucesso!");
      
      setTimeout(() => {
        if (editMode && assessmentId) {
          navigate(`/systems?edit=${assessmentId}`);
        } else {
          navigate('/systems');
        }
      }, 1500);
      
    } catch (error) {
      console.error('Erro ao completar assessment:', error);
      toast.error("Falha ao completar assessment");
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
            
            <img src="/softexpert-logo.svg" alt="SoftExpert" className="h-8" />
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