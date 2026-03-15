import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Shield, Globe, Zap, Users, Lock, ArrowRight } from 'lucide-react';

const features = [
  { icon: BarChart3, title:'Security Dashboard', desc:'Real-time visibility into your cloud security posture across all providers with interactive dashboards and trend analysis.' },
  { icon: Shield, title:'Continuous Compliance', desc:'Automatically track compliance against 80+ frameworks including CIS, PCI DSS, HIPAA, SOC 2, ISO 27001, and NIST.' },
  { icon: Globe, title:'Multi-Cloud Support', desc:'Single pane of glass for AWS, Azure, GCP, Kubernetes, and 10+ additional providers.' },
  { icon: Zap, title:'Automated Remediation', desc:'One-click remediation workflows with Terraform, CloudFormation, and CLI commands.' },
  { icon: Users, title:'Team Collaboration', desc:'Role-based access control, shared dashboards, and automated reporting for your entire security team.' },
  { icon: Lock, title:'Enterprise Security', desc:'SOC 2 Type II certified. Data encrypted at rest and in transit. SSO and SCIM support.' },
];

const plans = [
  { name:'Community', price:'Free', desc:'Open source CLI for individual use', features:['All detection checks','CLI output formats','Community support','Self-hosted'] },
  { name:'Team', price:'$99/mo', desc:'For teams securing cloud infrastructure', features:['Everything in Community','Web dashboard','Team collaboration','Scheduled scans','Slack/Teams alerts','Email support'], highlighted:true },
  { name:'Enterprise', price:'Custom', desc:'For organizations with advanced needs', features:['Everything in Team','SSO/SCIM','Custom compliance','API access','Dedicated support','SLA guarantee'] },
];

const StudioPage = () => (
  <div className="min-h-screen">
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /> Back to Hub</Link>

      {/* Hero */}
      <section className="text-center py-16">
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 to-transparent rounded-3xl" />
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">Heloix Studio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">The complete cloud security platform. Scan, monitor, and remediate security issues across your entire cloud infrastructure.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="px-6 py-3 rounded-xl text-sm font-medium bg-foreground text-background hover:opacity-90 transition-all inline-flex items-center gap-2">Start Free Trial <ArrowRight size={14} /></a>
            <a href="#" className="px-6 py-3 rounded-xl text-sm font-medium border-2 border-border text-foreground hover:bg-secondary transition-all">Watch Demo</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-2xl font-bold font-display text-foreground text-center mb-10">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="rounded-xl p-6 bg-card border border-border card-hover">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4"><f.icon size={20} className="text-foreground" /></div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12">
        <h2 className="text-2xl font-bold font-display text-foreground text-center mb-10">Plans & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <div key={i} className={`rounded-xl p-6 border card-hover ${p.highlighted ? 'bg-card border-[hsl(30,60%,32%)] shadow-lg' : 'bg-card border-border'}`}>
              <h3 className="text-lg font-bold text-foreground mb-1">{p.name}</h3>
              <div className="text-2xl font-bold text-[hsl(30,60%,32%)] mb-2">{p.price}</div>
              <p className="text-xs text-muted-foreground mb-4">{p.desc}</p>
              <ul className="space-y-2 mb-6">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-foreground">
                    <div className="w-4 h-4 rounded-full bg-[hsl(30,60%,32%)]/10 flex items-center justify-center"><span className="text-[7px] font-bold text-[hsl(30,60%,32%)]">\u2713</span></div>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-all ${p.highlighted ? 'bg-foreground text-background hover:opacity-90' : 'bg-secondary text-foreground hover:bg-border'}`}>
                {p.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <div className="rounded-2xl p-10 bg-secondary/50 border border-border">
          <h2 className="text-2xl font-bold font-display text-foreground mb-3">Ready to Secure Your Cloud?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of teams using Heloix to keep their cloud infrastructure safe.</p>
          <a href="#" className="px-8 py-3 rounded-xl text-sm font-medium bg-foreground text-background hover:opacity-90 transition-all inline-flex items-center gap-2">Start Free Trial <ArrowRight size={14} /></a>
        </div>
      </section>
    </div>
  </div>
);

export default StudioPage;
