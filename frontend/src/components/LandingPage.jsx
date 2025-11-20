import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, BarChart3, Users, ArrowRight, Award, BookOpen, Target, Star } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "GxP Compliance Assessment",
      description: "Comprehensive evaluation across all regulatory frameworks including 21 CFR Part 11, EU GMP Annex 11, and RDC 658/2022."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Maturity Scoring & Analytics",
      description: "Advanced scoring algorithms provide detailed insights into operational, regulatory and technological maturity."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-Area Assessment",
      description: "Evaluate Quality, Validation, IT, Production, Supply Chain, and 10+ other critical business areas."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Systems Mapping & Cost Analysis",
      description: "Complete inventory of enterprise systems (ERP, MES, LIMS, QMS) with detailed cost and ROI analysis."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Automated Reporting",
      description: "Generate professional PDF reports with scores, gap analysis, risk assessment and actionable recommendations."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Industry Benchmarking",
      description: "Compare your organization's maturity against industry standards and peer companies in your sector."
    }
  ];

  const industries = [
    "Pharmaceutical", "Biotechnology", "Medical Devices", 
    "Veterinary", "Cosmetics", "Chemical"
  ];

  // Testimonials section removed as requested

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="px-6 py-4 backdrop-blur-xl bg-white/90 border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-space-grotesk font-bold text-foreground">GxP Compass</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">
              Features
            </a>
            <a href="#industries" className="text-muted-foreground hover:text-foreground transition-smooth">
              Industries
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-smooth">
              Testimonials
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" className="hidden md:flex">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary hover:bg-primary-hover shadow-glow">
                Start Assessment
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
                  ✨ Trusted by 500+ Life Sciences Companies
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-space-grotesk font-bold text-foreground leading-tight">
                  Transform Your 
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    GxP Compliance
                  </span>
                  <br />Assessment
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Comprehensive digital platform to assess operational, regulatory, and technological maturity across your Life Sciences organization. Get actionable insights, identify critical gaps, and drive regulatory excellence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover shadow-glow group">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                    View Demo Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">No setup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">Industry-standard security</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="hero-glow rounded-xl overflow-hidden shadow-strong">
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3NjMzNzAwNzB8MA&ixlib=rb-4.1.0&q=85"
                  alt="Professional GxP Assessment"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-medium border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">Compliance Score</div>
                    <div className="text-2xl font-bold text-primary">94%</div>
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
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-space-grotesk font-bold text-foreground">
              Comprehensive Assessment Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to evaluate, track, and improve your GxP compliance posture across all critical business areas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover:shadow-medium transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-space-grotesk font-bold text-foreground">
              Built for Life Sciences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized assessment frameworks for every segment of the Life Sciences industry.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-6 py-3 text-sm bg-card hover:bg-primary-light hover:border-primary/30 transition-all cursor-pointer"
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-6 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-space-grotesk font-bold text-foreground">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-muted-foreground">
              See how leading Life Sciences companies are transforming their compliance programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-space-grotesk font-bold text-foreground">
            Ready to Transform Your Compliance Program?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of Life Sciences companies already using GxP Compass to drive regulatory excellence.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-primary hover:bg-primary-hover shadow-glow group">
              Start Your Assessment Today
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-space-grotesk font-bold text-foreground">GxP Compass</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 GxP Compass. Built for Life Sciences Excellence.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;