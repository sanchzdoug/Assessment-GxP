import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, BarChart3, Users, FileText, Settings, Bell,
  TrendingUp, AlertTriangle, CheckCircle, Clock,
  Building, Award, Target, ArrowRight, Plus
} from 'lucide-react';

const Dashboard = () => {
  const [selectedCompany] = useState({
    name: "BioPharma Solutions",
    segment: "Pharmaceutical",
    employees: 2500,
    overallScore: 78
  });

  const areaScores = [
    { area: "Quality Assurance", score: 85, status: "excellent", trend: "up" },
    { area: "System Validation", score: 72, status: "good", trend: "stable" },
    { area: "Information Technology", score: 68, status: "moderate", trend: "up" },
    { area: "Information Security", score: 82, status: "excellent", trend: "up" },
    { area: "Production / MES", score: 75, status: "good", trend: "stable" },
    { area: "Laboratory / LIMS", score: 79, status: "good", trend: "up" },
    { area: "Supply Chain", score: 65, status: "moderate", trend: "down" },
    { area: "Clinical Research", score: 88, status: "excellent", trend: "up" },
    { area: "Product Development", score: 71, status: "good", trend: "stable" },
    { area: "Training & LMS", score: 63, status: "moderate", trend: "up" },
    { area: "Engineering & Maintenance", score: 69, status: "moderate", trend: "stable" },
    { area: "Regulatory Affairs", score: 91, status: "excellent", trend: "stable" }
  ];

  const recentActivities = [
    {
      type: "assessment",
      title: "Quality Assurance Assessment Completed",
      description: "Score improved from 78 to 85 (+7 points)",
      time: "2 hours ago",
      status: "success"
    },
    {
      type: "system",
      title: "New System Added: TrackWise QMS",
      description: "Annual cost: $245,000 | Users: 150",
      time: "1 day ago",
      status: "info"
    },
    {
      type: "alert",
      title: "Supply Chain Score Below Threshold",
      description: "Score dropped to 65. Immediate review recommended.",
      time: "2 days ago",
      status: "warning"
    },
    {
      type: "report",
      title: "Monthly Compliance Report Generated",
      description: "November 2024 assessment summary available",
      time: "3 days ago",
      status: "success"
    }
  ];

  const criticalGaps = [
    {
      area: "Supply Chain",
      gap: "WMS lacks full GxP validation",
      risk: "High",
      regulation: "21 CFR Part 11"
    },
    {
      area: "Training & LMS",
      gap: "Incomplete audit trail for training records",
      risk: "Medium",
      regulation: "EU GMP Annex 11"
    },
    {
      area: "Information Technology",
      gap: "Missing backup validation documentation",
      risk: "Medium",
      regulation: "ALCOA+"
    }
  ];

  const systemsCosts = {
    totalAnnual: 2450000,
    byCategory: [
      { category: "ERP Systems", cost: 820000, percentage: 33 },
      { category: "Quality Management", cost: 490000, percentage: 20 },
      { category: "Laboratory Systems", cost: 368000, percentage: 15 },
      { category: "Manufacturing", cost: 294000, percentage: 12 },
      { category: "Other Systems", cost: 478000, percentage: 20 }
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (status) => {
    const variants = {
      excellent: "bg-success-light text-success border-success/20",
      good: "bg-warning-light text-warning border-warning/20",
      moderate: "bg-destructive-light text-destructive border-destructive/20"
    };
    return variants[status] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img src="/softexpert-logo.svg" alt="SoftExpert" className="h-8" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-primary font-medium">
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
              <Link to="/reports" className="text-muted-foreground hover:text-foreground">
                Reports
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-foreground">{selectedCompany.name}</div>
                <div className="text-xs text-muted-foreground">{selectedCompany.segment}</div>
              </div>
              <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                <Building className="h-5 w-5 text-primary" />
              </div>
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
                  GxP Compliance Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Overview of regulatory compliance and system maturity for {selectedCompany.name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/assessment">
                  <Button className="bg-primary hover:bg-primary-hover">
                    <Plus className="h-4 w-4 mr-2" />
                    New Assessment
                  </Button>
                </Link>
                <Link to="/reports">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="gradient-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                    <p className={`text-3xl font-bold ${getScoreColor(selectedCompany.overallScore)}`}>
                      {selectedCompany.overallScore}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={selectedCompany.overallScore} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Areas Assessed</p>
                    <p className="text-3xl font-bold text-foreground">12</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-success flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    3 improved this month
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Critical Gaps</p>
                    <p className="text-3xl font-bold text-destructive">{criticalGaps.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-destructive-light rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Requires immediate attention
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Annual IT Cost</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${(systemsCosts.totalAnnual / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Across {systemsCosts.byCategory.length} categories
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="areas">Area Scores</TabsTrigger>
              <TabsTrigger value="gaps">Critical Gaps</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Maturity by Area
                    </CardTitle>
                    <CardDescription>
                      Performance across all assessed business areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {areaScores.slice(0, 6).map((area, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{area.area}</span>
                            <span className={`text-sm font-bold ${getScoreColor(area.score)}`}>
                              {area.score}%
                            </span>
                          </div>
                          <Progress value={area.score} className="h-2" />
                        </div>
                      </div>
                    ))}
                    <Link to="/assessment">
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        View All Areas
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Systems Cost Breakdown
                    </CardTitle>
                    <CardDescription>
                      Annual IT spending by system category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemsCosts.byCategory.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{category.category}</span>
                          <span className="text-sm font-bold text-foreground">
                            ${(category.cost / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={category.percentage} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground w-8">{category.percentage}%</span>
                        </div>
                      </div>
                    ))}
                    <Link to="/systems">
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Manage Systems
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="areas" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {areaScores.map((area, index) => (
                  <Card key={index} className="hover:shadow-medium transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-foreground text-sm">{area.area}</h3>
                        <Badge className={getScoreBadge(area.status)}>
                          {area.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-2xl font-bold ${getScoreColor(area.score)}`}>
                            {area.score}%
                          </span>
                          <div className={`flex items-center gap-1 ${
                            area.trend === 'up' ? 'text-success' : 
                            area.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                          }`}>
                            <TrendingUp className={`h-3 w-3 ${
                              area.trend === 'down' ? 'rotate-180' : ''
                            }`} />
                            <span className="text-xs">{area.trend}</span>
                          </div>
                        </div>
                        <Progress value={area.score} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gaps" className="space-y-4">
              <div className="space-y-4">
                {criticalGaps.map((gap, index) => (
                  <Card key={index} className="border-l-4 border-l-destructive">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{gap.area}</Badge>
                            <Badge className={`text-xs ${
                              gap.risk === 'High' ? 'bg-destructive-light text-destructive border-destructive/20' :
                              'bg-warning-light text-warning border-warning/20'
                            }`}>
                              {gap.risk} Risk
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-foreground">{gap.gap}</h3>
                          <p className="text-sm text-muted-foreground">Regulation: {gap.regulation}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.status === 'success' ? 'bg-success-light' :
                          activity.status === 'warning' ? 'bg-warning-light' :
                          'bg-primary-light'
                        }`}>
                          {activity.type === 'assessment' && <CheckCircle className={`h-5 w-5 ${
                            activity.status === 'success' ? 'text-success' : 'text-primary'
                          }`} />}
                          {activity.type === 'system' && <Settings className="h-5 w-5 text-primary" />}
                          {activity.type === 'alert' && <AlertTriangle className="h-5 w-5 text-warning" />}
                          {activity.type === 'report' && <FileText className="h-5 w-5 text-success" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold text-foreground">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;