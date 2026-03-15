// Complete documentation content for Heloix — based on real Prowler docs structure
// Prowler → Heloix throughout

export const docsNav = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    children: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'products', title: 'Products Overview' },
      { id: 'prowler-cli', title: 'Heloix CLI' },
      { id: 'prowler-app', title: 'Heloix App' },
      { id: 'prowler-cloud', title: 'Heloix Cloud' },
      { id: 'prowler-hub', title: 'Heloix Hub' },
      { id: 'installation-pip', title: 'Installation (pip)' },
      { id: 'installation-docker', title: 'Installation (Docker)' },
      { id: 'installation-source', title: 'Installation (Source)' },
      { id: 'installation-app', title: 'Install Heloix App' },
    ],
  },
  {
    id: 'user-guide',
    title: 'User Guide',
    children: [
      { id: 'tutorials-app', title: 'Heloix App Tutorial' },
      { id: 'cli-basic', title: 'CLI Basic Usage' },
      { id: 'cli-output', title: 'Output Formats' },
      { id: 'cli-filtering', title: 'Filtering & Exclusions' },
      { id: 'cli-compliance', title: 'Compliance Scans' },
      { id: 'configuration-file', title: 'Configuration File' },
      { id: 'custom-checks', title: 'Custom Checks' },
      { id: 'integrations', title: 'Integrations' },
    ],
  },
  {
    id: 'providers',
    title: 'Providers',
    children: [
      { id: 'aws', title: 'AWS' },
      { id: 'azure', title: 'Azure' },
      { id: 'gcp', title: 'Google Cloud' },
      { id: 'kubernetes', title: 'Kubernetes' },
      { id: 'microsoft365', title: 'Microsoft 365' },
      { id: 'github-provider', title: 'GitHub' },
      { id: 'oracle-cloud', title: 'Oracle Cloud' },
      { id: 'alibaba-cloud', title: 'Alibaba Cloud' },
      { id: 'cloudflare-provider', title: 'Cloudflare' },
      { id: 'iac-provider', title: 'Infra as Code' },
      { id: 'mongodb-atlas', title: 'MongoDB Atlas' },
      { id: 'openstack-provider', title: 'OpenStack' },
      { id: 'llm-provider', title: 'LLM' },
      { id: 'image-provider', title: 'Container Images' },
      { id: 'google-workspace', title: 'Google Workspace' },
    ],
  },
  {
    id: 'developer-guide',
    title: 'Developer Guide',
    children: [
      { id: 'dev-introduction', title: 'Introduction' },
      { id: 'dev-architecture', title: 'Architecture' },
      { id: 'dev-new-check', title: 'Creating a New Check' },
      { id: 'dev-new-provider', title: 'Adding a Provider' },
      { id: 'dev-metadata', title: 'Check Metadata Guidelines' },
      { id: 'dev-testing', title: 'Testing' },
      { id: 'dev-contributing', title: 'Contributing' },
    ],
  },
  {
    id: 'reference',
    title: 'Reference',
    children: [
      { id: 'security', title: 'Security' },
      { id: 'support', title: 'Support' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
      { id: 'changelog', title: 'Changelog' },
      { id: 'roadmap', title: 'Public Roadmap' },
    ],
  },
];

export const docsContent = {
  introduction: {
    title: 'What is Heloix?',
    content: `**Heloix** is the world's most widely used open-source cloud security platform that **automates security and compliance** across any cloud environment. With hundreds of ready-to-use security checks, remediation guidance, and compliance frameworks, Heloix delivers AI-driven, customizable, and easy-to-use monitoring and integrations, making cloud security simple, scalable, and cost-effective for organizations of any size.

## Supported Providers

| Provider | Support | Audit Scope | Interface |
|---|---|---|---|
| AWS | Official | Accounts | UI, API, CLI |
| Azure | Official | Subscriptions | UI, API, CLI |
| Google Cloud | Official | Projects | UI, API, CLI |
| Kubernetes | Official | Clusters | UI, API, CLI |
| Microsoft 365 | Official | Tenants | UI, API, CLI |
| GitHub | Official | Organizations / Repos | UI, API, CLI |
| Oracle Cloud | Official | Tenancies | UI, API, CLI |
| Alibaba Cloud | Official | Accounts | UI, API, CLI |
| Cloudflare | Official | Accounts | UI, API, CLI |
| Infra as Code | Official | Repositories | UI, API, CLI |
| MongoDB Atlas | Official | Organizations | UI, API, CLI |
| OpenStack | Official | Projects | UI, API, CLI |
| LLM | Official | Models | CLI |
| Container Images | Official | Images | CLI, API |
| Google Workspace | Official | Domains | CLI |
| NHN Cloud | Unofficial | Tenants | CLI |

For more information about the checks and compliance of each provider, visit [Heloix Hub](/).`,
  },
  products: {
    title: 'Products Overview',
    content: `Heloix offers multiple products to fit different use cases:

### Heloix CLI
The command-line interface for running security assessments locally or in CI/CD pipelines.
\`\`\`bash
pip install heloix
heloix aws
\`\`\`

### Heloix App
A self-hosted web application with dashboard, team management, and scheduled scans.
\`\`\`bash
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/master/docker-compose.yml
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/master/.env
docker compose up -d
\`\`\`
Access at http://localhost:3000

### Heloix Cloud
A managed SaaS service built on top of Heloix App. No infrastructure to manage.

### Heloix Hub
A public library of versioned checks, cloud service artifacts, and compliance frameworks. Browse at [hub.heloix.devmonk.tech](/).`,
  },
  'prowler-cli': {
    title: 'Heloix CLI',
    content: `The Heloix CLI is a command-line tool for performing security assessments across cloud providers.

## Quick Start
\`\`\`bash
# Install
pip install heloix

# Verify installation
heloix -v

# Run your first scan
heloix aws
\`\`\`

## Key Features
- 1900+ security checks across 16 providers
- 80+ compliance frameworks (CIS, PCI DSS, HIPAA, SOC 2, etc.)
- Multiple output formats (JSON, CSV, HTML, OCSF)
- Configurable severity filters
- Custom check support
- CI/CD integration ready`,
  },
  'prowler-app': {
    title: 'Heloix App',
    content: `Heloix App is a self-hosted web application that provides a visual dashboard for managing and monitoring your cloud security posture.

## Installation
\`\`\`bash
# Download docker-compose and .env files
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/master/docker-compose.yml
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/master/.env

# Start the application
docker compose up -d
\`\`\`

## First Login
1. Open http://localhost:3000 in your browser
2. Sign up with your email and password
3. Add your first cloud provider
4. Run your first scan

## Features
- Interactive security dashboard
- Multi-provider management
- Scheduled scans
- Team collaboration
- Compliance tracking
- Finding management with status tracking
- Export reports in multiple formats`,
  },
  'prowler-cloud': {
    title: 'Heloix Cloud',
    content: `Heloix Cloud is the managed SaaS version of Heloix, providing all features of Heloix App without the need to manage your own infrastructure.

## Getting Started
1. Visit cloud.heloix.devmonk.tech
2. Sign up for a free account
3. Connect your cloud providers
4. Start scanning

## Key Benefits
- No infrastructure to manage
- Automatic updates
- Built-in high availability
- SOC 2 Type II certified
- Enterprise SSO support
- Dedicated support`,
  },
  'prowler-hub': {
    title: 'Heloix Hub',
    content: `Heloix Hub is the public library of all Heloix artifacts, including security checks, remediation guides, and compliance frameworks.

## What's in the Hub?
- **1924+ artifacts** across all supported providers
- **Detection & Remediation Checks** with severity ratings
- **Compliance Frameworks** (CIS, PCI DSS, HIPAA, SOC 2, ISO 27001, NIST, and more)
- **Remediation guides** with CLI, IaC, Terraform, and manual instructions

## Browse the Hub
- [Detection Checks](/check)
- [Compliance Frameworks](/compliance)
- [Hub API](/hub-api)`,
  },
  'installation-pip': {
    title: 'Installation via pip',
    content: `## Requirements
- Python >= 3.9, < 3.13
- pip

## Install
\`\`\`bash
pip install heloix
\`\`\`

## Verify
\`\`\`bash
heloix -v
\`\`\`

## Upgrade
\`\`\`bash
pip install --upgrade heloix
\`\`\`

## Install Specific Version
\`\`\`bash
pip install heloix==5.0.1
\`\`\`

## Virtual Environment (Recommended)
\`\`\`bash
python -m venv heloix-env
source heloix-env/bin/activate  # Linux/Mac
heloix-env\\Scripts\\activate     # Windows
pip install heloix
\`\`\``,
  },
  'installation-docker': {
    title: 'Installation via Docker',
    content: `## Pull the Image
\`\`\`bash
docker pull heloix/heloix:latest
\`\`\`

## Run a Scan
\`\`\`bash
# AWS scan with default credentials
docker run -ti --rm \\
  -v ~/.aws:/root/.aws \\
  heloix/heloix:latest aws

# Azure scan
docker run -ti --rm \\
  -e AZURE_CLIENT_ID=xxx \\
  -e AZURE_CLIENT_SECRET=xxx \\
  -e AZURE_TENANT_ID=xxx \\
  heloix/heloix:latest azure

# GCP scan
docker run -ti --rm \\
  -v /path/to/credentials.json:/credentials.json \\
  -e GOOGLE_APPLICATION_CREDENTIALS=/credentials.json \\
  heloix/heloix:latest gcp
\`\`\`

## Save Reports
\`\`\`bash
docker run -ti --rm \\
  -v ~/.aws:/root/.aws \\
  -v $(pwd)/output:/output \\
  heloix/heloix:latest aws -o /output
\`\`\`

## MCP Mode (Model Context Protocol)
\`\`\`bash
# STDIO mode
docker run --rm -i heloix/heloix-mcp

# HTTP mode
docker run --rm -p 8000:8000 heloix/heloix-mcp --transport http --host 0.0.0.0 --port 8000
\`\`\``,
  },
  'installation-source': {
    title: 'Installation from Source',
    content: `## Requirements
- Python >= 3.9, < 3.13
- Poetry
- Git

## Clone and Install
\`\`\`bash
git clone https://github.com/heloix-cloud/heloix
cd heloix
poetry install
poetry shell
heloix -v
\`\`\`

## Windows Users
\`\`\`bash
git config core.longpaths true
\`\`\`

## Development Setup
\`\`\`bash
git clone https://github.com/heloix-cloud/heloix
cd heloix
poetry install --with dev
poetry shell

# Run tests
pytest

# Run linting
ruff check .
\`\`\``,
  },
  'installation-app': {
    title: 'Install Heloix App',
    content: `## Requirements
- Docker
- Docker Compose

## Quick Start
\`\`\`bash
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/refs/heads/master/docker-compose.yml
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/refs/heads/master/.env
docker compose up -d
\`\`\`

Access at **http://localhost:3000**

## Services Started
- **heloix-ui** — Web interface (port 3000)
- **heloix-api** — REST API (port 8080)
- **heloix-worker** — Background scan worker
- **postgres** — Database
- **redis** — Cache and message broker
- **valkey** — Session store

## Environment Variables
Configure in \`.env\` file:
\`\`\`env
HELOIX_SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://heloix:heloix@postgres:5432/heloix
REDIS_URL=redis://redis:6379/0
\`\`\`

## First Login
1. Open http://localhost:3000
2. Click "Sign Up"
3. Enter your email and password
4. Verify your email (check Docker logs for verification link)
5. Log in and start adding providers`,
  },
  'tutorials-app': {
    title: 'Heloix App Tutorial',
    content: `## Adding Your First Provider

1. Log in to Heloix App
2. Click **"Add Provider"** in the sidebar
3. Select your cloud provider (AWS, Azure, GCP, etc.)
4. Enter your credentials:
   - **AWS**: Access Key ID and Secret Access Key, or IAM Role ARN
   - **Azure**: Tenant ID, Client ID, Client Secret
   - **GCP**: Service Account JSON key
5. Click **"Test Connection"** to verify
6. Click **"Save"**

## Running Your First Scan

1. Go to **Scans** in the sidebar
2. Click **"New Scan"**
3. Select the provider(s) to scan
4. Choose scan type:
   - **Full Scan** — All checks
   - **Compliance Scan** — Specific framework
   - **Service Scan** — Specific service
5. Click **"Start Scan"**

## Viewing Results

- **Dashboard** — Overview of security posture
- **Findings** — Detailed list of issues
- **Compliance** — Framework compliance status
- **Resources** — Affected resources

## Scheduling Scans

1. Go to **Settings > Schedules**
2. Click **"New Schedule"**
3. Select provider, frequency (daily, weekly, monthly)
4. Set notification preferences
5. Save`,
  },
  'cli-basic': {
    title: 'CLI Basic Usage',
    content: `## Running Scans
\`\`\`bash
# Full scan for a provider
heloix aws
heloix azure
heloix gcp
heloix kubernetes

# Show help
heloix -h
heloix aws -h

# Show version
heloix -v
\`\`\`

## Listing Available Resources
\`\`\`bash
# List all checks for a provider
heloix aws --list-checks
heloix azure --list-checks

# List all services
heloix aws --list-services

# List all compliance frameworks
heloix aws --list-compliance

# List all categories
heloix aws --list-categories
\`\`\`

## Running Specific Checks
\`\`\`bash
# Single check
heloix aws --checks s3_bucket_public_access_block_enabled

# Multiple checks
heloix aws --checks ec2_launch_template_imdsv2_required iam_root_hardware_mfa_enabled

# Wildcard matching
heloix aws --checks "ec2_*" "iam_*"
\`\`\`

## Running by Service
\`\`\`bash
heloix aws --service s3
heloix aws --service ec2 iam
\`\`\`

## Running by Severity
\`\`\`bash
heloix aws --severity critical
heloix aws --severity critical high
\`\`\``,
  },
  'cli-output': {
    title: 'Output Formats',
    content: `## Available Formats
\`\`\`bash
# JSON output
heloix aws -M json

# CSV output
heloix aws -M csv

# HTML report
heloix aws -M html

# Multiple formats
heloix aws -M json csv html

# OCSF (Open Cybersecurity Schema Framework)
heloix aws -M ocsf
\`\`\`

## Output Directory
\`\`\`bash
# Custom output directory
heloix aws -o ./my-reports

# Custom filename
heloix aws --output-filename my-scan-2025
\`\`\`

## Sending Results
\`\`\`bash
# Send to AWS S3
heloix aws -M json --send-results-to-s3 my-bucket

# Send to AWS Security Hub
heloix aws --send-results-to-security-hub
\`\`\``,
  },
  'cli-filtering': {
    title: 'Filtering & Exclusions',
    content: `## Excluding Checks
\`\`\`bash
# Exclude specific checks
heloix aws --excluded-checks iam_root_hardware_mfa_enabled

# Exclude by service
heloix aws --excluded-services s3 rds

# Exclude by severity
heloix aws --excluded-severity low informational
\`\`\`

## Region Filtering
\`\`\`bash
# Scan specific regions only
heloix aws --region us-east-1 eu-west-1

# Exclude regions
heloix aws --excluded-regions ap-southeast-1
\`\`\`

## Account/Subscription Filtering
\`\`\`bash
# AWS: Specific account
heloix aws --account-id 123456789012

# Azure: Specific subscription
heloix azure --subscription-id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# GCP: Specific project
heloix gcp --project-id my-project-id
\`\`\`

## Category Filtering
\`\`\`bash
heloix aws --category secrets
heloix aws --category encryption forensics-ready
\`\`\``,
  },
  'cli-compliance': {
    title: 'Compliance Scans',
    content: `## Running Compliance Scans
\`\`\`bash
# AWS compliance
heloix aws --compliance cis_4.0_aws
heloix aws --compliance soc2_aws
heloix aws --compliance hipaa_aws
heloix aws --compliance pci_4.0_aws
heloix aws --compliance iso27001_2022_aws
heloix aws --compliance nist_csf_2.0_aws

# Azure compliance
heloix azure --compliance cis_2.1_azure
heloix azure --compliance pci_4.0_azure

# GCP compliance
heloix gcp --compliance cis_3.0_gcp

# Kubernetes compliance
heloix kubernetes --compliance cis_1.10_kubernetes
\`\`\`

## Multiple Frameworks
\`\`\`bash
heloix aws --compliance cis_4.0_aws soc2_aws hipaa_aws
\`\`\`

## Compliance Output
Compliance results are included in the standard output and can be viewed in all output formats (JSON, CSV, HTML).`,
  },
  'configuration-file': {
    title: 'Configuration File',
    content: `Create a \`config.yaml\` file to customize Heloix behavior:

\`\`\`yaml
# config.yaml
log_level: INFO
log_file: heloix.log

# Output configuration
output_formats:
  - json
  - html
output_directory: ./results

# Compliance frameworks to run
compliance:
  - cis_4.0_aws
  - soc2_aws

# Provider-specific configuration
aws:
  # Skip specific regions
  excluded_regions:
    - ap-southeast-1
    - ap-northeast-1
  # Custom check thresholds
  ec2_securitygroup_allow_ingress_from_internet_to_any_port:
    allowed_ports:
      - 443
      - 80

azure:
  excluded_subscriptions:
    - xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

gcp:
  compute_instance_group_multiple_zones:
    mig_min_zones: 2

kubernetes:
  apiserver_audit_log_maxbackup: 10
  apiserver_audit_log_maxsize: 100
\`\`\`

## Usage
\`\`\`bash
heloix aws --config-file config.yaml
\`\`\``,
  },
  'custom-checks': {
    title: 'Custom Checks',
    content: `## Creating Custom Checks

You can extend Heloix with custom checks by creating Python modules that follow the check interface.

### Check Structure
\`\`\`
custom_checks/
  my_custom_check/
    my_custom_check.py
    my_custom_check.metadata.json
\`\`\`

### Check Code (my_custom_check.py)
\`\`\`python
from heloix.lib.check.models import Check, CheckResult
from heloix.providers.aws.aws_provider import AwsProvider

class my_custom_check(Check):
    def execute(self):
        findings = []
        for resource in self.provider.resources:
            result = CheckResult(
                status="PASS" if resource.compliant else "FAIL",
                resource_id=resource.id,
                resource_arn=resource.arn,
                region=resource.region,
            )
            findings.append(result)
        return findings
\`\`\`

### Metadata (my_custom_check.metadata.json)
\`\`\`json
{
  "Provider": "aws",
  "CheckID": "my_custom_check",
  "CheckTitle": "My Custom Security Check",
  "CheckType": ["Security"],
  "ServiceName": "ec2",
  "Severity": "high",
  "Description": "Checks for custom security requirement",
  "Risk": "Custom risk description",
  "Remediation": {
    "Recommendation": "Apply the recommended configuration"
  }
}
\`\`\`

### Running Custom Checks
\`\`\`bash
heloix aws --checks-folder ./custom_checks
\`\`\``,
  },
  integrations: {
    title: 'Integrations',
    content: `## AWS Integrations

### AWS Security Hub
\`\`\`bash
heloix aws --send-results-to-security-hub
\`\`\`

### AWS S3
\`\`\`bash
heloix aws -M json --send-results-to-s3 my-bucket
\`\`\`

## Notification Integrations

### Slack
Configure webhook URL in Heloix App Settings > Integrations > Slack.

### Microsoft Teams
Configure webhook URL in Heloix App Settings > Integrations > Teams.

### Email
Configure SMTP settings in Heloix App Settings > Integrations > Email.

## CI/CD Integrations

### GitHub Actions
\`\`\`yaml
- name: Run Heloix
  uses: heloix-cloud/heloix-action@v1
  with:
    provider: aws
    compliance: cis_4.0_aws
  env:
    AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
\`\`\`

### GitLab CI
\`\`\`yaml
heloix-scan:
  image: heloix/heloix:latest
  script:
    - heloix aws --compliance cis_4.0_aws -M json
  artifacts:
    paths:
      - output/
\`\`\``,
  },
  aws: {
    title: 'AWS Provider',
    content: `## Getting Started with AWS

### Prerequisites
- AWS CLI configured with valid credentials
- IAM user/role with read-only permissions

### Authentication Methods

**1. AWS CLI Credentials**
\`\`\`bash
aws configure
# Enter Access Key ID, Secret Access Key, Region
heloix aws
\`\`\`

**2. Environment Variables**
\`\`\`bash
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
export AWS_DEFAULT_REGION=us-east-1
heloix aws
\`\`\`

**3. IAM Role (EC2 Instance)**
\`\`\`bash
# Attach an IAM role with SecurityAudit policy to your EC2 instance
heloix aws
\`\`\`

**4. SSO Profile**
\`\`\`bash
aws sso login --profile my-sso-profile
heloix aws --profile my-sso-profile
\`\`\`

**5. AssumeRole**
\`\`\`bash
heloix aws --role arn:aws:iam::123456789012:role/HeloixAuditRole
\`\`\`

### Required IAM Permissions
Minimum policy: **SecurityAudit** managed policy + additional permissions:
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "account:Get*",
        "appstream:Describe*",
        "codeartifact:List*",
        "codebuild:BatchGet*",
        "ds:Describe*",
        "elasticfilesystem:DescribeAccessPoints",
        "glue:GetConnections",
        "glue:GetSecurityConfiguration*",
        "lambda:GetFunction*",
        "logs:FilterLogEvents",
        "ssm-incidents:List*",
        "ssm:GetDocument",
        "support:Describe*"
      ],
      "Resource": "*"
    }
  ]
}
\`\`\`

### Scanning
\`\`\`bash
# Full scan
heloix aws

# Specific region
heloix aws --region us-east-1

# Specific service
heloix aws --service s3 ec2 iam

# Compliance scan
heloix aws --compliance cis_4.0_aws
\`\`\``,
  },
  azure: {
    title: 'Azure Provider',
    content: `## Getting Started with Azure

### Prerequisites
- Azure CLI installed
- Service Principal with Reader role

### Authentication Methods

**1. Azure CLI**
\`\`\`bash
az login
heloix azure
\`\`\`

**2. Service Principal**
\`\`\`bash
# Create Service Principal
az ad sp create-for-rbac --name heloix-audit --role Reader --scopes /subscriptions/<sub-id>

# Set environment variables
export AZURE_CLIENT_ID=xxx
export AZURE_CLIENT_SECRET=xxx
export AZURE_TENANT_ID=xxx

heloix azure
\`\`\`

**3. Managed Identity**
\`\`\`bash
# On an Azure VM with managed identity
heloix azure --managed-identity
\`\`\`

### Required Roles
- **Reader** — For most checks
- **Security Reader** — For Security Center checks
- **Key Vault Reader** — For Key Vault checks

### Scanning
\`\`\`bash
# Full scan
heloix azure

# Specific subscription
heloix azure --subscription-id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Compliance
heloix azure --compliance cis_2.1_azure
\`\`\``,
  },
  gcp: {
    title: 'Google Cloud Provider',
    content: `## Getting Started with GCP

### Prerequisites
- GCP Project with billing enabled
- Service Account or Application Default Credentials

### Authentication Methods

**1. Application Default Credentials**
\`\`\`bash
gcloud auth application-default login
heloix gcp --project-id my-project
\`\`\`

**2. Service Account Key**
\`\`\`bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
heloix gcp --project-id my-project
\`\`\`

**3. Attached Service Account**
\`\`\`bash
# On a GCE instance with attached service account
heloix gcp --project-id my-project
\`\`\`

Credential resolution order: Environment Variable → gcloud CLI → Attached Service Account

### Required Roles
- **roles/viewer** — Basic read access
- **roles/iam.securityReviewer** — IAM security checks
- **roles/cloudasset.viewer** — Asset inventory

### Scanning
\`\`\`bash
heloix gcp --project-id my-project
heloix gcp --compliance cis_3.0_gcp
\`\`\``,
  },
  kubernetes: {
    title: 'Kubernetes Provider',
    content: `## Getting Started with Kubernetes

### Prerequisites
- kubectl configured with cluster access
- kubeconfig file

### Authentication
\`\`\`bash
# Using default kubeconfig
heloix kubernetes

# Custom kubeconfig
heloix kubernetes --kubeconfig-file /path/to/kubeconfig

# Specific context
heloix kubernetes --context my-cluster-context
\`\`\`

### Running as a Kubernetes Job
\`\`\`yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: heloix-scan
spec:
  template:
    spec:
      serviceAccountName: heloix-sa
      containers:
      - name: heloix
        image: heloix/heloix:latest
        command: ["heloix", "kubernetes"]
      restartPolicy: Never
\`\`\`

### CIS Benchmark
\`\`\`bash
heloix kubernetes --compliance cis_1.10_kubernetes
\`\`\``,
  },
  microsoft365: { title: 'Microsoft 365 Provider', content: '## Getting Started with Microsoft 365\n\n### Prerequisites\n- Azure AD tenant\n- Application registration with Microsoft Graph API permissions\n\n### Setup\n```bash\n# Register an application in Azure AD\n# Grant Microsoft Graph API permissions:\n# - Directory.Read.All\n# - SecurityEvents.Read.All\n# - Reports.Read.All\n\nexport M365_CLIENT_ID=xxx\nexport M365_CLIENT_SECRET=xxx\nexport M365_TENANT_ID=xxx\n\nheloix microsoft365\n```\n\n### Compliance\n```bash\nheloix microsoft365 --compliance cis_3.1_microsoft365\n```' },
  'github-provider': { title: 'GitHub Provider', content: '## Getting Started with GitHub\n\n### Prerequisites\n- GitHub Personal Access Token or GitHub App\n\n### Setup\n```bash\nexport GITHUB_TOKEN=ghp_xxxxxxxxxxxx\nheloix github --organization my-org\n```\n\n### Required Permissions\n- **repo** — Repository access\n- **read:org** — Organization read\n- **admin:org** — For organization settings checks\n\n### Scanning\n```bash\n# Scan organization\nheloix github --organization my-org\n\n# Specific repository\nheloix github --repository my-org/my-repo\n\n# Compliance\nheloix github --compliance cis_1.0_github\n```' },
  'oracle-cloud': { title: 'Oracle Cloud Provider', content: '## Getting Started with Oracle Cloud\n\n### Prerequisites\n- OCI CLI configured\n- API Key or Instance Principal\n\n### Setup\n```bash\n# Using OCI CLI config\nheloix oraclecloud\n\n# Using environment variables\nexport OCI_TENANCY=ocid1.tenancy.oc1..\nexport OCI_USER=ocid1.user.oc1..\nexport OCI_FINGERPRINT=xx:xx:xx\nexport OCI_KEY_FILE=/path/to/key.pem\nheloix oraclecloud\n```' },
  'alibaba-cloud': { title: 'Alibaba Cloud Provider', content: '## Getting Started with Alibaba Cloud\n\n### Setup\n```bash\nexport ALICLOUD_ACCESS_KEY_ID=xxx\nexport ALICLOUD_ACCESS_KEY_SECRET=xxx\nheloix alibabacloud\n```\n\n### Compliance\n```bash\nheloix alibabacloud --compliance cis_1.0_alibabacloud\n```' },
  'cloudflare-provider': { title: 'Cloudflare Provider', content: '## Getting Started with Cloudflare\n\n### Setup\n```bash\nexport CLOUDFLARE_API_TOKEN=xxx\nheloix cloudflare\n```\n\n### Required API Token Permissions\n- Zone:Read\n- DNS:Read\n- Firewall Services:Read\n- Zone Settings:Read' },
  'iac-provider': { title: 'Infrastructure as Code Provider', content: '## Getting Started with IaC Scanning\n\nScan Terraform, CloudFormation, and other IaC templates for security misconfigurations.\n\n### Setup\n```bash\n# Scan a directory\nheloix iac --directory ./terraform\n\n# Scan specific files\nheloix iac --file main.tf\n\n# Scan a repository\nheloix iac --repository https://github.com/org/repo\n```\n\n### Supported Formats\n- Terraform (.tf, .tfvars)\n- CloudFormation (YAML, JSON)\n- Bicep (.bicep)\n- ARM Templates\n- Kubernetes manifests' },
  'mongodb-atlas': { title: 'MongoDB Atlas Provider', content: '## Getting Started with MongoDB Atlas\n\n### Setup\n```bash\nexport MONGODB_ATLAS_PUBLIC_KEY=xxx\nexport MONGODB_ATLAS_PRIVATE_KEY=xxx\nexport MONGODB_ATLAS_ORG_ID=xxx\nheloix mongodbatlas\n```' },
  'openstack-provider': { title: 'OpenStack Provider', content: '## Getting Started with OpenStack\n\n### Setup\n```bash\n# Source your OpenStack RC file\nsource openrc.sh\nheloix openstack\n```\n\n### Required Permissions\n- reader role on the project\n- admin role for some security checks' },
  'llm-provider': { title: 'LLM Provider', content: '## Getting Started with LLM Security\n\nScan Large Language Model applications for security vulnerabilities.\n\n### Setup\n```bash\nheloix llm --endpoint https://api.example.com/v1/chat\n```\n\n### Check Categories\n- Prompt Injection\n- PII Exposure\n- Output Encoding\n- Rate Limiting\n- Authentication\n- Data Leakage' },
  'image-provider': { title: 'Container Image Provider', content: '## Getting Started with Image Scanning\n\nScan container images for vulnerabilities and misconfigurations.\n\n### Setup\n```bash\n# Scan a local image\nheloix image --image myapp:latest\n\n# Scan from registry\nheloix image --image registry.example.com/myapp:latest\n```' },
  'google-workspace': { title: 'Google Workspace Provider', content: '## Getting Started with Google Workspace\n\n### Setup\n```bash\nexport GOOGLE_WORKSPACE_CUSTOMER_ID=xxx\nexport GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa-key.json\nheloix googleworkspace\n```\n\n### Required API Scopes\n- Admin SDK API\n- Directory API\n- Reports API' },
  'dev-introduction': { title: 'Developer Guide Introduction', content: '## Contributing to Heloix\n\nHeloix is an open-source project and we welcome contributions! Here\'s how to get started:\n\n### Development Setup\n```bash\ngit clone https://github.com/heloix-cloud/heloix\ncd heloix\npoetry install --with dev\npoetry shell\n```\n\n### Project Structure\n```\nheloix/\n  lib/           # Core library\n  providers/     # Provider implementations\n    aws/\n    azure/\n    gcp/\n    ...\n  compliance/    # Compliance framework definitions\n  config/        # Configuration\n  tests/         # Test suite\n```\n\n### Code Style\n- Python 3.9+\n- Ruff for linting\n- Black for formatting\n- Type hints required' },
  'dev-architecture': { title: 'Architecture', content: '## Heloix Architecture\n\n### Core Components\n\n1. **Provider** — Connects to cloud APIs and collects resource data\n2. **Check** — Evaluates resources against security rules\n3. **Finding** — Result of a check evaluation (PASS/FAIL)\n4. **Compliance** — Maps checks to compliance framework requirements\n5. **Output** — Formats and exports findings\n\n### Execution Flow\n```\n1. Initialize Provider (authenticate, discover resources)\n2. Load Checks (built-in + custom)\n3. Execute Checks (parallel per service)\n4. Generate Findings\n5. Map to Compliance Frameworks\n6. Output Results\n```' },
  'dev-new-check': { title: 'Creating a New Check', content: '## Creating a New Check\n\n### Step 1: Create Check Directory\n```bash\nmkdir -p heloix/providers/aws/services/s3/my_new_check\n```\n\n### Step 2: Create Check Code\nCreate `my_new_check.py`:\n```python\nfrom heloix.lib.check.models import Check, CheckResult\n\nclass my_new_check(Check):\n    def execute(self):\n        findings = []\n        for bucket in self.provider.s3_client.list_buckets():\n            # Your check logic here\n            status = "PASS" if compliant else "FAIL"\n            findings.append(CheckResult(\n                status=status,\n                resource_id=bucket["Name"],\n            ))\n        return findings\n```\n\n### Step 3: Create Metadata\nCreate `my_new_check.metadata.json`\n\n### Step 4: Write Tests\nCreate `my_new_check_test.py`\n\n### Step 5: Submit PR' },
  'dev-new-provider': { title: 'Adding a New Provider', content: '## Adding a New Provider\n\n### Step 1: Create Provider Structure\n```bash\nmkdir -p heloix/providers/myprovider/services\n```\n\n### Step 2: Implement Provider Class\n```python\nfrom heloix.lib.provider.models import Provider\n\nclass MyProvider(Provider):\n    def setup(self):\n        self.authenticate()\n        self.discover_resources()\n```\n\n### Step 3: Add Services and Checks\nCreate service directories with check implementations.\n\n### Step 4: Add Compliance Mappings\nCreate compliance JSON files mapping your checks to frameworks.' },
  'dev-metadata': { title: 'Check Metadata Guidelines', content: '## Check Metadata Guidelines\n\n### Required Fields\n```json\n{\n  "Provider": "aws",\n  "CheckID": "check_id_here",\n  "CheckTitle": "Human readable title",\n  "CheckType": ["Security"],\n  "ServiceName": "s3",\n  "SubServiceName": "",\n  "ResourceIdTemplate": "arn:aws:s3:::bucket_name",\n  "Severity": "high",\n  "ResourceType": "AwsS3Bucket",\n  "Description": "What this check does",\n  "Risk": "What happens if this fails",\n  "RelatedUrl": "https://docs.aws.amazon.com/...",\n  "Remediation": {\n    "Code": {\n      "CLI": "aws s3api ...",\n      "NativeIaC": "CloudFormation template",\n      "Terraform": "Terraform resource",\n      "Other": "Console steps"\n    },\n    "Recommendation": "What to do"\n  },\n  "Categories": ["encryption"],\n  "DependsOn": [],\n  "RelatedTo": [],\n  "Notes": ""\n}\n```\n\n### Severity Levels\n- **critical** — Immediate risk, active exploitation possible\n- **high** — Significant risk, should remediate soon\n- **medium** — Moderate risk\n- **low** — Best practice improvement\n- **informational** — Awareness only' },
  'dev-testing': { title: 'Testing', content: '## Testing Heloix\n\n### Running Tests\n```bash\n# All tests\npytest\n\n# Specific provider\npytest tests/providers/aws/\n\n# Specific check\npytest tests/providers/aws/services/s3/test_s3_bucket_public_access.py\n\n# With coverage\npytest --cov=heloix --cov-report=html\n```\n\n### Writing Tests\n```python\nfrom unittest.mock import MagicMock\nfrom heloix.providers.aws.services.s3.my_check.my_check import my_check\n\ndef test_my_check_pass():\n    provider = MagicMock()\n    # Setup mock resources\n    check = my_check(provider)\n    results = check.execute()\n    assert results[0].status == "PASS"\n```' },
  'dev-contributing': { title: 'Contributing', content: '## Contributing to Heloix\n\n### How to Contribute\n1. Fork the repository\n2. Create a feature branch\n3. Make your changes\n4. Write/update tests\n5. Run linting: `ruff check .`\n6. Run tests: `pytest`\n7. Submit a Pull Request\n\n### Contribution Areas\n- New security checks\n- New cloud providers\n- Compliance framework mappings\n- Bug fixes\n- Documentation improvements\n- Performance optimizations\n\n### Code of Conduct\nWe follow the Contributor Covenant Code of Conduct. Be respectful, inclusive, and collaborative.' },
  security: { title: 'Security', content: '## Security\n\n### Reporting Vulnerabilities\nIf you find a security vulnerability in Heloix, please report it responsibly:\n- Email: security@heloix.devmonk.tech\n- Do NOT create a public issue\n\n### Security Practices\n- All code changes require review\n- Dependencies are regularly audited\n- Container images are scanned\n- SOC 2 Type II certified (Heloix Cloud)\n\n### Data Handling\n- Heloix CLI processes data locally\n- No data is sent to external servers\n- Heloix App/Cloud stores data in your infrastructure\n- All data encrypted at rest and in transit' },
  support: { title: 'Support', content: '## Support\n\n### Community Support\n- **GitHub Issues**: https://github.com/heloix-cloud/heloix/issues\n- **Slack**: Join our community Slack\n- **Stack Overflow**: Tag: heloix\n\n### Enterprise Support\n- Dedicated support engineers\n- SLA-backed response times\n- Custom integrations\n- Training and onboarding\n\nContact: support@heloix.devmonk.tech' },
  troubleshooting: { title: 'Troubleshooting', content: '## Troubleshooting\n\n### Common Issues\n\n**Authentication Errors**\n```bash\n# AWS: Check credentials\naws sts get-caller-identity\n\n# Azure: Re-authenticate\naz login\n\n# GCP: Check credentials\ngcloud auth application-default print-access-token\n```\n\n**Permission Errors**\nEnsure your IAM user/role has the required permissions listed in the provider setup guide.\n\n**Timeout Errors**\n```bash\n# Increase timeout\nheloix aws --timeout 600\n\n# Scan specific region only\nheloix aws --region us-east-1\n```\n\n**Memory Issues**\n```bash\n# Reduce parallelism\nheloix aws --parallel 2\n```\n\n### Debug Mode\n```bash\nheloix aws --log-level DEBUG\n```\n\n### Log Files\nCheck `~/.heloix/logs/` for detailed logs.' },
  changelog: { title: 'Changelog', content: '## Changelog\n\nFor the latest releases and changes, visit:\n- [GitHub Releases](https://github.com/heloix-cloud/heloix/releases)\n\n### Recent Highlights\n- **v5.x** — Multi-provider support, Heloix App, MCP integration\n- **v4.x** — Azure, GCP, Kubernetes support\n- **v3.x** — Compliance framework support\n- **v2.x** — AWS security checks expansion' },
  roadmap: { title: 'Public Roadmap', content: '## Public Roadmap\n\nVisit our public roadmap to see what\'s coming:\n- [Heloix Roadmap](https://roadmap.heloix.devmonk.tech)\n\n### Upcoming Features\n- Additional cloud providers\n- Enhanced AI-driven remediation\n- Policy-as-Code framework\n- Advanced reporting and analytics\n- Expanded compliance coverage' },
};
