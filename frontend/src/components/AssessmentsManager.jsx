import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, Search, Filter, Eye, Download, Plus, Edit,
  Building, Calendar, BarChart3, Users, FileText
} from 'lucide-react';

const AssessmentsManager = () => {
  const [assessments, setAssessments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [userRole, setUserRole] = useState('admin'); // 'admin' or 'company'
  const [currentCompany, setCurrentCompany] = useState(null);

  // Load real assessments data
  useEffect(() => {
    const loadAssessments = () => {
      // Get real assessments from localStorage
      const realAssessments = JSON.parse(localStorage.getItem('assessmentsList') || '[]');
      
      // Add some demo data if no real assessments exist
      const demoAssessments = realAssessments.length === 0 ? [
        {
          id: 'demo_1',
          companyName: "Demo BioPharma Solutions",
          companySegment: "Pharmaceutical",
          assessmentDate: "2024-12-15",
          completionDate: "2024-12-20",
          status: "completed",
          overallScore: 78,
          areasCompleted: 12,
          totalAreas: 12,
          lastUpdated: "2024-12-20T10:30:00Z",
          assessor: "Sistema Demo",
          companyId: "demo_comp_001"
        },
        {
          id: 'demo_2',
          companyName: "Demo MedTech Innovations",
          companySegment: "Medical Devices",
          assessmentDate: "2024-12-10",
          completionDate: null,
          status: "in_progress",
          overallScore: 65,
          areasCompleted: 8,
          totalAreas: 12,
          lastUpdated: "2024-12-22T15:45:00Z",
          assessor: "Sistema Demo",
          companyId: "demo_comp_002"
        }
      ] : [];

      const allAssessments = [...realAssessments, ...demoAssessments];

      // If user is company, filter to show only their assessments
      if (userRole === 'company') {
        const companyAssessments = allAssessments.filter(assessment => 
          assessment.companyId === currentCompany?.id
        );
        setAssessments(companyAssessments);
      } else {
        setAssessments(allAssessments);
      }
    };

    loadAssessments();
    
    // Listen for new assessments
    const handleStorageChange = (e) => {
      if (e.key === 'assessmentsList') {
        loadAssessments();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [userRole, currentCompany]);

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.companySegment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.assessor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || assessment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success-light text-success border-success/20">Concluído</Badge>;
      case 'in_progress':
        return <Badge className="bg-warning-light text-warning border-warning/20">Em Andamento</Badge>;
      case 'draft':
        return <Badge className="bg-muted text-muted-foreground border-muted">Rascunho</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    if (score === 0) return "text-muted-foreground";
    return "text-destructive";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCompletionPercentage = (areasCompleted, totalAreas) => {
    return Math.round((areasCompleted / totalAreas) * 100);
  };

  const stats = {
    total: assessments.length,
    completed: assessments.filter(a => a.status === 'completed').length,
    inProgress: assessments.filter(a => a.status === 'in_progress').length,
    draft: assessments.filter(a => a.status === 'draft').length,
    avgScore: assessments.filter(a => a.status === 'completed').length > 0 
      ? Math.round(assessments.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.overallScore, 0) / assessments.filter(a => a.status === 'completed').length)
      : 0
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-space-grotesk font-bold text-foreground">GxP Compass</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link to="/assessments" className="text-primary font-medium">
                Assessments
              </Link>
              {userRole === 'admin' && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  ADMIN
                </span>
              )}
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
                  {userRole === 'admin' ? 'Gestão de Assessments' : 'Seus Assessments'}
                </h1>
                <p className="text-muted-foreground">
                  {userRole === 'admin' 
                    ? 'Visualize e gerencie todos os assessments de compliance das empresas'
                    : 'Acompanhe o progresso dos seus assessments de compliance GxP'
                  }
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/register">
                  <Button className="bg-primary hover:bg-primary-hover">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Concluídos</p>
                    <p className="text-2xl font-bold text-success">{stats.completed}</p>
                  </div>
                  <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Em Andamento</p>
                    <p className="text-2xl font-bold text-warning">{stats.inProgress}</p>
                  </div>
                  <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rascunhos</p>
                    <p className="text-2xl font-bold text-muted-foreground">{stats.draft}</p>
                  </div>
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Score Médio</p>
                    <p className={`text-2xl font-bold ${getScoreColor(stats.avgScore)}`}>
                      {stats.avgScore}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar por empresa, segmento ou avaliador..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                      <SelectItem value="draft">Rascunho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessments List */}
          <div className="space-y-4">
            {filteredAssessments.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {assessment.companyName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {assessment.companySegment} • Avaliador: {assessment.assessor}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(assessment.status)}
                              {assessment.status === 'completed' && (
                                <Badge variant="outline" className="text-xs">
                                  Score: {assessment.overallScore}%
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Iniciado em:</span>
                              <div className="font-medium text-foreground">
                                {formatDate(assessment.assessmentDate)}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                {assessment.status === 'completed' ? 'Concluído em:' : 'Última atualização:'}
                              </span>
                              <div className="font-medium text-foreground">
                                {assessment.completionDate 
                                  ? formatDate(assessment.completionDate)
                                  : formatDate(assessment.lastUpdated)
                                }
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Progresso:</span>
                              <div className="font-medium text-foreground">
                                {assessment.areasCompleted}/{assessment.totalAreas} áreas 
                                ({getCompletionPercentage(assessment.areasCompleted, assessment.totalAreas)}%)
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Score Atual:</span>
                              <div className={`font-medium ${getScoreColor(assessment.overallScore)}`}>
                                {assessment.overallScore > 0 ? `${assessment.overallScore}%` : 'Não calculado'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Link to={`/reports?assessment=${assessment.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Visualizar
                        </Button>
                      </Link>
                      {assessment.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      )}
                      {assessment.status !== 'completed' && (
                        <Link to={`/assessment?id=${assessment.id}`}>
                          <Button size="sm" className="bg-primary hover:bg-primary-hover">
                            Continuar
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAssessments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhum assessment encontrado
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Tente ajustar seus filtros de busca'
                    : 'Não há assessments cadastrados ainda'
                  }
                </p>
                {!searchTerm && filterStatus === 'all' && (
                  <Link to="/register">
                    <Button className="bg-primary hover:bg-primary-hover">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Assessment
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentsManager;