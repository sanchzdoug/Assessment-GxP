import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Shield, Download, Share, FileText, BarChart3, 
  AlertTriangle, CheckCircle, TrendingUp, Award,
  Target, Users, DollarSign, Calendar, Eye, Server
} from 'lucide-react';
import { toast } from 'sonner';

// Utility function to format currency in Brazilian Real
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0);
};

// Helper functions for detailed gap analysis
const getRegulationByArea = (areaId) => {
  const regulations = {
    'quality': '21 CFR Part 11, EU GMP Annex 11',
    'validation': 'GAMP 5, CSV Guidelines',
    'it': 'RDC 658/2022, IN 134/2022',
    'security': 'LGPD, ISO 27001',
    'production': 'EU GMP, FDA cGMP',
    'laboratory': 'ALCOA+, GLP Guidelines',
    'supply': 'GDP Guidelines, Serialização'
  };
  return regulations[areaId] || 'Requisitos GxP Gerais';
};

const getRecommendationByArea = (areaId, score) => {
  const recommendations = {
    'quality': score === 0 ? 'Implementar sistema de gestão da qualidade completo' : 
               score === 1 ? 'Revisar e fortalecer procedimentos de qualidade' : 
               'Aprimorar controles de qualidade existentes',
    'validation': score === 0 ? 'Estabelecer programa de validação de sistemas' : 
                  score === 1 ? 'Completar validações pendentes' : 
                  'Revisar documentação de validação',
    'it': score === 0 ? 'Implementar governança de TI para GxP' : 
          score === 1 ? 'Fortalecer controles de infraestrutura' : 
          'Aprimorar gestão de mudanças em TI',
    'security': score === 0 ? 'Implementar programa de segurança da informação' : 
                score === 1 ? 'Fortalecer controles de acesso' : 
                'Revisar políticas de segurança',
    'production': score === 0 ? 'Implementar controles de produção GxP' : 
                  score === 1 ? 'Revisar procedimentos de fabricação' : 
                  'Aprimorar controles de processo',
    'laboratory': score === 0 ? 'Implementar controles laboratoriais ALCOA+' : 
                  score === 1 ? 'Revisar procedimentos analíticos' : 
                  'Fortalecer integridade de dados laboratoriais',
    'supply': score === 0 ? 'Implementar controles de cadeia de suprimentos' : 
              score === 1 ? 'Revisar qualificação de fornecedores' : 
              'Aprimorar rastreabilidade de produtos'
  };
  return recommendations[areaId] || 'Implementar melhorias nos processos';
};

const getActionsByScore = (score) => {
  if (score === 0) {
    return ['Implementar processo completo', 'Treinar equipe', 'Criar documentação', 'Estabelecer controles'];
  } else if (score === 1) {
    return ['Revisar processo atual', 'Corrigir não conformidades', 'Atualizar documentação', 'Reforçar treinamentos'];
  } else {
    return ['Aprimorar processo existente', 'Otimizar controles', 'Atualizar procedimentos'];
  }
};

const getResponsibleByArea = (areaId) => {
  const responsible = {
    'quality': 'Gerente da Qualidade',
    'validation': 'Especialista em Validação',
    'it': 'Gerente de TI',
    'security': 'Responsável pela Segurança da Informação',
    'production': 'Gerente de Produção',
    'laboratory': 'Gerente do Laboratório',
    'supply': 'Gerente de Supply Chain'
  };
  return responsible[areaId] || 'Gerente da Qualidade';
};

const getResourcesByArea = (areaId) => {
  const resources = {
    'quality': 'Equipe da Qualidade + Consultoria especializada',
    'validation': 'Equipe de Validação + Fornecedor de sistema',
    'it': 'Equipe de TI + Consultoria técnica',
    'security': 'Equipe de Segurança + Auditoria externa',
    'production': 'Equipe de Produção + Engenharia',
    'laboratory': 'Equipe do Laboratório + Consultoria analítica',
    'supply': 'Equipe de Suprimentos + Auditoria de fornecedores'
  };
  return resources[areaId] || 'Equipe interna + consultoria externa';
};

const ReportsPage = () => {
  const location = useLocation();
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedGap, setSelectedGap] = useState(null);
  const [showGapDetails, setShowGapDetails] = useState(false);

  // Generate report on component mount
  useEffect(() => {
    generateReport();
  }, [location]);

  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Check if there's an assessment ID in URL
      const searchParams = new URLSearchParams(location.search);
      const assessmentId = searchParams.get('assessment');
      
      // Get real assessment data - try different storage keys
      let assessmentResults = {};
      let systemsInventory = [];
      let companyData = {};
      
      if (assessmentId) {
        // Try to get data with assessment ID as key
        assessmentResults = JSON.parse(localStorage.getItem(`assessment_${assessmentId}`) || '{}');
        systemsInventory = JSON.parse(localStorage.getItem(`systems_${assessmentId}`) || '[]');
        companyData = JSON.parse(localStorage.getItem(`company_${assessmentId}`) || '{}');
      }
      
      // Fallback to generic keys if assessment-specific data not found
      if (!assessmentResults.responses && !assessmentResults.companyData) {
        assessmentResults = JSON.parse(localStorage.getItem('assessmentResults') || '{}');
      }
      if (systemsInventory.length === 0) {
        systemsInventory = JSON.parse(localStorage.getItem('systemsInventory') || '[]');
      }
      if (!companyData.name) {
        companyData = JSON.parse(localStorage.getItem('companyData') || '{}');
      }
      
      console.log('📊 Assessment ID:', assessmentId);
      console.log('📊 Assessment Results:', assessmentResults);
      console.log('📊 Systems Inventory:', systemsInventory);
      console.log('📊 Company Data:', companyData);
      console.log('📊 All localStorage keys:', Object.keys(localStorage));
      
      // Check if we have real assessment data
      const hasRealData = (assessmentResults.responses || assessmentResults.companyData || companyData.name || systemsInventory.length > 0);
      
      if (!hasRealData && !assessmentId) {
        // If no real data and no assessment ID, use demo data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate demo report data
        const mockReportData = {
        companyInfo: {
          name: "BioPharma Solutions",
          segment: "Pharmaceutical",
          employees: 2500,
          type: "Headquarters"
        },
        areaScores: [
          { area: "Quality Assurance", score: 85, weight: 20, status: "excellent", gaps: 1 },
          { area: "System Validation", score: 72, weight: 15, status: "good", gaps: 2 },
          { area: "Information Technology", score: 68, weight: 15, status: "moderate", gaps: 3 },
          { area: "Information Security", score: 82, weight: 15, status: "excellent", gaps: 1 },
          { area: "Production / MES", score: 75, weight: 15, status: "good", gaps: 2 },
          { area: "Laboratory / LIMS", score: 79, weight: 10, status: "good", gaps: 1 },
          { area: "Supply Chain", score: 65, weight: 10, status: "moderate", gaps: 4 }
        ],
        assessmentDate: new Date().toISOString(),
        criticalGaps: [
          {
            area: "Information Technology",
            gap: "Missing backup validation documentation",
            regulation: "21 CFR Part 11",
            risk: "High",
            recommendation: "Implement formal backup validation procedures with documented test results"
          },
          {
            area: "Supply Chain",
            gap: "WMS lacks full GxP validation", 
            regulation: "EU GMP Annex 11",
            risk: "High",
            recommendation: "Conduct comprehensive WMS validation including data integrity assessment"
          },
          {
            area: "System Validation",
            gap: "Incomplete audit trail configuration",
            regulation: "ALCOA+",
            risk: "Medium",
            recommendation: "Review and enhance audit trail settings across all GxP systems"
          },
          {
            area: "Information Technology",
            gap: "Patch management governance gaps",
            regulation: "RDC 658/2022",
            risk: "Medium",
            recommendation: "Establish formal change control for system updates and patches"
          }
        ],
        regulatoryCompliance: {
          "21 CFR Part 11": { score: 72, gaps: 3 },
          "EU GMP Annex 11": { score: 75, gaps: 2 },
          "RDC 658/2022": { score: 68, gaps: 4 },
          "IN 134/2022": { score: 80, gaps: 1 },
          "IN 138/2022": { score: 78, gaps: 2 },
          "ALCOA+": { score: 74, gaps: 3 }
        },
        systemsCost: {
          totalAnnual: 2450000,
          monthlyLicenses: 137100,
          support: 411300,
          infrastructure: 60000,
          totalSystems: 5,
          gxpSystems: 4,
          totalUsers: 1405
        },
        recommendations: [
          {
            priority: "High",
            category: "Technical",
            title: "Implement Comprehensive Backup Validation",
            description: "Establish formal procedures for backup system validation with regular testing and documentation.",
            timeline: "3-6 months",
            effort: "Medium"
          },
          {
            priority: "High",
            category: "Regulatory",
            title: "WMS GxP Validation Project",
            description: "Complete end-to-end validation of warehouse management system including data integrity controls.",
            timeline: "6-9 months", 
            effort: "High"
          },
          {
            priority: "Medium",
            category: "Process",
            title: "Audit Trail Enhancement",
            description: "Review and standardize audit trail configurations across all validated systems.",
            timeline: "2-4 months",
            effort: "Low"
          },
          {
            priority: "Medium",
            category: "Technical",
            title: "Patch Management Governance",
            description: "Develop formal change control procedures for system updates and security patches.",
            timeline: "1-3 months",
            effort: "Medium"
          },
          {
            priority: "Low",
            category: "Process",
            title: "Training Program Enhancement",
            description: "Expand GxP training programs to cover emerging regulatory requirements.",
            timeline: "3-6 months",
            effort: "Low"
          }
        ]
      };
      
      // Calculate overallScore based on weighted average of area scores
      const overallScore = mockReportData.areaScores.reduce((total, area) => {
        return total + (area.score * area.weight / 100);
      }, 0);
      mockReportData.overallScore = Math.round(overallScore);
      
      setReportData(mockReportData);
      toast.success("Relatório de demonstração gerado com sucesso");
      return;
    }
    
    // Generate real report from assessment data
    const realReportData = {
      companyInfo: {
        name: assessmentResults.companyData?.name || companyData.name || "Empresa Não Informada",
        segment: assessmentResults.companyData?.segment || companyData.segment || "Segmento Não Informado",
        employees: assessmentResults.companyData?.employees || companyData.employees || 0,
        type: assessmentResults.companyData?.type || companyData.type || "Headquarters",
        size: assessmentResults.companyData?.size || companyData.size || "Médio"
      },
      overallScore: assessmentResults.overallScore || 0,
      assessmentDate: assessmentResults.completedAt || new Date().toISOString(),
      areaScores: assessmentResults.areaScores?.map(area => ({
        ...area,
        status: area.score >= 80 ? 'excellent' : area.score >= 60 ? 'good' : 'moderate',
        gaps: Math.floor((100 - area.score) / 15) // More gaps for lower scores
      })) || [],
      criticalGaps: [],
      regulatoryCompliance: {
        "21 CFR Part 11": { 
          score: Math.round(Math.min(100, Math.max(0, (assessmentResults.overallScore || 0) - 8))), 
          gaps: (assessmentResults.overallScore || 0) < 70 ? 3 : (assessmentResults.overallScore || 0) < 85 ? 2 : 1
        },
        "EU GMP Annex 11": { 
          score: Math.round(Math.min(100, Math.max(0, (assessmentResults.overallScore || 0) - 5))), 
          gaps: (assessmentResults.overallScore || 0) < 75 ? 2 : (assessmentResults.overallScore || 0) < 90 ? 1 : 0
        },
        "RDC 658/2022": { 
          score: Math.round(Math.min(100, Math.max(0, (assessmentResults.overallScore || 0) - 12))), 
          gaps: (assessmentResults.overallScore || 0) < 65 ? 4 : (assessmentResults.overallScore || 0) < 80 ? 3 : 1
        },
        "IN 134/2022": { 
          score: Math.round(Math.min(100, Math.max(0, (assessmentResults.overallScore || 0) + 5))), 
          gaps: (assessmentResults.overallScore || 0) < 60 ? 2 : (assessmentResults.overallScore || 0) < 85 ? 1 : 0
        },
        "IN 138/2022": { 
          score: Math.round(Math.min(100, Math.max(0, (assessmentResults.overallScore || 0) - 6))), 
          gaps: (assessmentResults.overallScore || 0) < 70 ? 2 : (assessmentResults.overallScore || 0) < 88 ? 1 : 0
        },
        "ALCOA+": { 
          score: Math.round(Math.min(100, Math.max(0, (assessmentResults.overallScore || 0) - 10))), 
          gaps: (assessmentResults.overallScore || 0) < 68 ? 3 : (assessmentResults.overallScore || 0) < 83 ? 2 : 1
        }
      },
      systemsCost: {
        totalAnnual: systemsInventory.reduce((sum, s) => sum + (s.monthlyCost * 12 + s.supportCost + s.infrastructureCost), 0),
        monthlyLicenses: systemsInventory.reduce((sum, s) => sum + s.monthlyCost, 0),
        support: systemsInventory.reduce((sum, s) => sum + s.supportCost, 0),
        infrastructure: systemsInventory.reduce((sum, s) => sum + s.infrastructureCost, 0),
        totalSystems: systemsInventory.length,
        gxpSystems: systemsInventory.filter(s => s.gxpCritical).length,
        totalUsers: systemsInventory.reduce((sum, s) => sum + s.users, 0)
      },
      recommendations: [
        {
          priority: "High",
          category: "Compliance Regulatório",
          title: "Implementar Controles de Integridade de Dados (ALCOA+)",
          description: "Estabelecer procedimentos robustos para garantir que todos os dados críticos sejam Atribuíveis, Legíveis, Contemporâneos, Originais, Acurados, Completos, Consistentes, Duradouros e Disponíveis.",
          timeline: "3-6 meses",
          effort: "Alto"
        },
        {
          priority: "High",
          category: "Validação de Sistemas",
          title: "Completar Validação de Sistemas GxP Críticos",
          description: "Executar validação completa (IQ/OQ/PQ) para todos os sistemas que impactam a qualidade do produto, incluindo trilhas de auditoria e controles de acesso adequados.",
          timeline: "4-8 meses",
          effort: "Alto"
        },
        {
          priority: "Medium",
          category: "Gestão da Qualidade",
          title: "Implementar Sistema de Gestão de Riscos da Qualidade",
          description: "Desenvolver metodologia formal de gestão de riscos (ICH Q9) para identificar, avaliar e controlar riscos que possam impactar a qualidade do produto.",
          timeline: "2-4 meses",
          effort: "Médio"
        },
        {
          priority: "Medium",
          category: "Documentação",
          title: "Digitalizar e Padronizar Documentação GxP",
          description: "Migrar documentação crítica para formato eletrônico com controles de versão, assinaturas eletrônicas e trilhas de auditoria completas.",
          timeline: "6-12 meses",
          effort: "Alto"
        },
        {
          priority: "Medium",
          category: "Treinamento",
          title: "Estabelecer Programa de Capacitação Contínua",
          description: "Criar matriz de competências por função e implementar programa de treinamentos recorrentes em GxP, com avaliações obrigatórias e controle de vencimentos.",
          timeline: "2-6 meses",
          effort: "Médio"
        },
        {
          priority: "Low",
          category: "Melhoria Contínua",
          title: "Implementar Indicadores de Performance de Qualidade",
          description: "Estabelecer KPIs para monitorar eficácia do sistema de qualidade, incluindo métricas de desvios, CAPAs, auditorias e treinamentos.",
          timeline: "1-3 meses",
          effort: "Baixo"
        },
        {
          priority: "Low",
          category: "Auditoria",
          title: "Fortalecer Programa de Auditorias Internas",
          description: "Expandir programa de auditorias internas para cobrir todos os processos GxP com frequência adequada, incluindo auditorias de fornecedores críticos.",
          timeline: "2-4 meses",
          effort: "Médio"
        }
      ]
    };
    
    // Generate detailed critical gaps based on assessment responses
    if (assessmentResults.responses) {
      Object.entries(assessmentResults.responses).forEach(([areaId, responses]) => {
        const area = assessmentResults.areaScores?.find(a => a.area.toLowerCase().includes(areaId));
        const areaName = area?.area || areaId;
        
        Object.entries(responses).forEach(([questionId, score]) => {
          if (score < 3) { // Critical issues (score 0-2)
            realReportData.criticalGaps.push({
              area: areaName,
              gap: `Processo não implementado adequadamente (Questão ${questionId})`,
              regulation: getRegulationByArea(areaId),
              risk: score === 0 ? "High" : score === 1 ? "High" : "Medium",
              recommendation: getRecommendationByArea(areaId, score),
              details: {
                questionId,
                score,
                maxScore: 5,
                impactLevel: score === 0 ? "Crítico" : score === 1 ? "Alto" : "Moderado",
                actions: getActionsByScore(score),
                timeline: score === 0 ? "Imediato" : score === 1 ? "1-3 meses" : "3-6 meses",
                responsible: getResponsibleByArea(areaId),
                resources: getResourcesByArea(areaId)
              }
            });
          }
        });
      });
    }
    
    // Add some general gaps if no specific gaps found
    if (realReportData.criticalGaps.length === 0) {
      assessmentResults.areaScores?.forEach(area => {
        if (area.score < 70) {
          realReportData.criticalGaps.push({
            area: area.area,
            gap: `Score abaixo do mínimo regulatório: ${area.score}%`,
            regulation: "Requisitos GxP Gerais",
            risk: area.score < 50 ? "High" : "Medium",
            recommendation: `Implementar melhorias estruturais em ${area.area}`,
            details: {
              score: area.score,
              target: 85,
              impactLevel: area.score < 50 ? "Crítico" : "Alto",
              actions: ["Revisar procedimentos", "Treinar equipe", "Implementar controles"],
              timeline: area.score < 50 ? "1-3 meses" : "3-6 meses",
              responsible: "Gerente da Qualidade",
              resources: "Equipe interna + consultoria externa"
            }
          });
        }
      });
    }
    
    console.log('✅ Real Report Data Generated:', realReportData);
    setReportData(realReportData);
    toast.success("Relatório gerado com sucesso a partir dos dados reais do assessment!");
      
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      toast.error("Falha ao gerar relatório");
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFContent = () => {
    const companyName = reportData.companyInfo?.name || 'Empresa';
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório de Assessment GxP - ${companyName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6; 
            color: #333; 
            font-size: 11px;
          }
          .page { 
            width: 210mm; 
            min-height: 297mm; 
            padding: 20mm; 
            margin: 0 auto; 
            background: white;
            page-break-after: always;
          }
          .header { 
            text-align: center; 
            border-bottom: 3px solid #1e40af; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
          }
          .header h1 { 
            color: #1e40af; 
            font-size: 24px; 
            margin-bottom: 10px; 
          }
          .header h2 { 
            color: #666; 
            font-size: 16px; 
            font-weight: normal; 
          }
          .section { 
            margin-bottom: 30px; 
            page-break-inside: avoid; 
          }
          .section h2 { 
            color: #1e40af; 
            font-size: 18px; 
            margin-bottom: 15px; 
            border-bottom: 2px solid #e5e7eb; 
            padding-bottom: 5px; 
          }
          .section h3 { 
            color: #374151; 
            font-size: 14px; 
            margin-bottom: 10px; 
          }
          .exec-summary { 
            background: #f8fafc; 
            border: 1px solid #e2e8f0; 
            border-radius: 8px; 
            padding: 20px; 
            margin-bottom: 20px; 
          }
          .metric-grid { 
            display: grid; 
            grid-template-columns: repeat(4, 1fr); 
            gap: 15px; 
            margin-bottom: 20px; 
          }
          .metric-card { 
            text-align: center; 
            padding: 15px; 
            border: 1px solid #e5e7eb; 
            border-radius: 6px; 
          }
          .metric-value { 
            font-size: 20px; 
            font-weight: bold; 
            color: #1e40af; 
          }
          .metric-label { 
            font-size: 10px; 
            color: #666; 
            margin-top: 5px; 
          }
          .area-item { 
            border: 1px solid #e5e7eb; 
            border-radius: 6px; 
            padding: 15px; 
            margin-bottom: 10px; 
          }
          .area-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 10px; 
          }
          .area-name { 
            font-weight: bold; 
            font-size: 12px; 
          }
          .score { 
            font-size: 16px; 
            font-weight: bold; 
          }
          .score.excellent { color: #059669; }
          .score.good { color: #d97706; }
          .score.moderate { color: #dc2626; }
          .gap-item { 
            border-left: 4px solid #dc2626; 
            padding: 15px; 
            margin-bottom: 15px; 
            background: #fef2f2; 
          }
          .gap-header { 
            font-weight: bold; 
            color: #dc2626; 
            margin-bottom: 5px; 
          }
          .gap-details { 
            font-size: 10px; 
            color: #666; 
            margin-top: 5px; 
          }
          .badge { 
            display: inline-block; 
            padding: 2px 8px; 
            border-radius: 12px; 
            font-size: 9px; 
            margin: 2px; 
          }
          .badge.high-risk { background: #fee2e2; color: #dc2626; }
          .badge.medium-risk { background: #fef3cd; color: #d97706; }
          .badge.low-risk { background: #d1fae5; color: #059669; }
          .recommendation-item { 
            border: 1px solid #e5e7eb; 
            border-radius: 6px; 
            padding: 15px; 
            margin-bottom: 15px; 
          }
          .rec-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: flex-start; 
            margin-bottom: 10px; 
          }
          .rec-title { 
            font-weight: bold; 
            font-size: 12px; 
          }
          .rec-priority { 
            font-size: 9px; 
            padding: 2px 6px; 
            border-radius: 4px; 
          }
          .rec-priority.high { background: #fee2e2; color: #dc2626; }
          .rec-priority.medium { background: #fef3cd; color: #d97706; }
          .rec-priority.low { background: #d1fae5; color: #059669; }
          .table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 20px; 
          }
          .table th, .table td { 
            border: 1px solid #e5e7eb; 
            padding: 8px; 
            text-align: left; 
            font-size: 10px; 
          }
          .table th { 
            background: #f8fafc; 
            font-weight: bold; 
          }
          .currency { 
            font-family: monospace; 
            font-weight: bold; 
          }
          @page { 
            size: A4; 
            margin: 0; 
          }
          @media print { 
            .page { page-break-after: always; } 
            body { -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <!-- Página 1: Capa e Resumo Executivo -->
        <div class="page">
          <div class="header">
            <div style="text-align: center; margin-bottom: 20px;">
              <h3 style="color: #1e40af; font-size: 28px; font-weight: bold; margin: 0;">SoftExpert</h3>
            </div>
            <h1>Relatório de Assessment GxP</h1>
            <h2>Análise Abrangente de Compliance Regulatório</h2>
            <p style="margin-top: 15px;"><strong>Empresa:</strong> ${companyName}</p>
            <p><strong>Segmento:</strong> ${reportData.companyInfo?.segment || 'Não informado'}</p>
            <p><strong>Data do Relatório:</strong> ${currentDate}</p>
          </div>

          <div class="section">
            <h2>Resumo Executivo</h2>
            <div class="exec-summary">
              <div class="metric-grid">
                <div class="metric-card">
                  <div class="metric-value">${reportData.overallScore}%</div>
                  <div class="metric-label">Score Geral de Compliance</div>
                </div>
                <div class="metric-card">
                  <div class="metric-value">${reportData.areaScores?.length || 0}</div>
                  <div class="metric-label">Áreas Avaliadas</div>
                </div>
                <div class="metric-card">
                  <div class="metric-value">${reportData.criticalGaps?.length || 0}</div>
                  <div class="metric-label">Gaps Críticos</div>
                </div>
                <div class="metric-card">
                  <div class="metric-value currency">${formatCurrency(reportData.systemsCost?.totalAnnual || 0)}</div>
                  <div class="metric-label">Investimento Anual em TI</div>
                </div>
              </div>
              
              <h3>Principais Achados:</h3>
              <ul style="margin-left: 20px; margin-top: 10px;">
                <li>Score geral de compliance: ${reportData.overallScore}% - ${reportData.overallScore >= 80 ? 'Excelente' : reportData.overallScore >= 60 ? 'Bom' : 'Requer melhoria'}</li>
                <li>Áreas com melhor performance: ${reportData.areaScores?.filter(a => a.score >= 80).map(a => a.area).join(', ') || 'Nenhuma identificada'}</li>
                <li>Áreas críticas: ${reportData.areaScores?.filter(a => a.score < 60).map(a => a.area).join(', ') || 'Nenhuma identificada'}</li>
                <li>Gaps de alto risco: ${reportData.criticalGaps?.filter(g => g.risk === 'High').length || 0}</li>
                <li>Investimento em ${reportData.systemsCost?.totalSystems || 0} sistemas GxP</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Página 2: Scores por Área -->
        <div class="page">
          <div class="header">
            <h1>Análise de Maturidade por Área de Negócio</h1>
          </div>

          <div class="section">
            <h2>Performance por Área Avaliada</h2>
            ${reportData.areaScores?.map(area => `
              <div class="area-item">
                <div class="area-header">
                  <span class="area-name">${area.area}</span>
                  <span class="score ${area.status}">${area.score}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: #666;">
                  <span>Peso: ${area.weight}%</span>
                  <span>Status: ${area.status === 'excellent' ? 'Excelente' : area.status === 'good' ? 'Bom' : 'Moderado'}</span>
                  <span>Gaps: ${area.gaps || 0}</span>
                </div>
                <div style="background: #e5e7eb; height: 6px; border-radius: 3px; margin-top: 8px;">
                  <div style="background: ${area.score >= 80 ? '#059669' : area.score >= 60 ? '#d97706' : '#dc2626'}; 
                             height: 6px; border-radius: 3px; width: ${area.score}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Página 3: Gaps Críticos -->
        <div class="page">
          <div class="header">
            <h1>Gaps Críticos de Compliance</h1>
          </div>

          <div class="section">
            <h2>Issues Prioritárias Identificadas</h2>
            ${reportData.criticalGaps?.map(gap => `
              <div class="gap-item">
                <div class="gap-header">${gap.area}: ${gap.gap}</div>
                <div style="margin: 8px 0;">
                  <span class="badge ${gap.risk === 'High' ? 'high-risk' : gap.risk === 'Medium' ? 'medium-risk' : 'low-risk'}">
                    ${gap.risk} Risk
                  </span>
                  <span class="badge" style="background: #f3f4f6; color: #374151;">${gap.regulation}</span>
                </div>
                <div style="margin-top: 10px;">
                  <strong>Recomendação:</strong> ${gap.recommendation}
                </div>
                ${gap.details ? `
                  <div class="gap-details">
                    <strong>Timeline:</strong> ${gap.details.timeline} | 
                    <strong>Responsável:</strong> ${gap.details.responsible} | 
                    <strong>Impacto:</strong> ${gap.details.impactLevel}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Página 4: Compliance Regulatório -->
        <div class="page">
          <div class="header">
            <h1>Status de Compliance Regulatório</h1>
          </div>

          <div class="section">
            <h2>Aderência às Regulamentações</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Regulamentação</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Gaps</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(reportData.regulatoryCompliance || {}).map(([reg, data]) => `
                  <tr>
                    <td>${reg}</td>
                    <td>${Math.round(data.score)}%</td>
                    <td>${data.score >= 80 ? 'Compliant' : data.score >= 60 ? 'Partial' : 'Non-Compliant'}</td>
                    <td>${data.gaps}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Página 5: Sistemas e Custos -->
        <div class="page">
          <div class="header">
            <h1>Análise de Sistemas e Custos</h1>
          </div>

          <div class="section">
            <h2>Resumo de Investimentos</h2>
            <div class="metric-grid">
              <div class="metric-card">
                <div class="metric-value currency">${formatCurrency(reportData.systemsCost?.monthlyLicenses || 0)}</div>
                <div class="metric-label">Licenças Mensais</div>
              </div>
              <div class="metric-card">
                <div class="metric-value currency">${formatCurrency((reportData.systemsCost?.monthlyLicenses || 0) * 12)}</div>
                <div class="metric-label">Licenças Anuais</div>
              </div>
              <div class="metric-card">
                <div class="metric-value currency">${formatCurrency(reportData.systemsCost?.support || 0)}</div>
                <div class="metric-label">Suporte & Manutenção</div>
              </div>
              <div class="metric-card">
                <div class="metric-value currency">${formatCurrency(reportData.systemsCost?.infrastructure || 0)}</div>
                <div class="metric-label">Infraestrutura</div>
              </div>
            </div>

            <h3>Sistemas Implementados</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Sistema</th>
                  <th>Tipo</th>
                  <th>Usuários</th>
                  <th>Custo Anual</th>
                  <th>GxP</th>
                </tr>
              </thead>
              <tbody>
                ${JSON.parse(localStorage.getItem('systemsInventory') || '[]').map(system => `
                  <tr>
                    <td>${system.name}</td>
                    <td>${system.type}</td>
                    <td>${system.users}</td>
                    <td class="currency">${formatCurrency((system.monthlyCost * 12) + system.supportCost + system.infrastructureCost)}</td>
                    <td>${system.gxpCritical ? 'Sim' : 'Não'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Página 6: Recomendações -->
        <div class="page">
          <div class="header">
            <h1>Recomendações Estratégicas</h1>
          </div>

          <div class="section">
            <h2>Plano de Ação Prioritizado</h2>
            ${reportData.recommendations?.map(rec => `
              <div class="recommendation-item">
                <div class="rec-header">
                  <div class="rec-title">${rec.title}</div>
                  <span class="rec-priority ${rec.priority.toLowerCase()}">${rec.priority} Priority</span>
                </div>
                <div style="margin-bottom: 10px;">
                  <span class="badge" style="background: #f3f4f6; color: #374151;">${rec.category}</span>
                  <span class="badge" style="background: #f3f4f6; color: #374151;">Timeline: ${rec.timeline}</span>
                  <span class="badge" style="background: #f3f4f6; color: #374151;">Esforço: ${rec.effort}</span>
                </div>
                <p style="line-height: 1.4;">${rec.description}</p>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <h2>Próximos Passos</h2>
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 6px; padding: 15px;">
              <h3 style="color: #0ea5e9; margin-bottom: 10px;">Ações Imediatas (0-30 dias):</h3>
              <ul style="margin-left: 20px;">
                <li>Revisar e priorizar gaps críticos identificados</li>
                <li>Designar responsáveis para atividades de remediação</li>
                <li>Agendar reunião de kickoff do plano de ação</li>
              </ul>
              
              <h3 style="color: #0ea5e9; margin: 15px 0 10px 0;">Metas de Curto Prazo (1-6 meses):</h3>
              <ul style="margin-left: 20px;">
                <li>Implementar correções para gaps de alto risco</li>
                <li>Iniciar projetos de melhoria em áreas críticas</li>
                <li>Estabelecer monitoramento contínuo de compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const generateCompletePDFContent = () => {
    const currentDate = new Date().toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
    const companyName = reportData.companyInfo?.name || 'Empresa';
    
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { 
      size: A4; 
      margin: 15mm 10mm 20mm 10mm;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #333;
      background: white;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #1e40af;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #1e40af;
      font-size: 24pt;
      margin-bottom: 5px;
    }
    .header .subtitle {
      color: #666;
      font-size: 11pt;
    }
    .section {
      margin: 25px 0;
      page-break-inside: avoid;
    }
    .section-title {
      background: #1e40af;
      color: white;
      padding: 10px 15px;
      font-size: 14pt;
      font-weight: bold;
      margin-bottom: 15px;
      page-break-after: avoid;
    }
    .subsection-title {
      color: #1e40af;
      font-size: 12pt;
      font-weight: bold;
      margin: 15px 0 10px 0;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 5px;
    }
    .card {
      border: 1px solid #e5e7eb;
      padding: 15px;
      margin: 10px 0;
      background: #f9fafb;
      border-radius: 4px;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 15px 0;
    }
    .metric {
      text-align: center;
      padding: 15px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
    }
    .metric-value {
      font-size: 24pt;
      font-weight: bold;
      color: #1e40af;
    }
    .metric-label {
      font-size: 9pt;
      color: #666;
      margin-top: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th, td {
      border: 1px solid #e5e7eb;
      padding: 10px;
      text-align: left;
    }
    th {
      background: #f3f4f6;
      font-weight: bold;
      color: #1e40af;
    }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 9pt;
      font-weight: bold;
    }
    .badge-success { background: #d1fae5; color: #065f46; }
    .badge-warning { background: #fef3c7; color: #92400e; }
    .badge-danger { background: #fee2e2; color: #991b1b; }
    .progress-bar {
      width: 100%;
      height: 20px;
      background: #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
      margin: 5px 0;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #1e40af);
      transition: width 0.3s;
    }
    .footer {
      text-align: center;
      font-size: 9pt;
      color: #666;
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #e5e7eb;
    }
    .page-break {
      page-break-after: always;
    }
    .gap-item {
      background: white;
      border-left: 4px solid #dc2626;
      padding: 12px;
      margin: 10px 0;
    }
    .recommendation-item {
      background: white;
      border-left: 4px solid #059669;
      padding: 12px;
      margin: 10px 0;
    }
    ul, ol { margin-left: 20px; margin-top: 10px; }
    li { margin: 5px 0; }
    .no-break { page-break-inside: avoid; }
  </style>
</head>
<body>

<!-- PÁGINA 1: CAPA E SUMÁRIO EXECUTIVO -->
<div class="header">
  <h1>SoftExpert</h1>
  <div style="font-size: 20pt; color: #1e40af; font-weight: bold; margin: 15px 0;">
    Relatório de Assessment GxP
  </div>
  <div class="subtitle">Análise Abrangente de Compliance Regulatório</div>
  <div style="margin-top: 20px; font-size: 10pt; color: #666;">
    <strong>Empresa:</strong> ${companyName}<br>
    <strong>Segmento:</strong> ${reportData.companyInfo?.segment || 'Life Sciences'}<br>
    <strong>Data de Geração:</strong> ${currentDate}
  </div>
</div>

<div class="section">
  <div class="section-title">1. Sumário Executivo</div>
  
  <div class="metric-grid">
    <div class="metric">
      <div class="metric-value">${Math.round(reportData.overallScore)}%</div>
      <div class="metric-label">Score Geral de Compliance</div>
    </div>
    <div class="metric">
      <div class="metric-value">${reportData.areaScores?.length || 0}</div>
      <div class="metric-label">Áreas Avaliadas</div>
    </div>
    <div class="metric">
      <div class="metric-value">${reportData.criticalGaps?.length || 0}</div>
      <div class="metric-label">Gaps Críticos</div>
    </div>
    <div class="metric">
      <div class="metric-value">${formatCurrency(reportData.systemsCost?.totalAnnual || 0)}</div>
      <div class="metric-label">Investimento Anual em TI</div>
    </div>
  </div>

  <div class="card">
    <strong>Nível de Maturidade:</strong> 
    ${reportData.overallScore >= 80 ? 'Alto - Processos bem estabelecidos' : 
      reportData.overallScore >= 60 ? 'Médio - Necessita melhorias' : 
      'Baixo - Requer atenção imediata'}
  </div>
</div>

<div class="page-break"></div>

<!-- PÁGINA 2: VISÃO GERAL E DASHBOARDS -->
<div class="section">
  <div class="section-title">2. Visão Geral do Assessment</div>
  
  <div class="subsection-title">2.1 Informações da Organização</div>
  <table>
    <tr><th>Propriedade</th><th>Valor</th></tr>
    <tr><td>Nome da Empresa</td><td>${companyName}</td></tr>
    <tr><td>Segmento</td><td>${reportData.companyInfo?.segment || 'N/A'}</td></tr>
    <tr><td>Porte</td><td>${reportData.companyInfo?.size || 'N/A'}</td></tr>
    <tr><td>Número de Funcionários</td><td>${reportData.companyInfo?.employees || 'N/A'}</td></tr>
    <tr><td>Data do Assessment</td><td>${new Date(reportData.assessmentDate).toLocaleDateString('pt-BR')}</td></tr>
  </table>

  <div class="subsection-title">2.2 KPIs Principais</div>
  <table>
    <tr><th>Indicador</th><th>Valor</th><th>Status</th></tr>
    <tr>
      <td>Compliance Geral</td>
      <td>${Math.round(reportData.overallScore)}%</td>
      <td><span class="badge ${reportData.overallScore >= 80 ? 'badge-success' : reportData.overallScore >= 60 ? 'badge-warning' : 'badge-danger'}">
        ${reportData.overallScore >= 80 ? 'Excelente' : reportData.overallScore >= 60 ? 'Bom' : 'Necessita Melhoria'}
      </span></td>
    </tr>
    <tr>
      <td>Sistemas GxP Críticos</td>
      <td>${reportData.systemsCost?.gxpSystems || 0}</td>
      <td><span class="badge badge-success">Identificados</span></td>
    </tr>
    <tr>
      <td>Custo por Usuário/Ano</td>
      <td>${formatCurrency(Math.round((reportData.systemsCost?.totalAnnual || 0) / (reportData.systemsCost?.totalUsers || 1)))}</td>
      <td><span class="badge badge-warning">Análise Disponível</span></td>
    </tr>
  </table>
</div>

<div class="page-break"></div>

<!-- PÁGINA 3: SCORES POR ÁREA -->
<div class="section">
  <div class="section-title">3. Assessment de Maturidade por Área</div>
  
  ${(reportData.areaScores || []).map(area => `
    <div class="card no-break">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <div>
          <strong style="font-size: 12pt; color: #1e40af;">${area.area}</strong>
          <span class="badge ${area.score >= 80 ? 'badge-success' : area.score >= 60 ? 'badge-warning' : 'badge-danger'}" style="margin-left: 10px;">
            ${area.score >= 80 ? 'Excelente' : area.score >= 60 ? 'Bom' : 'Moderado'}
          </span>
          <span class="badge" style="background: #e0e7ff; color: #3730a3; margin-left: 5px;">
            Peso: ${area.weight}%
          </span>
        </div>
        <div style="font-size: 20pt; font-weight: bold; color: ${area.score >= 80 ? '#059669' : area.score >= 60 ? '#d97706' : '#dc2626'};">
          ${area.score}%
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${area.score}%;"></div>
      </div>
      ${area.gaps > 0 ? `<div style="margin-top: 8px; color: #dc2626; font-size: 9pt;">⚠ ${area.gaps} gaps identificados</div>` : ''}
    </div>
  `).join('')}
</div>

<div class="page-break"></div>

<!-- PÁGINA 4: GAPS CRÍTICOS -->
<div class="section">
  <div class="section-title">4. Gaps Críticos de Compliance</div>
  
  <p style="margin-bottom: 15px;">Questões de alta prioridade que requerem atenção imediata:</p>
  
  ${(reportData.criticalGaps || []).map((gap, index) => `
    <div class="gap-item">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <div>
          <strong>Gap ${index + 1}: ${gap.gap}</strong>
        </div>
        <span class="badge ${gap.risk === 'High' ? 'badge-danger' : gap.risk === 'Medium' ? 'badge-warning' : 'badge-success'}">
          ${gap.risk === 'High' ? 'Alto Risco' : gap.risk === 'Medium' ? 'Médio Risco' : 'Baixo Risco'}
        </span>
      </div>
      <div style="font-size: 9pt; color: #666; margin-bottom: 5px;">
        <strong>Área:</strong> ${gap.area} | <strong>Regulação:</strong> ${gap.regulation}
      </div>
      <div style="margin-top: 8px;">
        <strong>Recomendação:</strong> ${gap.recommendation}
      </div>
    </div>
  `).join('')}
</div>

<div class="page-break"></div>

<!-- PÁGINA 5: ANÁLISE REGULATÓRIA -->
<div class="section">
  <div class="section-title">5. Análise de Compliance Regulatório</div>
  
  <p style="margin-bottom: 15px;">Status de compliance em relação aos principais frameworks regulatórios:</p>
  
  <table>
    <tr>
      <th>Framework Regulatório</th>
      <th>Score</th>
      <th>Gaps Identificados</th>
      <th>Status</th>
    </tr>
    ${Object.entries(reportData.regulatoryCompliance || {}).map(([regulation, data]) => `
      <tr>
        <td><strong>${regulation}</strong></td>
        <td>
          <div class="progress-bar" style="width: 150px; display: inline-block;">
            <div class="progress-fill" style="width: ${data.score}%;"></div>
          </div>
          <strong style="margin-left: 10px;">${data.score}%</strong>
        </td>
        <td>${data.gaps} gaps</td>
        <td>
          <span class="badge ${data.score >= 80 ? 'badge-success' : data.score >= 60 ? 'badge-warning' : 'badge-danger'}">
            ${data.score >= 80 ? 'Compliant' : data.score >= 60 ? 'Parcial' : 'Não Compliant'}
          </span>
        </td>
      </tr>
    `).join('')}
  </table>
</div>

<div class="page-break"></div>

<!-- PÁGINA 6: INVENTÁRIO DE SISTEMAS E CUSTOS -->
<div class="section">
  <div class="section-title">6. Inventário de Sistemas e Análise de Custos</div>
  
  <div class="subsection-title">6.1 Análise de Custos</div>
  <table>
    <tr><th>Categoria</th><th>Valor (BRL)</th></tr>
    <tr>
      <td>Licenças Mensais</td>
      <td>${formatCurrency(reportData.systemsCost?.monthlyLicenses || 0)}</td>
    </tr>
    <tr style="background: #fef3c7;">
      <td><strong>Licenças Anuais (Calculado Automaticamente: Mensal × 12)</strong></td>
      <td><strong>${formatCurrency((reportData.systemsCost?.monthlyLicenses || 0) * 12)}</strong></td>
    </tr>
    <tr>
      <td>Suporte & Manutenção</td>
      <td>${formatCurrency(reportData.systemsCost?.support || 0)}</td>
    </tr>
    <tr>
      <td>Infraestrutura</td>
      <td>${formatCurrency(reportData.systemsCost?.infrastructure || 0)}</td>
    </tr>
    <tr style="background: #dbeafe; font-weight: bold;">
      <td><strong>Investimento Anual Total</strong></td>
      <td><strong>${formatCurrency(reportData.systemsCost?.totalAnnual || 0)}</strong></td>
    </tr>
  </table>

  <div class="subsection-title">6.2 Métricas de Sistemas</div>
  <div class="metric-grid">
    <div class="metric">
      <div class="metric-value">${reportData.systemsCost?.totalSystems || 0}</div>
      <div class="metric-label">Total de Sistemas</div>
    </div>
    <div class="metric">
      <div class="metric-value">${reportData.systemsCost?.gxpSystems || 0}</div>
      <div class="metric-label">GxP Críticos</div>
    </div>
    <div class="metric">
      <div class="metric-value">${(reportData.systemsCost?.totalUsers || 0).toLocaleString()}</div>
      <div class="metric-label">Total de Usuários</div>
    </div>
    <div class="metric">
      <div class="metric-value">${formatCurrency(Math.round((reportData.systemsCost?.totalAnnual || 0) / (reportData.systemsCost?.totalUsers || 1)))}</div>
      <div class="metric-label">Custo/Usuário/Ano</div>
    </div>
  </div>
</div>

<div class="page-break"></div>

<!-- PÁGINA 7: RECOMENDAÇÕES ESTRATÉGICAS -->
<div class="section">
  <div class="section-title">7. Recomendações Estratégicas</div>
  
  <p style="margin-bottom: 15px;">Plano de ação priorizado para melhoria de compliance:</p>
  
  ${(reportData.recommendations || []).map((rec, index) => `
    <div class="recommendation-item">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <div>
          <strong>Recomendação ${index + 1}: ${rec.title}</strong>
        </div>
        <span class="badge ${rec.priority === 'High' ? 'badge-danger' : rec.priority === 'Medium' ? 'badge-warning' : 'badge-success'}">
          Prioridade ${rec.priority === 'High' ? 'Alta' : rec.priority === 'Medium' ? 'Média' : 'Baixa'}
        </span>
      </div>
      <div style="font-size: 9pt; color: #666; margin-bottom: 5px;">
        <strong>Categoria:</strong> ${rec.category} | 
        <strong>Timeline:</strong> ${rec.timeline} | 
        <strong>Esforço:</strong> ${rec.effort}
      </div>
      <div style="margin-top: 8px;">
        ${rec.description}
      </div>
    </div>
  `).join('')}
</div>

<div class="section">
  <div class="subsection-title">Próximos Passos</div>
  
  <div class="card">
    <strong>Ações Imediatas (0-30 dias):</strong>
    <ul>
      <li>Revisar e priorizar gaps críticos identificados</li>
      <li>Designar responsáveis para atividades de remediação</li>
      <li>Agendar assessments de acompanhamento</li>
      <li>Iniciar documentação de procedimentos críticos</li>
    </ul>
  </div>

  <div class="card">
    <strong>Metas de Curto Prazo (1-6 meses):</strong>
    <ul>
      <li>Implementar procedimentos de validação de backup</li>
      <li>Iniciar projeto de validação de sistemas críticos</li>
      <li>Aprimorar configurações de trilha de auditoria</li>
      <li>Realizar treinamento de equipe em compliance GxP</li>
    </ul>
  </div>
</div>

<!-- RODAPÉ FINAL -->
<div class="footer">
  <strong>Relatório de Assessment GxP – Gerado Automaticamente pelo Sistema</strong><br>
  SoftExpert © ${new Date().getFullYear()} | Documento Confidencial<br>
  Data de Geração: ${currentDate}
</div>

</body>
</html>
    `;
  };

  const handleDownloadPDF = async () => {
    try {
      if (!reportData || !reportData.companyInfo) {
        toast.error("Dados do relatório não disponíveis");
        return;
      }

      toast.success("🚀 Gerando Relatório Completo com TODAS as seções... Por favor aguarde.");
      
      try {
        // Import jsPDF and html2canvas directly (no sandbox issues)
        const { jsPDF } = await import('jspdf');
        const html2canvas = (await import('html2canvas')).default;
        
        const companyName = (reportData.companyInfo && reportData.companyInfo.name) || 'Empresa';
        const safeCompanyName = String(companyName).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
        const dateStr = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
        const filename = `Relatorio_Assessment_Completo.pdf`;
        
        console.log('📄 Gerando PDF completo com todo o conteúdo HTML estruturado...');
        
        // Generate complete HTML content with all sections
        const fullContent = generateCompletePDFContent();
        
        // Create temporary container
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = fullContent;
        tempDiv.style.position = 'fixed';
        tempDiv.style.left = '-99999px';
        tempDiv.style.top = '0';
        tempDiv.style.width = '210mm';
        tempDiv.style.backgroundColor = '#ffffff';
        document.body.appendChild(tempDiv);
        
        console.log('✅ HTML completo gerado, iniciando conversão para PDF...');
        
        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Capture entire content as high-res canvas
        const canvas = await html2canvas(tempDiv, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 794,
          width: tempDiv.scrollWidth,
          height: tempDiv.scrollHeight
        });
        
        console.log(`✅ Canvas capturado: ${canvas.width}x${canvas.height}px`);
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = pageWidth - 20; // 10mm margins on each side
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add pages and split content
        let heightLeft = imgHeight;
        let position = 10;
        let pageCount = 1;
        
        // Add first page
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - 20);
        
        // Add subsequent pages if content doesn't fit
        while (heightLeft > 0) {
          position = heightLeft - imgHeight + 10;
          pdf.addPage();
          pageCount++;
          pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
          heightLeft -= (pageHeight - 20);
        }
        
        console.log(`✅ PDF gerado com ${pageCount} páginas!`);
        
        // Clean up
        if (tempDiv && tempDiv.parentNode) {
          document.body.removeChild(tempDiv);
        }
        
        // Save PDF
        pdf.save(filename);
        
        toast.success(`✅ Relatório Completo Baixado!\n\n${filename}\n\n${pageCount} páginas com TODAS as seções incluídas.`, {
          duration: 8000
        });
        
      } catch (pdfError) {
        console.error('❌ Erro detalhado do PDF:', pdfError);
        toast.error(`Erro ao gerar PDF: ${pdfError.message || 'Erro desconhecido'}`);
      }
      
    } catch (error) {
      console.error('❌ Erro geral:', error);
      toast.error("Erro ao preparar relatório para PDF.");
    }
  };

  const handleShareReport = () => {
    toast.success("Report sharing link copied to clipboard");
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return "bg-success-light text-success border-success/20";
    if (score >= 60) return "bg-warning-light text-warning border-warning/20";
    return "bg-destructive-light text-destructive border-destructive/20";
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High": return "bg-destructive-light text-destructive border-destructive/20";
      case "Medium": return "bg-warning-light text-warning border-warning/20";
      case "Low": return "bg-success-light text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-destructive-light text-destructive border-destructive/20";
      case "Medium": return "bg-warning-light text-warning border-warning/20";
      case "Low": return "bg-success-light text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <h2 className="text-xl font-semibold text-foreground">Gerando Relatório Completo...</h2>
          <p className="text-muted-foreground">Analisando dados do assessment e calculando scores de compliance</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-warning mx-auto" />
          <h2 className="text-xl font-semibold text-foreground">Dados do Relatório Não Disponíveis</h2>
          <p className="text-muted-foreground">Complete o assessment para gerar seu relatório</p>
          <Link to="/assessment">
            <Button>Iniciar Assessment</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/softexpert-logo.svg" alt="SoftExpert" className="h-8" />
            <img src="/softexpert-logo.svg" alt="SoftExpert" className="h-8" />
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link to="/assessments" className="text-muted-foreground hover:text-foreground">
                Assessments
              </Link>
              <Link to="/assessment" className="text-muted-foreground hover:text-foreground">
                Assessment
              </Link>
              <Link to="/systems" className="text-muted-foreground hover:text-foreground">
                Systems
              </Link>
              <Link to="/reports" className="text-primary font-medium">
                Reports
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div id="report-content" className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-space-grotesk font-bold text-foreground">
                  Relatório de Assessment de Compliance GxP
                </h1>
                <p className="text-muted-foreground">
                  Análise abrangente para {reportData.companyInfo.name} • Gerado em {new Date(reportData.assessmentDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleShareReport} className="flex items-center gap-2">
                  <Share className="h-4 w-4" />
                  Compartilhar Relatório
                </Button>
                <Button onClick={handleDownloadPDF} className="bg-primary hover:bg-primary-hover flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Resumo Executivo
              </CardTitle>
              <CardDescription>Principais descobertas e avaliação geral de compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className={`text-4xl font-bold ${getScoreColor(reportData.overallScore)}`}>
                    {reportData.overallScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Score Geral de Compliance</div>
                  <Progress value={reportData.overallScore} className="h-2" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-foreground">{reportData.areaScores.length}</div>
                  <div className="text-sm text-muted-foreground">Áreas Avaliadas</div>
                  <div className="text-xs text-success">
                    {reportData.areaScores.filter(a => a.status === 'excellent').length} Excelente
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-destructive">{reportData.criticalGaps.length}</div>
                  <div className="text-sm text-muted-foreground">Gaps Críticos</div>
                  <div className="text-xs text-warning">
                    {reportData.criticalGaps.filter(g => g.risk === 'High').length} Alto Risco
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">
                    {formatCurrency(reportData.systemsCost.totalAnnual)}
                  </div>
                  <div className="text-sm text-muted-foreground">Investimento Anual em TI</div>
                  <div className="text-xs text-muted-foreground">
                    {reportData.systemsCost.gxpSystems} Sistemas GxP
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Report Content */}
          <Tabs defaultValue="scores" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="scores">Scores por Área</TabsTrigger>
              <TabsTrigger value="gaps">Gaps Críticos</TabsTrigger>
              <TabsTrigger value="compliance">Regulatório</TabsTrigger>
              <TabsTrigger value="systems">Sistemas & Custos</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
            </TabsList>

            <TabsContent value="scores" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Assessment de Maturidade por Área de Negócio
                  </CardTitle>
                  <CardDescription>
                    Pontuação detalhada em todas as funções de negócio avaliadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.areaScores.map((area, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-foreground">{area.area}</h3>
                            <Badge className={getScoreBadge(area.score)}>
                              {area.status === 'excellent' ? 'excelente' : area.status === 'good' ? 'bom' : 'moderado'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Peso: {area.weight}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl font-bold ${getScoreColor(area.score)}`}>
                              {area.score}%
                            </span>
                            {area.gaps > 0 && (
                              <Badge variant="outline" className="text-xs text-warning">
                                {area.gaps} gaps
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Progress value={area.score} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gaps" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Gaps Críticos de Compliance
                  </CardTitle>
                  <CardDescription>
                    Questões de alta prioridade que requerem atenção imediata
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.criticalGaps.map((gap, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{gap.area}</Badge>
                              <Badge className={`text-xs ${getRiskColor(gap.risk)}`}>
                                {gap.risk === 'High' ? 'Alto' : gap.risk === 'Medium' ? 'Médio' : 'Baixo'} Risco
                              </Badge>
                              <Badge variant="outline" className="text-xs">{gap.regulation}</Badge>
                            </div>
                            <h4 className="font-semibold text-foreground">{gap.gap}</h4>
                            <p className="text-sm text-muted-foreground">{gap.recommendation}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedGap(gap);
                              setShowGapDetails(true);
                            }}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Compliance com Framework Regulatório
                  </CardTitle>
                  <CardDescription>
                    Status de compliance em relação aos principais requisitos regulatórios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(reportData.regulatoryCompliance).map(([regulation, data]) => (
                      <div key={regulation} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-foreground">{regulation}</h4>
                          <span className={`text-lg font-bold ${getScoreColor(data.score)}`}>
                            {data.score}%
                          </span>
                        </div>
                        <div className="space-y-2">
                          <Progress value={data.score} className="h-2" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {data.gaps} gaps de compliance identificados
                            </span>
                            <Badge className={getScoreBadge(data.score)}>
                              {data.score >= 80 ? 'Compliant' : data.score >= 60 ? 'Parcial' : 'Não Compliant'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="systems" className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Análise de Custos de Sistemas
                    </CardTitle>
                    <CardDescription>Detalhamento do investimento anual em TI</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Licenças Mensais</span>
                        <span className="font-bold text-foreground">
                          {formatCurrency(reportData.systemsCost.monthlyLicenses)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Licenças Anuais (automático)</span>
                        <span className="font-bold text-foreground">
                          {formatCurrency(reportData.systemsCost.monthlyLicenses * 12)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Suporte & Manutenção</span>
                        <span className="font-bold text-foreground">
                          {formatCurrency(reportData.systemsCost.support)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Infraestrutura</span>
                        <span className="font-bold text-foreground">
                          {formatCurrency(reportData.systemsCost.infrastructure)}
                        </span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center p-3 bg-primary-light rounded-lg">
                          <span className="font-semibold text-primary">Investimento Anual Total</span>
                          <span className="font-bold text-primary text-lg">
                            {formatCurrency(reportData.systemsCost.totalAnnual)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Visão Geral dos Sistemas
                    </CardTitle>
                    <CardDescription>Métricas principais e utilização</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-foreground">
                          {reportData.systemsCost.totalSystems}
                        </div>
                        <div className="text-sm text-muted-foreground">Total de Sistemas</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-success">
                          {reportData.systemsCost.gxpSystems}
                        </div>
                        <div className="text-sm text-muted-foreground">GxP Críticos</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-foreground">
                          {reportData.systemsCost.totalUsers.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total de Usuários</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {formatCurrency(Math.round(reportData.systemsCost.totalAnnual / reportData.systemsCost.totalUsers))}
                        </div>
                        <div className="text-sm text-muted-foreground">Custo/Usuário/Ano</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Detailed Systems List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Sistemas Implementados - Análise Detalhada
                  </CardTitle>
                  <CardDescription>
                    Detalhamento individual dos sistemas e seus custos operacionais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {JSON.parse(localStorage.getItem('systemsInventory') || '[]').length > 0 ? (
                    <div className="space-y-4">
                      {JSON.parse(localStorage.getItem('systemsInventory') || '[]').map((system, index) => (
                        <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-foreground">{system.name}</h4>
                                <Badge variant="outline" className="text-xs">{system.type}</Badge>
                                {system.gxpCritical && (
                                  <Badge className="bg-success-light text-success border-success/20 text-xs">
                                    GxP Crítico
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                <strong>Fabricante:</strong> {system.vendor} • <strong>Versão:</strong> {system.version || 'N/A'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>Categoria:</strong> {system.category} • <strong>Implantação:</strong> {system.deployment === 'cloud' ? 'Nuvem' : 'Local'}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-foreground">
                                {formatCurrency((system.monthlyCost * 12) + system.supportCost + system.infrastructureCost)}
                              </div>
                              <div className="text-xs text-muted-foreground">Custo total anual</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                            <div className="space-y-1">
                              <span className="text-muted-foreground">Usuários:</span>
                              <div className="font-medium text-foreground">{system.users}</div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-muted-foreground">Licenças/mês:</span>
                              <div className="font-medium text-foreground">{formatCurrency(system.monthlyCost)}</div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-muted-foreground">Suporte anual:</span>
                              <div className="font-medium text-foreground">{formatCurrency(system.supportCost)}</div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-muted-foreground">Infraestrutura:</span>
                              <div className="font-medium text-foreground">{formatCurrency(system.infrastructureCost)}</div>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-border">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-4">
                                <span className="text-muted-foreground">
                                  <strong>SLA:</strong> {system.sla || '99.0%'}
                                </span>
                                <span className="text-muted-foreground">
                                  <strong>Utilização:</strong> {system.utilization || 75}%
                                </span>
                                <span className="text-muted-foreground">
                                  <strong>Custo/usuário/ano:</strong> {formatCurrency(((system.monthlyCost * 12) + system.supportCost + system.infrastructureCost) / (system.users || 1))}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {system.integrations && system.integrations.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs text-muted-foreground">Integrações:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {system.integrations.map((integration, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {integration}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">Nenhum sistema cadastrado</h3>
                      <p className="text-muted-foreground">
                        Complete o inventário de sistemas para visualizar a análise detalhada.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recomendações Estratégicas
                  </CardTitle>
                  <CardDescription>
                    Plano de ação priorizado para melhoria de compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.recommendations.map((rec, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>
                                Prioridade {rec.priority === 'High' ? 'Alta' : rec.priority === 'Medium' ? 'Média' : 'Baixa'}
                              </Badge>
                              <Badge variant="outline" className="text-xs">{rec.category}</Badge>
                              <Badge variant="outline" className="text-xs">{rec.timeline}</Badge>
                            </div>
                            <h4 className="font-semibold text-foreground">{rec.title}</h4>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Esforço:</div>
                            <div className="font-medium text-foreground">{rec.effort}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Items */}
          <Card className="bg-primary-light border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold text-foreground">Próximos Passos</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Ações Imediatas (0-30 dias):</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Revisar e priorizar gaps críticos</li>
                        <li>• Designar responsáveis para atividades de remediação</li>
                        <li>• Agendar assessments de acompanhamento</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Metas de Curto Prazo (1-6 meses):</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Implementar procedimentos de validação de backup</li>
                        <li>• Iniciar projeto de validação WMS</li>
                        <li>• Aprimorar configurações de trilha de auditoria</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      This report should be reviewed quarterly and updated as improvements are implemented.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gap Details Dialog */}
      <Dialog open={showGapDetails} onOpenChange={setShowGapDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Detalhes do Gap Crítico
            </DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre o gap identificado e plano de ação
            </DialogDescription>
          </DialogHeader>
          
          {selectedGap && (
            <div className="space-y-6">
              {/* Gap Overview */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedGap.area}</Badge>
                  <Badge className={`${getRiskColor(selectedGap.risk)}`}>
                    {selectedGap.risk} Risk
                  </Badge>
                  <Badge variant="outline">{selectedGap.regulation}</Badge>
                </div>
                <h3 className="font-semibold text-lg">{selectedGap.gap}</h3>
                <p className="text-muted-foreground">{selectedGap.recommendation}</p>
              </div>

              {/* Detailed Information */}
              {selectedGap.details && (
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Informações do Gap</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedGap.details.questionId && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Questão:</span>
                          <span className="text-sm font-medium">{selectedGap.details.questionId}</span>
                        </div>
                      )}
                      {selectedGap.details.score !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Score:</span>
                          <span className="text-sm font-medium">
                            {selectedGap.details.score}/{selectedGap.details.maxScore || 5}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Nível de Impacto:</span>
                        <span className="text-sm font-medium">{selectedGap.details.impactLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Timeline:</span>
                        <span className="text-sm font-medium">{selectedGap.details.timeline}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Responsabilidades</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Responsável:</span>
                        <span className="text-sm font-medium">{selectedGap.details.responsible}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Recursos:</span>
                        <p className="text-sm font-medium mt-1">{selectedGap.details.resources}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Action Plan */}
              {selectedGap.details?.actions && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Plano de Ação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedGap.details.actions.map((action, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Target Information */}
              {selectedGap.details?.target && (
                <Card className="bg-muted/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Meta de Compliance</p>
                        <p className="text-lg font-semibold">{selectedGap.details.target}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Score Atual</p>
                        <p className="text-lg font-semibold">{selectedGap.details.score}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gap</p>
                        <p className="text-lg font-semibold text-destructive">
                          {selectedGap.details.target - selectedGap.details.score}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsPage;