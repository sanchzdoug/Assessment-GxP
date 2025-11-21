import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Shield, Plus, Edit, Trash2, Search, Filter, 
  DollarSign, Users, Server, Cloud, Building,
  CheckCircle, AlertTriangle, TrendingUp, BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

const SystemsInventory = () => {
  const navigate = useNavigate();
  const [systems, setSystems] = useState([
    {
      id: 1,
      name: "SAP S/4HANA",
      type: "ERP",
      category: "Enterprise Resource Planning",
      vendor: "SAP",
      version: "2023 FPS01",
      deployment: "cloud",
      users: 850,
      monthlyCost: 68000,
      supportCost: 204000,
      infrastructureCost: 0,
      gxpCritical: true,
      integrations: ["TrackWise", "LabWare LIMS", "Verum PAS-X"],
      sla: "99.9%",
      utilization: 87
    },
    {
      id: 2,
      name: "TrackWise Digital",
      type: "QMS",
      category: "Quality Management System",
      vendor: "Sparta Systems",
      version: "2024.1",
      deployment: "cloud",
      users: 150,
      monthlyCost: 20500,
      supportCost: 61500,
      infrastructureCost: 0,
      gxpCritical: true,
      integrations: ["SAP S/4HANA", "LabWare LIMS"],
      sla: "99.5%",
      utilization: 92
    },
    {
      id: 3,
      name: "LabWare LIMS",
      type: "LIMS",
      category: "Laboratory Information Management",
      vendor: "LabWare",
      version: "8.0.1",
      deployment: "onpremise",
      users: 85,
      monthlyCost: 15200,
      supportCost: 45600,
      infrastructureCost: 24000,
      gxpCritical: true,
      integrations: ["SAP S/4HANA", "TrackWise"],
      sla: "99.0%",
      utilization: 78
    },
    {
      id: 4,
      name: "Verum PAS-X MES",
      type: "MES",
      category: "Manufacturing Execution System",
      vendor: "Werum IT Solutions",
      version: "8.2",
      deployment: "onpremise",
      users: 200,
      monthlyCost: 25000,
      supportCost: 75000,
      infrastructureCost: 36000,
      gxpCritical: true,
      integrations: ["SAP S/4HANA"],
      sla: "99.8%",
      utilization: 95
    },
    {
      id: 5,
      name: "Salesforce CRM",
      type: "CRM",
      category: "Customer Relationship Management",
      vendor: "Salesforce",
      version: "Lightning",
      deployment: "cloud",
      users: 120,
      monthlyCost: 8400,
      supportCost: 25200,
      infrastructureCost: 0,
      gxpCritical: false,
      integrations: ["SAP S/4HANA"],
      sla: "99.9%",
      utilization: 65
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showCustomSystemDialog, setShowCustomSystemDialog] = useState(false);
  const [newSystem, setNewSystem] = useState({
    name: '',
    type: '',
    category: '',
    vendor: '',
    version: '',
    deployment: 'cloud',
    users: '',
    monthlyCost: '',
    supportCost: '',
    infrastructureCost: '',
    gxpCritical: false
  });
  const [customSystem, setCustomSystem] = useState({
    name: '',
    type: '',
    process: '',
    vendor: '',
    description: ''
  });

  const systemTypes = [
    "ERP", "QMS", "LIMS", "MES", "CRM", "WMS", "TMS", "PLM", 
    "SCADA", "LMS", "DMS", "EDMS", "Other"
  ];

  const predefinedSystems = [
    // ERP Systems
    { name: "SAP ECC", type: "ERP", vendor: "SAP", process: "Gestão Empresarial", description: "Sistema integrado de gestão empresarial" },
    { name: "SAP S/4HANA", type: "ERP", vendor: "SAP", process: "Gestão Empresarial", description: "ERP de nova geração com analytics em tempo real" },
    { name: "Oracle EBS", type: "ERP", vendor: "Oracle", process: "Gestão Empresarial", description: "Suite completa de aplicações empresariais" },
    { name: "TOTVS Protheus", type: "ERP", vendor: "TOTVS", process: "Gestão Empresarial", description: "ERP nacional para gestão integrada" },
    
    // Quality Management Systems
    { name: "TrackWise Digital", type: "QMS", vendor: "Sparta Systems", process: "Gestão da Qualidade", description: "Plataforma digital para gestão da qualidade GxP" },
    { name: "MasterControl", type: "QMS", vendor: "MasterControl", process: "Gestão da Qualidade", description: "Software de gestão de qualidade e compliance" },
    { name: "Veeva Quality", type: "QMS", vendor: "Veeva", process: "Gestão da Qualidade", description: "Suite de qualidade para ciências da vida" },
    { name: "SoftExpert Excellence Suite", type: "QMS", vendor: "SoftExpert", process: "Gestão da Qualidade", description: "Plataforma de gestão integrada da qualidade" },
    
    // Laboratory Systems
    { name: "LabWare LIMS", type: "LIMS", vendor: "LabWare", process: "Laboratório", description: "Sistema de gestão de informações laboratoriais" },
    { name: "StarLIMS", type: "LIMS", vendor: "Abbott", process: "Laboratório", description: "Solução LIMS para laboratórios analíticos" },
    { name: "NuGenesis SDMS", type: "LIMS", vendor: "Waters", process: "Laboratório", description: "Sistema de gestão de dados científicos" },
    { name: "LabVantage", type: "LIMS", vendor: "LabVantage", process: "Laboratório", description: "Plataforma LIMS baseada na web" },
    
    // Manufacturing Execution Systems
    { name: "Werum PAS-X", type: "MES", vendor: "Werum", process: "Produção", description: "Sistema de execução para produção farmacêutica" },
    { name: "Rockwell FactoryTalk", type: "MES", vendor: "Rockwell", process: "Produção", description: "Plataforma de automação industrial" },
    { name: "Siemens OpCenter", type: "MES", vendor: "Siemens", process: "Produção", description: "Suite MES para operações de manufatura" },
    
    // Warehouse & Logistics
    { name: "Manhattan WMS", type: "WMS", vendor: "Manhattan", process: "Supply Chain", description: "Sistema de gestão de armazém" },
    { name: "SAP EWM", type: "WMS", vendor: "SAP", process: "Supply Chain", description: "Extended Warehouse Management" },
    { name: "TOTVS Logística", type: "TMS", vendor: "TOTVS", process: "Supply Chain", description: "Sistema de gestão de transportes" },
    
    // Validation & GAMP
    { name: "SoftExpert Validation", type: "Validation", vendor: "SoftExpert", process: "Validação", description: "Software para validação de sistemas" },
    { name: "HP ALM", type: "Validation", vendor: "HP", process: "Validação", description: "Application Lifecycle Management" },
    
    // PLM & R&D
    { name: "Siemens TeamCenter", type: "PLM", vendor: "Siemens", process: "P&D", description: "Product Lifecycle Management" },
    { name: "Oracle PLM", type: "PLM", vendor: "Oracle", process: "P&D", description: "Gestão do ciclo de vida do produto" },
    
    // CRM & Commercial
    { name: "Salesforce", type: "CRM", vendor: "Salesforce", process: "Comercial", description: "Plataforma de relacionamento com cliente" },
    { name: "Microsoft Dynamics", type: "CRM", vendor: "Microsoft", process: "Comercial", description: "Solução CRM empresarial" }
  ];

  const filteredSystems = systems.filter(system => {
    const matchesSearch = system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         system.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         system.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || system.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalCosts = {
    monthly: systems.reduce((sum, sys) => sum + sys.monthlyCost, 0),
    annual: systems.reduce((sum, sys) => sum + (sys.monthlyCost * 12 + sys.supportCost + sys.infrastructureCost), 0),
    support: systems.reduce((sum, sys) => sum + sys.supportCost, 0),
    infrastructure: systems.reduce((sum, sys) => sum + sys.infrastructureCost, 0)
  };

  const totalUsers = systems.reduce((sum, sys) => sum + sys.users, 0);
  const gxpSystems = systems.filter(sys => sys.gxpCritical).length;

  const handleAddSystem = () => {
    if (!newSystem.name || !newSystem.type || !newSystem.vendor) {
      toast.error("Please fill in required fields");
      return;
    }

    const system = {
      id: systems.length + 1,
      ...newSystem,
      users: parseInt(newSystem.users) || 0,
      monthlyCost: parseInt(newSystem.monthlyCost) || 0,
      supportCost: parseInt(newSystem.supportCost) || 0,
      infrastructureCost: parseInt(newSystem.infrastructureCost) || 0,
      integrations: [],
      sla: "99.0%",
      utilization: 75
    };

    setSystems([...systems, system]);
    setNewSystem({
      name: '',
      type: '',
      category: '',
      vendor: '',
      version: '',
      deployment: 'cloud',
      users: '',
      monthlyCost: '',
      supportCost: '',
      infrastructureCost: '',
      gxpCritical: false
    });
    setShowAddDialog(false);
    toast.success("System added successfully");
  };

  const [customSystems, setCustomSystems] = useState([]);

  const handleAddCustomSystem = () => {
    if (!customSystem.name || !customSystem.type || !customSystem.process || !customSystem.vendor) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Create new custom system
    const newCustomSystem = {
      name: customSystem.name,
      type: customSystem.type,
      vendor: customSystem.vendor,
      process: customSystem.process,
      description: customSystem.description || `Sistema customizado: ${customSystem.name}`
    };

    // Add to custom systems state
    setCustomSystems(prev => [...prev, newCustomSystem]);
    
    // Save to localStorage
    const existingCustomSystems = JSON.parse(localStorage.getItem('customSystems') || '[]');
    existingCustomSystems.push(newCustomSystem);
    localStorage.setItem('customSystems', JSON.stringify(existingCustomSystems));
    
    // Reset form
    setCustomSystem({
      name: '',
      type: '',
      process: '',
      vendor: '',
      description: ''
    });
    
    setShowCustomSystemDialog(false);
    toast.success("Sistema customizado adicionado à lista de seleção com sucesso!");
  };

  // Load custom systems on component mount
  useEffect(() => {
    const savedCustomSystems = JSON.parse(localStorage.getItem('customSystems') || '[]');
    setCustomSystems(savedCustomSystems);
  }, []);

  const handleContinue = () => {
    // Save systems data
    localStorage.setItem('systemsInventory', JSON.stringify(systems));
    
    toast.success("Systems inventory saved successfully!");
    
    setTimeout(() => {
      navigate('/reports');
    }, 1000);
  };

  const getDeploymentIcon = (deployment) => {
    return deployment === 'cloud' ? <Cloud className="h-4 w-4" /> : <Server className="h-4 w-4" />;
  };

  const getDeploymentColor = (deployment) => {
    return deployment === 'cloud' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700';
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
              <Link to="/systems" className="text-primary font-medium">
                Systems
              </Link>
              <Link to="/reports" className="text-muted-foreground hover:text-foreground">
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
                  Systems Inventory & Cost Analysis
                </h1>
                <p className="text-muted-foreground">
                  Map your enterprise systems, track costs, and analyze GxP compliance coverage.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary-hover">
                      <Plus className="h-4 w-4 mr-2" />
                      Add System
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New System</DialogTitle>
                      <DialogDescription>
                        Add a new system to your enterprise inventory with cost and compliance details.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="systemName">System Name *</Label>
                        <Input
                          id="systemName"
                          placeholder="Enter system name"
                          value={newSystem.name}
                          onChange={(e) => setNewSystem({...newSystem, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="systemType">Type *</Label>
                        <Select value={newSystem.type} onValueChange={(value) => setNewSystem({...newSystem, type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select system type" />
                          </SelectTrigger>
                          <SelectContent>
                            {systemTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendor">Vendor *</Label>
                        <Input
                          id="vendor"
                          placeholder="Enter vendor name"
                          value={newSystem.vendor}
                          onChange={(e) => setNewSystem({...newSystem, vendor: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="version">Version</Label>
                        <Input
                          id="version"
                          placeholder="Enter version"
                          value={newSystem.version}
                          onChange={(e) => setNewSystem({...newSystem, version: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deployment">Deployment</Label>
                        <Select value={newSystem.deployment} onValueChange={(value) => setNewSystem({...newSystem, deployment: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cloud">Cloud</SelectItem>
                            <SelectItem value="onpremise">On-Premise</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="users">Number of Users</Label>
                        <Input
                          id="users"
                          type="number"
                          placeholder="Enter user count"
                          value={newSystem.users}
                          onChange={(e) => setNewSystem({...newSystem, users: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="monthlyCost">Monthly License Cost ($)</Label>
                        <Input
                          id="monthlyCost"
                          type="number"
                          placeholder="Enter monthly cost"
                          value={newSystem.monthlyCost}
                          onChange={(e) => setNewSystem({...newSystem, monthlyCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supportCost">Annual Support Cost ($)</Label>
                        <Input
                          id="supportCost"
                          type="number"
                          placeholder="Enter support cost"
                          value={newSystem.supportCost}
                          onChange={(e) => setNewSystem({...newSystem, supportCost: e.target.value})}
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="gxpCritical" 
                            checked={newSystem.gxpCritical}
                            onCheckedChange={(checked) => setNewSystem({...newSystem, gxpCritical: checked})}
                          />
                          <Label htmlFor="gxpCritical" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            GxP Critical System
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddSystem} className="bg-primary hover:bg-primary-hover">
                        Add System
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Custom System Dialog */}
                <Dialog open={showCustomSystemDialog} onOpenChange={setShowCustomSystemDialog}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Adicionar Sistema Customizado</DialogTitle>
                      <DialogDescription>
                        Adicione um sistema que não está na lista padrão. Ele será incluído nas opções de seleção.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="customSystemName">Nome do Sistema *</Label>
                        <Input
                          id="customSystemName"
                          placeholder="Ex: Sistema Interno de Produção"
                          value={customSystem.name}
                          onChange={(e) => setCustomSystem({...customSystem, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customSystemType">Tipo *</Label>
                        <Select value={customSystem.type} onValueChange={(value) => setCustomSystem({...customSystem, type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {systemTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customSystemProcess">Processo de Negócio *</Label>
                        <Input
                          id="customSystemProcess"
                          placeholder="Ex: Gestão da Produção"
                          value={customSystem.process}
                          onChange={(e) => setCustomSystem({...customSystem, process: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customSystemVendor">Fornecedor *</Label>
                        <Input
                          id="customSystemVendor"
                          placeholder="Ex: Empresa XYZ"
                          value={customSystem.vendor}
                          onChange={(e) => setCustomSystem({...customSystem, vendor: e.target.value})}
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="customSystemDescription">Descrição</Label>
                        <Input
                          id="customSystemDescription"
                          placeholder="Descreva o que este sistema faz..."
                          value={customSystem.description}
                          onChange={(e) => setCustomSystem({...customSystem, description: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setShowCustomSystemDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddCustomSystem} className="bg-primary hover:bg-primary-hover">
                        Adicionar Sistema
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button onClick={handleContinue} className="bg-success hover:bg-success/90">
                  Continue to Reports
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Annual Cost</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${(totalCosts.annual / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    ${(totalCosts.monthly / 1000).toFixed(0)}K monthly licenses
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Systems</p>
                    <p className="text-2xl font-bold text-foreground">{systems.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center">
                    <Server className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-success flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {gxpSystems} GxP Critical
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold text-foreground">{totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Across {systems.length} systems
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Cost/User</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${Math.round(totalCosts.annual / totalUsers)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Annual cost per user
                  </p>
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
                      placeholder="Search systems, vendors, or types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Systems</SelectItem>
                      {systemTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Systems List */}
          <Tabs defaultValue="selection" className="space-y-6">
            <TabsList>
              <TabsTrigger value="selection">Seleção de Sistemas</TabsTrigger>
              <TabsTrigger value="list">Systems List</TabsTrigger>
              <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="selection" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Selecionar e Configurar Sistemas Utilizados
                  </CardTitle>
                  <CardDescription>
                    Marque os sistemas que sua empresa utiliza e preencha as informações de custo e configuração
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Search and Filter for System Selection */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            placeholder="Buscar sistemas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os Tipos</SelectItem>
                          {systemTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCustomSystemDialog(true)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Sistema Customizado
                      </Button>
                    </div>

                    {/* Systems Selection Table */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[1200px]">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-3 font-semibold text-foreground border-r">Selecionado</th>
                              <th className="text-left p-3 font-semibold text-foreground border-r">Processo de Negócio</th>
                              <th className="text-left p-3 font-semibold text-foreground border-r">Sistema</th>
                              <th className="text-left p-3 font-semibold text-foreground border-r">Descrição (O que ele faz?)</th>
                              <th className="text-left p-3 font-semibold text-foreground border-r">Custo Licença Mês (R$)</th>
                              <th className="text-left p-3 font-semibold text-foreground border-r">Custo Licença Ano (R$)</th>
                              <th className="text-left p-3 font-semibold text-foreground border-r">Qtde Licenças</th>
                              <th className="text-left p-3 font-semibold text-foreground border-r">Nr de Usuários</th>
                              <th className="text-left p-3 font-semibold text-foreground border-r">Infra. Local?</th>
                              <th className="text-left p-3 font-semibold text-foreground">Custo de Infra. (R$)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {predefinedSystems
                              .filter(sys => {
                                const matchesSearch = sys.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                     sys.process?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                     sys.type.toLowerCase().includes(searchTerm.toLowerCase());
                                const matchesFilter = filterType === 'all' || sys.type === filterType;
                                return matchesSearch && matchesFilter;
                              })
                              .map((system, index) => {
                                const isSelected = systems.some(s => s.name === system.name);
                                const systemData = systems.find(s => s.name === system.name) || {
                                  monthlyCost: '',
                                  supportCost: '',
                                  users: '',
                                  infrastructureCost: '',
                                  deployment: 'cloud'
                                };
                                
                                return (
                                  <tr key={index} className={`border-t hover:bg-muted/30 ${isSelected ? 'bg-primary-light/30' : ''}`}>
                                    <td className="p-3 border-r">
                                      <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            const newSystem = {
                                              id: systems.length + 1,
                                              name: system.name,
                                              type: system.type,
                                              category: system.process,
                                              vendor: system.vendor,
                                              version: '',
                                              deployment: 'cloud',
                                              users: 0,
                                              monthlyCost: 0,
                                              supportCost: 0,
                                              infrastructureCost: 0,
                                              gxpCritical: ['QMS', 'LIMS', 'MES', 'ERP'].includes(system.type),
                                              integrations: [],
                                              sla: "99.0%",
                                              utilization: 75
                                            };
                                            setSystems([...systems, newSystem]);
                                          } else {
                                            setSystems(systems.filter(s => s.name !== system.name));
                                          }
                                        }}
                                      />
                                    </td>
                                    <td className="p-3 border-r">
                                      <Badge variant="outline" className="text-xs">{system.process}</Badge>
                                    </td>
                                    <td className="p-3 border-r font-medium text-foreground">{system.name}</td>
                                    <td className="p-3 border-r text-sm text-muted-foreground max-w-[200px]">{system.description}</td>
                                    <td className="p-3 border-r">
                                      {isSelected && (
                                        <Input
                                          type="number"
                                          placeholder="0"
                                          value={systemData.monthlyCost}
                                          onChange={(e) => {
                                            const updatedSystems = systems.map(s => 
                                              s.name === system.name 
                                                ? { ...s, monthlyCost: parseInt(e.target.value) || 0 }
                                                : s
                                            );
                                            setSystems(updatedSystems);
                                          }}
                                          className="w-24 h-8 text-sm"
                                        />
                                      )}
                                    </td>
                                    <td className="p-3 border-r">
                                      {isSelected && (
                                        <Input
                                          type="number"
                                          placeholder="0"
                                          value={systemData.supportCost}
                                          onChange={(e) => {
                                            const updatedSystems = systems.map(s => 
                                              s.name === system.name 
                                                ? { ...s, supportCost: parseInt(e.target.value) || 0 }
                                                : s
                                            );
                                            setSystems(updatedSystems);
                                          }}
                                          className="w-24 h-8 text-sm"
                                        />
                                      )}
                                    </td>
                                    <td className="p-3 border-r">
                                      {isSelected && (
                                        <Input
                                          type="number"
                                          placeholder="0"
                                          value={systemData.users}
                                          onChange={(e) => {
                                            const updatedSystems = systems.map(s => 
                                              s.name === system.name 
                                                ? { ...s, users: parseInt(e.target.value) || 0 }
                                                : s
                                            );
                                            setSystems(updatedSystems);
                                          }}
                                          className="w-20 h-8 text-sm"
                                        />
                                      )}
                                    </td>
                                    <td className="p-3 border-r">
                                      {isSelected && (
                                        <Input
                                          type="number"
                                          placeholder="0"
                                          className="w-20 h-8 text-sm"
                                        />
                                      )}
                                    </td>
                                    <td className="p-3 border-r">
                                      {isSelected && (
                                        <Select 
                                          value={systemData.deployment} 
                                          onValueChange={(value) => {
                                            const updatedSystems = systems.map(s => 
                                              s.name === system.name 
                                                ? { ...s, deployment: value }
                                                : s
                                            );
                                            setSystems(updatedSystems);
                                          }}
                                        >
                                          <SelectTrigger className="w-20 h-8 text-xs">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="cloud">Não</SelectItem>
                                            <SelectItem value="onpremise">Sim</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      )}
                                    </td>
                                    <td className="p-3">
                                      {isSelected && (
                                        <Input
                                          type="number"
                                          placeholder="0"
                                          value={systemData.infrastructureCost}
                                          onChange={(e) => {
                                            const updatedSystems = systems.map(s => 
                                              s.name === system.name 
                                                ? { ...s, infrastructureCost: parseInt(e.target.value) || 0 }
                                                : s
                                            );
                                            setSystems(updatedSystems);
                                          }}
                                          className="w-24 h-8 text-sm"
                                        />
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Selected Systems Summary */}
                    {systems.length > 0 && (
                      <Card className="bg-primary-light border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">Resumo dos Sistemas Selecionados</h3>
                              <p className="text-sm text-muted-foreground">
                                {systems.length} sistemas selecionados • 
                                Custo total mensal: R$ {systems.reduce((sum, s) => sum + (s.monthlyCost || 0), 0).toLocaleString()} • 
                                Custo total anual: R$ {systems.reduce((sum, s) => sum + (s.monthlyCost || 0) * 12 + (s.supportCost || 0) + (s.infrastructureCost || 0), 0).toLocaleString()}
                              </p>
                            </div>
                            <Button onClick={handleContinue} className="bg-success hover:bg-success/90">
                              Salvar e Continuar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="grid gap-4">
                {filteredSystems.map((system) => (
                  <Card key={system.id} className="hover:shadow-medium transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                              {getDeploymentIcon(system.deployment)}
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold text-foreground">{system.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {system.vendor} • {system.version || 'Version not specified'}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={`${getDeploymentColor(system.deployment)} border-0`}>
                                    {system.deployment.charAt(0).toUpperCase() + system.deployment.slice(1)}
                                  </Badge>
                                  <Badge variant="outline">{system.type}</Badge>
                                  {system.gxpCritical && (
                                    <Badge className="bg-success-light text-success border-success/20">
                                      GxP Critical
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="grid md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Users:</span>
                                  <div className="font-medium text-foreground">{system.users}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Monthly Cost:</span>
                                  <div className="font-medium text-foreground">${system.monthlyCost.toLocaleString()}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Annual Total:</span>
                                  <div className="font-medium text-foreground">
                                    ${((system.monthlyCost * 12) + system.supportCost + system.infrastructureCost).toLocaleString()}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Utilization:</span>
                                  <div className="font-medium text-foreground">{system.utilization}%</div>
                                </div>
                              </div>
                              
                              {system.integrations.length > 0 && (
                                <div>
                                  <span className="text-xs text-muted-foreground">Integrations:</span>
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
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="costs" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Cost Breakdown by Category
                    </CardTitle>
                    <CardDescription>Annual spending across system types</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemTypes.filter(type => systems.some(s => s.type === type)).map((type) => {
                      const typeSystems = systems.filter(s => s.type === type);
                      const totalCost = typeSystems.reduce((sum, s) => sum + (s.monthlyCost * 12 + s.supportCost + s.infrastructureCost), 0);
                      const percentage = Math.round((totalCost / totalCosts.annual) * 100);
                      
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{type}</span>
                            <span className="font-bold text-foreground">${(totalCost / 1000).toFixed(0)}K</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-10">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost Summary</CardTitle>
                    <CardDescription>Detailed cost analysis breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Monthly Licenses</span>
                        <span className="font-bold text-foreground">${totalCosts.monthly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Annual Licenses</span>
                        <span className="font-bold text-foreground">${(totalCosts.monthly * 12).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Support & Maintenance</span>
                        <span className="font-bold text-foreground">${totalCosts.support.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Infrastructure</span>
                        <span className="font-bold text-foreground">${totalCosts.infrastructure.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center p-3 bg-primary-light rounded-lg">
                          <span className="font-semibold text-primary">Total Annual Cost</span>
                          <span className="font-bold text-primary text-lg">${totalCosts.annual.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SystemsInventory;