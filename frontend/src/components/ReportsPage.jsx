import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, Download, Share, FileText, BarChart3, 
  AlertTriangle, CheckCircle, TrendingUp, Award,
  Target, Users, DollarSign, Calendar, Eye
} from 'lucide-react';
import { toast } from 'sonner';

const ReportsPage = () => {
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock report generation on component mount
  useEffect(() => {
    generateReport();
  }, []);

  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Get real assessment data
      const assessmentResults = JSON.parse(localStorage.getItem('assessmentResults') || '{}');
      const systemsInventory = JSON.parse(localStorage.getItem('systemsInventory') || '[]');
      
      if (!assessmentResults.responses) {
        // If no real data, use demo data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate demo report data
        const mockReportData = {
        companyInfo: {
          name: "BioPharma Solutions",
          segment: "Pharmaceutical",
          employees: 2500,
          type: "Headquarters"
        },
        overallScore: 78,
        assessmentDate: new Date().toISOString(),
        areaScores: [
          { area: "Quality Assurance", score: 85, weight: 20, status: "excellent", gaps: 1 },
          { area: "System Validation", score: 72, weight: 15, status: "good", gaps: 2 },
          { area: "Information Technology", score: 68, weight: 15, status: "moderate", gaps: 3 },
          { area: "Information Security", score: 82, weight: 15, status: "excellent", gaps: 1 },
          { area: "Production / MES", score: 75, weight: 15, status: "good", gaps: 2 },
          { area: "Laboratory / LIMS", score: 79, weight: 10, status: "good", gaps: 1 },
          { area: "Supply Chain", score: 65, weight: 10, status: "moderate", gaps: 4 }
        ],
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
      
      setReportData(mockReportData);
      toast.success("Relatório de demonstração gerado com sucesso");
      return;
    }
    
    // Generate real report from assessment data
    const realReportData = {
      companyInfo: assessmentResults.companyData || {
        name: "Empresa Não Informada",
        segment: "Segmento Não Informado",
        employees: 0,
        type: "Headquarters"
      },
      overallScore: assessmentResults.overallScore || 0,
      assessmentDate: assessmentResults.completedAt || new Date().toISOString(),
      areaScores: assessmentResults.areaScores || [],
      criticalGaps: [],
      regulatoryCompliance: {
        "21 CFR Part 11": { score: Math.max(0, (assessmentResults.overallScore || 0) - 10), gaps: 2 },
        "EU GMP Annex 11": { score: Math.max(0, (assessmentResults.overallScore || 0) - 5), gaps: 1 },
        "RDC 658/2022": { score: Math.max(0, (assessmentResults.overallScore || 0) - 15), gaps: 3 },
        "IN 134/2022": { score: Math.max(0, (assessmentResults.overallScore || 0) + 5), gaps: 0 },
        "IN 138/2022": { score: Math.max(0, (assessmentResults.overallScore || 0) - 2), gaps: 1 },
        "ALCOA+": { score: Math.max(0, (assessmentResults.overallScore || 0) - 8), gaps: 2 }
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
          category: "Técnica",
          title: "Melhorar Áreas com Score Baixo",
          description: `Focar nas áreas com pontuação inferior a 70% para melhorar o compliance geral.`,
          timeline: "3-6 meses",
          effort: "Médio"
        },
        {
          priority: "Medium",
          category: "Processual",
          title: "Padronizar Processos GxP",
          description: "Implementar procedimentos padronizados em todas as áreas avaliadas.",
          timeline: "6-12 meses",
          effort: "Alto"
        }
      ]
    };
    
    // Generate critical gaps based on low scores
    assessmentResults.areaScores?.forEach(area => {
      if (area.score < 60) {
        realReportData.criticalGaps.push({
          area: area.area,
          gap: `Pontuação baixa identificada: ${area.score}%`,
          regulation: "Requisitos GxP Gerais",
          risk: area.score < 40 ? "High" : "Medium",
          recommendation: `Implementar melhorias nos processos de ${area.area.toLowerCase()}`
        });
      }
    });
    
    setReportData(realReportData);
    toast.success("Relatório do assessment gerado com sucesso");
      
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      toast.error("Falha ao gerar relatório");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Import html2pdf dynamically
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Get the report content
      const element = document.getElementById('report-content');
      
      if (!element) {
        toast.error("Conteúdo do relatório não encontrado");
        return;
      }

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Assessment_${reportData.companyInfo.name}_${new Date().toLocaleDateString('pt-BR')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      toast.success("Iniciando geração do PDF...");
      
      await html2pdf().set(opt).from(element).save();
      
      toast.success("PDF baixado com sucesso!");
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error("Erro ao gerar PDF. Tentando método alternativo...");
      
      // Fallback: open print dialog
      window.print();
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
          <h2 className="text-xl font-semibold text-foreground">Generating Comprehensive Report...</h2>
          <p className="text-muted-foreground">Analyzing assessment data and calculating compliance scores</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-warning mx-auto" />
          <h2 className="text-xl font-semibold text-foreground">No Report Data Available</h2>
          <p className="text-muted-foreground">Complete the assessment to generate your report</p>
          <Link to="/assessment">
            <Button>Start Assessment</Button>
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
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-space-grotesk font-bold text-foreground">GxP Compass</span>
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
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-space-grotesk font-bold text-foreground">
                  GxP Compliance Assessment Report
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive analysis for {reportData.companyInfo.name} • Generated {new Date(reportData.assessmentDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleShareReport} className="flex items-center gap-2">
                  <Share className="h-4 w-4" />
                  Share Report
                </Button>
                <Button onClick={handleDownloadPDF} className="bg-primary hover:bg-primary-hover flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Executive Summary
              </CardTitle>
              <CardDescription>Key findings and overall compliance assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className={`text-4xl font-bold ${getScoreColor(reportData.overallScore)}`}>
                    {reportData.overallScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Compliance Score</div>
                  <Progress value={reportData.overallScore} className="h-2" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-foreground">{reportData.areaScores.length}</div>
                  <div className="text-sm text-muted-foreground">Areas Assessed</div>
                  <div className="text-xs text-success">
                    {reportData.areaScores.filter(a => a.status === 'excellent').length} Excellent
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-destructive">{reportData.criticalGaps.length}</div>
                  <div className="text-sm text-muted-foreground">Critical Gaps</div>
                  <div className="text-xs text-warning">
                    {reportData.criticalGaps.filter(g => g.risk === 'High').length} High Risk
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">
                    ${(reportData.systemsCost.totalAnnual / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-muted-foreground">Annual IT Investment</div>
                  <div className="text-xs text-muted-foreground">
                    {reportData.systemsCost.gxpSystems} GxP Systems
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Report Content */}
          <Tabs defaultValue="scores" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="scores">Area Scores</TabsTrigger>
              <TabsTrigger value="gaps">Critical Gaps</TabsTrigger>
              <TabsTrigger value="compliance">Regulatory</TabsTrigger>
              <TabsTrigger value="systems">Systems & Costs</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="scores" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Maturity Assessment by Business Area
                  </CardTitle>
                  <CardDescription>
                    Detailed scoring across all evaluated business functions
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
                              {area.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Weight: {area.weight}%
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
                    Critical Compliance Gaps
                  </CardTitle>
                  <CardDescription>
                    High-priority issues requiring immediate attention
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
                                {gap.risk} Risk
                              </Badge>
                              <Badge variant="outline" className="text-xs">{gap.regulation}</Badge>
                            </div>
                            <h4 className="font-semibold text-foreground">{gap.gap}</h4>
                            <p className="text-sm text-muted-foreground">{gap.recommendation}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
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
                    Regulatory Framework Compliance
                  </CardTitle>
                  <CardDescription>
                    Compliance status across key regulatory requirements
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
                              {data.gaps} compliance gaps identified
                            </span>
                            <Badge className={getScoreBadge(data.score)}>
                              {data.score >= 80 ? 'Compliant' : data.score >= 60 ? 'Partial' : 'Non-Compliant'}
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
                      Systems Cost Analysis
                    </CardTitle>
                    <CardDescription>Annual IT investment breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Monthly Licenses</span>
                        <span className="font-bold text-foreground">
                          ${reportData.systemsCost.monthlyLicenses.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Annual Licenses</span>
                        <span className="font-bold text-foreground">
                          ${(reportData.systemsCost.monthlyLicenses * 12).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Support & Maintenance</span>
                        <span className="font-bold text-foreground">
                          ${reportData.systemsCost.support.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Infrastructure</span>
                        <span className="font-bold text-foreground">
                          ${reportData.systemsCost.infrastructure.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center p-3 bg-primary-light rounded-lg">
                          <span className="font-semibold text-primary">Total Annual Investment</span>
                          <span className="font-bold text-primary text-lg">
                            ${reportData.systemsCost.totalAnnual.toLocaleString()}
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
                      Systems Overview
                    </CardTitle>
                    <CardDescription>Key metrics and utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-foreground">
                          {reportData.systemsCost.totalSystems}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Systems</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-success">
                          {reportData.systemsCost.gxpSystems}
                        </div>
                        <div className="text-sm text-muted-foreground">GxP Critical</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-foreground">
                          {reportData.systemsCost.totalUsers.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Users</div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          ${Math.round(reportData.systemsCost.totalAnnual / reportData.systemsCost.totalUsers)}
                        </div>
                        <div className="text-sm text-muted-foreground">Cost/User/Year</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Strategic Recommendations
                  </CardTitle>
                  <CardDescription>
                    Prioritized action plan for compliance improvement
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
                                {rec.priority} Priority
                              </Badge>
                              <Badge variant="outline" className="text-xs">{rec.category}</Badge>
                              <Badge variant="outline" className="text-xs">{rec.timeline}</Badge>
                            </div>
                            <h4 className="font-semibold text-foreground">{rec.title}</h4>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Effort:</div>
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
                  <h3 className="font-semibold text-foreground">Next Steps</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Immediate Actions (0-30 days):</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Review and prioritize critical gaps</li>
                        <li>• Assign ownership for remediation activities</li>
                        <li>• Schedule follow-up assessments</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Short-term Goals (1-6 months):</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Implement backup validation procedures</li>
                        <li>• Begin WMS validation project</li>
                        <li>• Enhance audit trail configurations</li>
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
    </div>
  );
};

export default ReportsPage;