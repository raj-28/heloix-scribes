import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Book, Terminal, Settings, Cloud, Download, Shield, ChevronRight, Search } from 'lucide-react';

const sections = [
  { id:'getting-started', icon: Book, title:'Getting Started', items:[
    { title:'What is Heloix?', content:'Heloix is the open source cloud security platform for AWS, Azure, GCP, Kubernetes, and many more. It performs security assessments, audits, compliance checks, and hardening across cloud environments.' },
    { title:'Installation', content:'Install Heloix using pip:\n\npip install heloix\n\nOr use Docker:\n\ndocker pull heloix/heloix:latest\ndocker run -ti --rm heloix/heloix:latest' },
    { title:'Quick Start', content:'Run your first scan:\n\nheloix aws\n\nThis will scan your AWS account using the default credentials and run all available checks.' },
  ]},
  { id:'configuration', icon: Settings, title:'Configuration', items:[
    { title:'AWS Configuration', content:'Heloix uses the AWS SDK credentials chain. Configure credentials using:\n\n- Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)\n- AWS credentials file (~/.aws/credentials)\n- IAM roles for EC2 instances\n- AWS SSO profiles' },
    { title:'Azure Configuration', content:'For Azure, Heloix supports:\n\n- Azure CLI authentication (az login)\n- Service Principal with client secret\n- Managed Identity\n- Environment variables (AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID)' },
    { title:'GCP Configuration', content:'For GCP, configure authentication using:\n\n- Application Default Credentials (gcloud auth application-default login)\n- Service account key file (GOOGLE_APPLICATION_CREDENTIALS)\n- Workload Identity' },
    { title:'Custom Configuration File', content:'Create a heloix.yaml configuration file:\n\nlog_level: INFO\noutput_formats:\n  - json\n  - html\ncompliance:\n  - cis_4.0_aws\n  - soc2_aws' },
  ]},
  { id:'cli', icon: Terminal, title:'CLI Reference', items:[
    { title:'Basic Commands', content:'heloix <provider>                    # Run all checks\nheloix <provider> --checks <check_id> # Run specific check\nheloix <provider> --compliance <id>   # Run compliance framework\nheloix <provider> --service <svc>     # Run checks for a service\nheloix <provider> --severity critical # Filter by severity' },
    { title:'Output Formats', content:'heloix aws --output-formats json csv html\nheloix aws --output-directory ./results\nheloix aws --output-filename my-scan' },
    { title:'Filtering', content:'heloix aws --checks ec2_* iam_*       # Wildcard matching\nheloix aws --excluded-checks iam_*    # Exclude checks\nheloix aws --region us-east-1 eu-west-1 # Specific regions\nheloix aws --account-id 123456789012   # Specific account' },
  ]},
  { id:'providers', icon: Cloud, title:'Supported Providers', items:[
    { title:'Cloud Providers', content:'• AWS (Amazon Web Services) — 500+ checks\n• Azure (Microsoft Azure) — 200+ checks\n• GCP (Google Cloud Platform) — 150+ checks\n• Alibaba Cloud — 35+ checks\n• Oracle Cloud — 48+ checks\n• NHN Cloud — 28+ checks\n• OpenStack — 38+ checks' },
    { title:'SaaS & Platform', content:'• Kubernetes — 82+ checks\n• GitHub — 28+ checks\n• Cloudflare — 24+ checks\n• Google Workspace — 42+ checks\n• Microsoft 365 — 52+ checks\n• MongoDB Atlas — 32+ checks' },
    { title:'AI & IaC', content:'• LLM (Large Language Models) — 42+ checks\n• Infrastructure as Code — 112+ checks (Terraform, CloudFormation, Bicep)' },
  ]},
  { id:'compliance', icon: Shield, title:'Compliance', items:[
    { title:'Running Compliance Scans', content:'heloix aws --compliance cis_4.0_aws\nheloix azure --compliance cis_2.1_azure\nheloix gcp --compliance cis_3.0_gcp\nheloix kubernetes --compliance cis_1.10_kubernetes' },
    { title:'Supported Frameworks', content:'• CIS Benchmarks (AWS, Azure, GCP, Kubernetes, GitHub, M365)\n• PCI DSS v3.2.1 & v4.0\n• HIPAA\n• GDPR\n• SOC 2\n• ISO 27001 (2013 & 2022)\n• NIST 800-53, 800-171, CSF 1.1 & 2.0\n• FedRAMP Low & Moderate\n• MITRE ATT&CK\n• And many more...' },
    { title:'Custom Compliance', content:'You can create custom compliance frameworks by defining a JSON file with requirements mapped to Heloix check IDs. See the GitHub repository for examples.' },
  ]},
];

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeItem, setActiveItem] = useState(0);
  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /> Back to Hub</Link>

        <h1 className="text-3xl font-bold font-display text-foreground mb-2">Heloix Documentation</h1>
        <p className="text-muted-foreground mb-8">Everything you need to get started with Heloix cloud security scanning.</p>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-56 shrink-0">
            <div className="space-y-0.5">
              {sections.map(sec => (
                <button key={sec.id} onClick={() => { setActiveSection(sec.id); setActiveItem(0); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${activeSection === sec.id ? 'bg-card border border-border shadow-sm text-foreground' : 'text-muted-foreground hover:bg-secondary border border-transparent'}`}>
                  <sec.icon size={14} />{sec.title}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {currentSection && (
              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-4 flex items-center gap-2">
                  <currentSection.icon size={18} />{currentSection.title}
                </h2>
                {/* Sub-items tabs */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  {currentSection.items.map((item, i) => (
                    <button key={i} onClick={() => setActiveItem(i)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${activeItem === i ? 'bg-[hsl(30,60%,32%)] text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                      {item.title}
                    </button>
                  ))}
                </div>
                {/* Content */}
                <div className="rounded-xl p-6 bg-card border border-border">
                  <h3 className="text-base font-semibold text-foreground mb-4">{currentSection.items[activeItem]?.title}</h3>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground font-mono">
                    {currentSection.items[activeItem]?.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
