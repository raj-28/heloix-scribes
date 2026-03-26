// Heloix Docs — Providers Section

const providers = {

  aws: {
    title: 'AWS Provider',
    content: `Heloix provides the most comprehensive AWS security coverage available, with 1500+ checks across 80+ AWS services.

## Authentication Methods

### Option 1: IAM User / Environment Variables

\`\`\`bash
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
export AWS_SESSION_TOKEN=...  # if using temporary credentials
heloix aws
\`\`\`

### Option 2: Named Profile

\`\`\`bash
heloix aws --profile my-profile
\`\`\`

### Option 3: IAM Role Assumption

\`\`\`bash
# Assume a role before scanning
heloix aws --role arn:aws:iam::123456789012:role/HeloixRole

# With external ID
heloix aws --role arn:aws:iam::123456789012:role/HeloixRole --external-id MyExternalId
\`\`\`

### Option 4: AWS IAM Identity Center (SSO)

\`\`\`bash
aws sso login --profile my-sso-profile
heloix aws --profile my-sso-profile
\`\`\`

## Required Permissions

Attach the AWS managed policy **SecurityAudit** plus **ReadOnlyAccess** to your IAM user or role:

\`\`\`bash
aws iam attach-user-policy \\
  --user-name heloix-scanner \\
  --policy-arn arn:aws:iam::aws:policy/SecurityAudit

aws iam attach-user-policy \\
  --user-name heloix-scanner \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess
\`\`\`

## Multi-Account Scanning

\`\`\`bash
# Scan multiple accounts via role assumption
heloix aws --role arn:aws:iam::111111111111:role/HeloixRole arn:aws:iam::222222222222:role/HeloixRole

# Scan all accounts in an AWS Organization
heloix aws --aws-organizations-role arn:aws:iam::MANAAÅMENT_ACCOUNT:role/OrgRole
\`\`\`

## Supported Services (Sample)

AccessAnalyzer, ACM, AppStream, Athena, Backup, CloudFormation, CloudFront, CloudTrail, CloudWatch, CodeArtifact, CodeBuild, Cognito, Config, DAX, DMS, DynamoDB, EC2, ECR, ECS, EFS, EKS, ElastiCache, Elasticsearch, ELB, EMR, EventBridge, FSx, Glacier, Glue, GuardDuty, IAM, Inspector, Kinesis, KMS, Lambda, Lightsail, Macie, MSK, Neptune, OpenSearch, RDS, Redshift, Route53, S3, SageMaker, SecretsManager, SecurityHub, SES, Shield, SNS, SQS, SSM, STS, Transfer, VPC, WAF, WorkSpaces, and more.`,
  },

  azure: {
    title: 'Azure Provider',
    content: `Heloix supports Azure across Subscriptions, covering 300+ security checks for compute, storage, networking, identity, and more.

## Authentication

### Option 1: Azure CLI (Recommended for Local Use)

\`\`\`bash
az login
heloix azure
\`\`\`

### Option 2: Service Principal with Client Secret

\`\`\`bash
export AZURE_CLIENT_ID=your-client-id
export AZURE_CLIENT_SECRET=your-client-secret
export AZURE_TENANT_ID=your-tenant-id
heloix azure
\`\`\`

### Option 3: Service Principal with Certificate

\`\`\`bash
export AZURE_CLIENT_ID=your-client-id
export AZURE_CLIENT_CERTIFICATE_PATH=/path/to/cert.pem
export AZURE_TENANT_ID=your-tenant-id
heloix azure
\`\`\`

### Option 4: Managed Identity (for Azure VMs/containers)

\`\`\`bash
heloix azure --azure-managed-identity-auth
\`\`\`

## Required Permissions

Assign the **Reader** role plus **Security Reader** at the Subscription scope:

\`\`\`bash
az role assignment create \\
  --assignee your-service-principal-id \\
  --role "Reader" \\
  --scope /subscriptions/YOUR_SUBSCRIPTION_ID

az role assignment create \\
  --assignee your-service-principal-id \\
  --role "Security Reader" \\
  --scope /subscriptions/YOUR_SUBSCRIPTION_ID
\`\`\`

## Specify Subscriptions

\`\`\`bash
# Scan specific subscriptions
heloix azure --subscription-ids sub1-id sub2-id

# Scan all accessible subscriptions
heloix azure
\`\`\`

## Supported Services

App Service, Cognitive Services, Cosmos DB, Defender, Entra ID (AAD), Key Vault, Kubernetes (AKS), MariaDB, Monitor, MySQL, Network, PostgreSQL, Recovery Services, SQL, Storage, Subscriptions, VM, and more.`,
  },

  gcp: {
    title: 'Google Cloud Provider',
    content: `Heloix scans GCP projects with 250+ security checks covering Compute, IAM, Storage, Network, and more.

## Authentication

### Option 1: gcloud CLI (Recommended for Local Use)

\`\`\`bash
gcloud auth application-default login
heloix gcp --project-id my-project
\`\`\`

### Option 2: Service Account Key File

\`\`\`bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
heloix gcp --project-id my-project
\`\`\`

### Option 3: Workload Identity (Recommended for CI/CD)

\`\`\`bash
heloix gcp --project-id my-project
# Uses ambient credentials from the environment
\`\`\`

## Required Roles

Assign these roles at the project level:
- \`roles/viewer\`
- \`roles/iam.securityReviewer\`

\`\`\`bash
gcloud projects add-iam-policy-binding my-project \\
  --member="serviceAccount:heloix@my-project.iam.gserviceaccount.com" \\
  --role="roles/viewer"

gcloud projects add-iam-policy-binding my-project \\
  --member="serviceAccount:heloix@my-project.iam.gserviceaccount.com" \\
  --role="roles/iam.securityReviewer"
\`\`\`

## Multiple Projects / Folders

\`\`\`bash
# Scan multiple projects
heloix gcp --project-id proj1 proj2 proj3

# Scan an entire folder
heloix gcp --folder-id 123456789

# Scan entire organization
heloix gcp --organization-id 987654321
\`\`\``,
  },

  kubernetes: {
    title: 'Kubernetes Provider',
    content: `Heloix scans Kubernetes clusters with 100+ checks covering Pod Security Standards, RBAC, Secrets management, Network Policies, and more.

## Authentication

Heloix uses the current kubeconfig context:

\`\`\`bash
# Set your current context
kubectl config use-context my-cluster

# Run Heloix
heloix kubernetes
\`\`\`

## Specify Context or Kubeconfig

\`\`\`bash
# Specific context
heloix kubernetes --context my-cluster-context

# Custom kubeconfig file
heloix kubernetes --kubeconfig /path/to/kubeconfig
\`\`\`

## Required Permissions

Heloix needs read-only access to cluster resources. Apply the included ClusterRole:

\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: heloix-reader
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: heloix-reader-binding
subjects:
  - kind: ServiceAccount
    name: heloix
    namespace: default
roleRef:
  kind: ClusterRole
  name: heloix-reader
  apiGroup: rbac.authorization.k8s.io
\`\`\`

## Supported Check Categories

- Pod Security Standards (Restricted / Baseline)
- RBAC analysis (overprivileged accounts, wildcard permissions)
- Network Policy coverage
- Secrets handling (env vars, volume mounts)
- Container image security (root user, readOnlyRootFilesystem)
- Resource limits and requests
- Admission controller configuration`,
  },

  microsoft365: {
    title: 'Microsoft 365 Provider',
    content: `Heloix checks Microsoft 365 tenant security including Exchange Online, SharePoint, Teams, and Entra ID settings.

## Authentication

### Service Principal (Required)

\`\`\`bash
export AZURE_CLIENT_ID=your-client-id
export AZURE_CLIENT_SECRET=your-client-secret
export AZURE_TENANT_ID=your-tenant-id
heloix m365
\`\`\`

The service principal requires these Microsoft Graph API permissions (Application type):
- \`AuditLog.Read.All\`
- \`Directory.Read.All\`
- \`Policy.Read.All\`
- \`Reports.Read.All\`
- \`SharePointTenantSettings.Read.All\`
- \`User.Read.All\`

## Run a Scan

\`\`\`bash
heloix m365 --tenant-id your-tenant-id
\`\`\`

## Supported Services

- Entra ID (conditional access, MFA, legacy auth)
- Exchange Online (mail transport rules, DKIM, DMARC, SPF)
- SharePoint Online (external sharing policies)
- Microsoft Teams (meeting settings, external access)
- Defender for M365`,
  },

  'github-provider': {
    title: 'GitHub Provider',
    content: `Heloix checks GitHub organization and repository security settings, including Actions, branch protection, secret scanning, and code security.

## Authentication

\`\`\`bash
# Personal Access Token or Fine-Grained PAT
export GITHUB_TOKEN=ghp_your_token_here
heloix github --github-org my-organization
\`\`\`

## Required Token Scopes

For organization-level scanning:
- \`admin:org\` — Read organization settings
- \`repo\` — Read repository settings
- \`read:packages\` — Read package settings

## Run a Scan

\`\`\`bash
# Scan an organization
heloix github --github-org my-org

# Scan specific repositories
heloix github --github-org my-org --github-repositories repo1 repo2
\`\`\`

## Supported Checks

- Branch protection rules (require PR reviews, status checks, signed commits)
- Actions permissions (allowed actions, workflow permissions)
- Secret scanning and push protection status
- Dependabot configuration
- Code scanning (CodeQL) setup
- Organization security settings (SSO, 2FA requirement, forking policy)
- Repository visibility and outside collaborators`,
  },

  'oracle-cloud': {
    title: 'Oracle Cloud Provider',
    content: `Heloix supports Oracle Cloud Infrastructure (OCI) with checks across Tenancies and Compartments.

## Authentication

Heloix uses the OCI CLI config file (\`~/.oci/config\`):

\`\`\`ini
[DEFAULT]
user=ocid1.user.oc1..aaa...
fingerprint=xx:xx:xx:xx
key_file=~/.oci/oci_api_key.pem
tenancy=ocid1.tenancy.oc1..aaa...
region=us-ashburn-1
\`\`\`

\`\`\`bash
heloix oci
\`\`\`

## Required Policies

\`\`\`
Allow group HeloixAuditors to inspect all-resources in tenancy
Allow group HeloixAuditors to read all-resources in tenancy
\`\`\`

## Supported Services

Audit, Block Volume, Compute, Container Engine (OKE), Database, Events, File Storage, IAM, Load Balancer, Logging, Network (VCN), Object Storage, Search, Security Zones, WAF.`,
  },

  'alibaba-cloud': {
    title: 'Alibaba Cloud Provider',
    content: `Heloix supports Alibaba Cloud with checks covering ECS, OSS, RDS, VPC, RAM, and more.

## Authentication

\`\`\`bash
export ALICLOUD_ACCESS_KEY=your-access-key
export ALICLOUD_SECRET_KEY=your-secret-key
export ALICLOUD_REGION=cn-hangzhou
heloix alibaba
\`\`\`

Or use an Alibaba Cloud credentials profile:

\`\`\`bash
heloix alibaba --aliyun-profile my-profile
\`\`\`

## Required RAM Permissions

Attach the \`ReadOnlyAccess\` system policy to your RAM user:
- \`AliyunReadOnlyAccess\`

## Supported Services

ActionTrail, ECS, IAM/RAM, OSS (Object Storage), RDS, Redis, RocketMQ, SLB (Load Balancer), VPC.`,
  },

  'cloudflare-provider': {
    title: 'Cloudflare Provider',
    content: `Heloix checks Cloudflare account security settings including DNS, WAF, SSL/TLS, and Access policies.

## Authentication

\`\`\`bash
export CLOUDFLARE_API_TOKEN=your-api-token
heloix cloudflare
\`\`\`

Or use API Key + Email:

\`\`\`bash
export CLOUDFLARE_API_KEY=your-api-key
export CLOUDFLARE_API_EMAIL=your@email.com
heloix cloudflare
\`\`\`

## Required Token Permissions

Create a Cloudflare API Token with:
- **Account: Read** — All accounts
- **Zone: Read** — All zones
- **Firewall Services: Read**

## Supported Services

DNS security settings, WAF rules, SSL/TLS mode, DNSSEC status, Cloudflare Access, Email Routing, Workers, Logpush configuration.`,
  },

  'iac-provider': {
    title: 'Infra as Code Provider',
    content: `Heloix scans Terraform, CloudFormation, and other IaC files for security misconfigurations before deployment.

## Scan a Directory

\`\`\`bash
# Scan Terraform files
heloix iac --iac-type terraform --iac-directory ./infra

# Scan CloudFormation templates
heloix iac --iac-type cloudformation --iac-directory ./cfn

# Scan with recursive directory search
heloix iac --iac-type terraform --iac-directory . --recursive
\`\`\`

## Supported Frameworks

| Framework | File Extensions |
|---|---|
| Terraform | \`.tf\`, \`.tfvars\` |
| CloudFormation | \`.yaml\`, \`.yml\`, \`.json\` |
| Bicep | \`.bicep\` |
| Helm | Chart directories |
| Kubernetes | \`.yaml\`, \`.yml\` |
| Dockerfile | \`Dockerfile\*\` |

## CI/CD Integration

\`\`\`yaml
# GitHub Actions
- name: Heloix IaC Scan
  run: |
    pip install heloix
    heloix iac --iac-type terraform --iac-directory ./infra -M json
\`\`\``,
  },

  'mongodb-atlas': {
    title: 'MongoDB Atlas Provider',
    content: `Heloix scans MongoDB Atlas organizations for security misconfigurations including network access, encryption, auditing, and authentication settings.

## Authentication

\`\`\`bash
export MONGODB_ATLAS_PUBLIC_KEY=your-public-key
export MONGODB_ATLAS_PRIVATE_KEY=your-private-key
heloix mongodbatlas
\`\`\`

## Required API Key Permissions

Create a programmatic API key with:
- **Organization Read Only**

## Run a Scan

\`\`\`bash
# Scan your organization
heloix mongodbatlas --atlas-organization-id YOUR_ORG_ID
\`\`\`

## Supported Checks

Network Access Lists (IP allowlisting), Encryption at Rest, Cloud Backup, Database Auditing, Activity Feed, LDAP Authentication, Multi-Factor Authentication requirement.`,
  },

  'openstack-provider': {
    title: 'OpenStack Provider',
    content: `Heloix supports OpenStack deployments (private cloud) with checks across Nova, Neutron, Keystone, Cinder, and more.

## Authentication

\`\`\`bash
# Using clouds.yaml
cat > ~/.config/openstack/clouds.yaml << EOF
clouds:
  mycloud:
    auth:
      auth_url: https://openstack.example.com:5000
      username: heloix-user
      password: your-password
      project_name: heloix-project
      domain_name: Default
    region_name: RegionOne
EOF

heloix openstack --os-cloud mycloud
\`\`\`

## Supported Services

Cinder (block storage), Glance (images), Keystone (identity/IAM), Neutron (networking), Nova (compute), Swift (object storage).`,
  },

  'llm-provider': {
    title: 'LLM Provider',
    content: `Heloix can scan Large Language Model deployments and configurations for security issues, including API key exposure, rate limiting, and access controls.

## Supported LLM Services

- OpenAI API
- AWS Bedrock
- Azure OpenAI
- Google Vertex AI / Gemini

## Run a Scan

\`\`\`bash
# Scan AWS Bedrock configurations
heloix aws --service bedrock

# Using the dedicated LLM provider
heloix llm --llm-provider openai
\`\`\`

## What Heloix Checks

- API key exposure in environment variables and configuration files
- Model access policies and usage limits
- Logging and monitoring configuration
- Data residency and privacy settings
- VPC endpoint configuration (AWS Bedrock)`,
  },

  'image-provider': {
    title: 'Container Images Provider',
    content: `Heloix can scan container images for OS and package vulnerabilities, secrets, and misconfigurations.

## Scan a Container Image

\`\`\`bash
# Scan from Docker Hub
heloix image --image nginx:latest

# Scan a local image
heloix image --image my-app:1.0

# Scan images in ECR
heloix aws --service ecr
\`\`\`

## What Heloix Checks

- OS-level CVEs (via Trivy integration)
- Application dependency vulnerabilities
- Exposed secrets and credentials in image layers
- Running as root user
- Unnecessary capabilities
- Outdated base images

## Output

\`\`\`bash
heloix image --image my-app:latest -M json html
\`\`\`

Results show CVE identifiers, CVSS scores, affected packages, and remediation recommendations.`,
  },

  'google-workspace': {
    title: 'Google Workspace Provider',
    content: `Heloix checks Google Workspace domain security settings including Admin Console policies, Gmail, Drive, and Calendar sharing.

## Authentication

\`\`\`bash
# Service account with domain-wide delegation
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
heloix googleworkspace --customer-id C01234567
\`\`\`

## Required OAuth Scopes

The service account requires domain-wide delegation with these scopes:
- \`https://www.googleapis.com/auth/admin.directory.user.readonly\`
- \`https://www.googleapis.com/auth/admin.directory.domain.readonly\`
- \`https://www.googleapis.com/auth/admin.reports.audit.readonly\`
- \`https://www.googleapis.com/auth/admin.reports.usage.readonly\`

## Supported Checks

- 2-Step Verification enforcement
- Less secure app access
- OAuth app access control
- Drive external sharing settings
- Calendar sharing policies
- Gmail attachment scanning settings
- Admin account security settings`,
  },
};

export default providers;
