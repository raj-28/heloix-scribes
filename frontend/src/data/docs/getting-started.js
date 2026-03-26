// Heloix Docs — Getting Started Section

const gettingStarted = {

  introduction: {
    title: 'What is Heloix?',
    content: `**Heloix** is the world's most widely used open-source cloud security platform that **automates security and compliance** across any cloud environment.

With hundreds of ready-to-use security checks, remediation guidance, and compliance frameworks, Heloix delivers AI-driven, customizable, and easy-to-use monitoring and integrations, making cloud security **simple, scalable, and cost-effective** for organizations of any size.

## Products

| Product | Description |
|---|---|
| Heloix CLI | Command Line Interface for local and CI/CD scanning |
| Heloix App | Self-hosted web application |
| Heloix Cloud | Managed service built on top of Heloix App |
| Heloix Hub | Public library of versioned checks, artifacts, and compliance frameworks |

## Supported Providers

| Provider | Support | Audit Scope | Interface |
|---|---|---|---|
| AWS | Official | Accounts | UI, API, CLI |
| Azure | Official | Subscriptions | UI, API, CLI |
| Google Cloud | Official | Projects | UI, API, CLI |
| Kubernetes | Official | Clusters | UI, API, CLI |
| Microsoft 365 | Official | Tenants | UI, API, CLI |
| GitHub | Official | Organizations / Repositories | UI, API, CLI |
| Oracle Cloud | Official | Tenancies / Compartments | UI, API, CLI |
| Alibaba Cloud | Official | Accounts | UI, API, CLI |
| Cloudflare | Official | Accounts | UI, API, CLI |
| Infra as Code | Official | Repositories | UI, API, CLI |
| MongoDB Atlas | Official | Organizations | UI, API, CLI |
| OpenStack | Official | Projects | UI, API, CLI |
| LLM | Official | Models | CLI |
| Container Images | Official | Images | CLI, API |
| Google Workspace | Official | Domains | CLI |

## Where to go next?

- **Installation** — Get Heloix running in minutes
- **User Guide** — Detailed tutorials and CLI reference
- **Developer Guide** — Interested in contributing to Heloix?`,
  },

  products: {
    title: 'Products Overview',
    content: `Heloix offers multiple products to fit different use cases and deployment models.

## Heloix CLI

The command-line interface is the core of Heloix. Use it for local security assessments, CI/CD pipeline integration, scripted and automated scans, and custom check development.

\`\`\`bash
pip install heloix
heloix aws
\`\`\`

## Heloix App

A self-hosted web application that brings a full dashboard experience with visual security overview dashboard, multi-provider and multi-account management, scheduled automated scans (every 24 hours by default), team collaboration and role-based access, finding tracking with status history, compliance framework reports, and export in CSV, JSON-OCSF, and HTML.

\`\`\`bash
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/master/docker-compose.yml
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/master/.env
docker compose up -d
\`\`\`

Access at **http://localhost:3000** | API docs at **http://localhost:8080/api/v1/docs**

## Heloix Cloud

A fully managed SaaS service built on top of Heloix App. No infrastructure to manage — just connect your cloud accounts and start scanning. Automatic updates, built-in high availability, SOC 2 Type II certified, enterprise SSO support, and dedicated support.

API docs: **https://api.heloix.devmonk.tech/api/v1/docs**

## Heloix Hub

A public library of all versioned Heloix artifacts — security checks, remediation guides, compliance frameworks, and cloud service metadata.

- **1924+ security checks** across all providers
- **80+ compliance frameworks** (CIS, PCI DSS, HIPAA, SOC 2, ISO 27001, NIST, and more)
- Full remediation guidance: CLI, IaC, Terraform, manual steps`,
  },

  'prowler-cli': {
    title: 'Heloix CLI',
    content: `The Heloix CLI is a powerful command-line tool for performing security assessments and compliance audits across cloud providers.

## Quick Start

\`\`\`bash
# Install
pip install heloix

# Verify installation
heloix -v

# Run your first AWS scan
heloix aws

# Run Azure scan
heloix azure

# Run GCP scan
heloix gcp --project-id my-project
\`\`\`

## Key Features

- **1924+ security checks** across 16 cloud providers
- **80+ compliance frameworks** — CIS, PCI DSS, HIPAA, SOC 2, ISO 27001, NIST, FedRAMP, GDPR
- **Multiple output formats** — JSON, CSV, HTML, OCSF, ASFF
- **Configurable severity filters** — critical, high, medium, low, informational
- **Custom check support** — Extend with your own Python checks
- **CI/CD ready** — GitHub Actions, GitLab CI, Jenkins integrations
- **MCP Server** — Integrate with AI assistants via Model Context Protocol

## CLI Reference

\`\`\`bash
# List all available checks
heloix aws --list-checks

# List services
heloix aws --list-services

# List compliance frameworks
heloix aws --list-compliance

# Run with specific output format
heloix aws -M json csv html

# Run compliance scan
heloix aws --compliance cis_4.0_aws

# Filter by severity
heloix aws --severity critical high

# Filter by service
heloix aws --service s3 ec2 iam

# Debug mode
heloix aws --log-level DEBUG
\`\`\`

## MCP Server

Heloix ships with a built-in MCP Server for AI assistant integration:

\`\`\`bash
# STDIO mode (for Claude, Cursor, etc.)
heloix-mcp

# HTTP mode
heloix-mcp --transport http --host 0.0.0.0 --port 8000
\`\`\``,
  },

  'prowler-app': {
    title: 'Heloix App',
    content: `Heloix App is a self-hosted web application that provides a visual dashboard for managing and monitoring your cloud security posture across all providers.

## Requirements

- Docker Engine 20.10+
- Docker Compose v2.0+
- 4GB RAM minimum (8GB recommended)
- 20GB disk space

## Installation

\`\`\`bash
# Download configuration files
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/refs/heads/master/docker-compose.yml
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/refs/heads/master/.env

# Start all services
docker compose up -d
\`\`\`

Access at **http://localhost:3000** — API docs at **http://localhost:8080/api/v1/docs**

## Services

| Service | Port | Description |
|---|---|---|
| heloix-ui | 3000 | Web interface |
| heloix-api | 8080 | REST API |
| heloix-worker | — | Background scan worker |
| postgres | 5432 | Primary database |
| redis | 6379 | Cache and message broker |

## First Login

1. Open http://localhost:3000
2. Click **Sign Up** and create your account
3. Add your first cloud provider under **Settings > Cloud Providers**
4. Run your first scan

## Key Features

- Interactive multi-provider security dashboard
- Scheduled scans (automatic every 24 hours per provider)
- Team management with RBAC
- Finding lifecycle tracking (new, changed, resolved)
- Delta filtering — see new or changed findings between scans
- Compliance framework reports with per-control status
- Downloadable ZIP output (CSV, JSON-OCSF, HTML)
- Social login (Google, GitHub) support`,
  },

  'prowler-cloud': {
    title: 'Heloix Cloud',
    content: `Heloix Cloud is the fully managed SaaS version of Heloix App. All the power of the platform with zero infrastructure to manage.

## Getting Started

1. Visit [cloud.heloix.devmonk.tech](https://cloud.heloix.devmonk.tech)
2. Sign up for a free account
3. Connect your first cloud provider
4. Start your first scan

## API Access

Heloix Cloud users have access to the full REST API:
- API Docs: **https://api.heloix.devmonk.tech/api/v1/docs**
- Authentication: Bearer token (generated in your account settings)

## Key Benefits

- No infrastructure to manage — fully hosted
- Automatic platform updates
- Built-in high availability and disaster recovery
- **SOC 2 Type II** certified
- Enterprise SSO (SAML, OIDC)
- Dedicated support engineers
- Custom SLAs available

## Pricing

| Plan | Providers | Scans | Users |
|---|---|---|---|
| Free | 1 | 1/day | 1 |
| Pro | 10 | Unlimited | 5 |
| Enterprise | Unlimited | Unlimited | Unlimited |

## Security & Compliance

- All data encrypted at rest (AES-256) and in transit (TLS 1.3)
- Data residency options available
- GDPR compliant
- SOC 2 Type II report available on request`,
  },

  'prowler-hub': {
    title: 'Heloix Hub',
    content: `Heloix Hub is the public library of all Heloix security artifacts — checks, compliance frameworks, remediation guides, and cloud service metadata.

## What's in the Hub?

- **1924+ security checks** across all supported cloud providers
- **80+ compliance frameworks** with full requirement mappings
- **Remediation guides** — CLI, IaC, Terraform, and manual steps for every check
- **Severity ratings** — critical, high, medium, low, informational
- **Resource types** — AWS resource type identifiers for every check

## Browse the Hub

| Section | Description |
|---|---|
| Detection Checks | Browse all 1924+ security checks with filters by provider, service, severity |
| Compliance Frameworks | Browse 80+ compliance frameworks by provider and standard |
| Hub API | REST API reference for programmatic access |

## Compliance Frameworks Covered

CIS Benchmarks, PCI DSS, HIPAA, SOC 2, ISO/IEC 27001, NIST 800-53, NIST CSF, FedRAMP, GDPR, MITRE ATT&CK, CISA Cyber Essentials, ENS, FFIEC, GxP, KISA ISMS, RBI, SecNumCloud, NIS2, and many more.

## Using the Hub API

\`\`\`bash
# Get all checks for AWS
curl https://api.heloix.devmonk.tech/api/v1/checks?provider=aws

# Get a specific check
curl https://api.heloix.devmonk.tech/api/v1/checks/s3_bucket_public_access_block_enabled

# Get compliance frameworks
curl https://api.heloix.devmonk.tech/api/v1/compliance?provider=aws
\`\`\``,
  },

  'installation-pip': {
    title: 'Install via pip / pipx',
    content: `Install Heloix CLI using pip (standard) or pipx (isolated environment).

## Requirements

- Python 3.9, 3.10, 3.11, or 3.12
- pip 21.0+

## Install with pip

\`\`\`bash
pip install heloix
\`\`\`

## Install with pipx (recommended)

pipx installs Heloix in an isolated environment and avoids dependency conflicts.

\`\`\`bash
# Install pipx if needed
pip install --user pipx
pipx ensurepath

# Install heloix
pipx install heloix
\`\`\`

## Verify Installation

\`\`\`bash
heloix -v
# heloix, version 5.x.x
\`\`\`

## Upgrade

\`\`\`bash
# pip
pip install --upgrade heloix

# pipx
pipx upgrade heloix
\`\`\`

## Troubleshooting

If you encounter a \`command not found\` error after installation, ensure your PATH includes the Python scripts directory:

\`\`\`bash
# Linux / macOS
export PATH="$HOME/.local/bin:$PATH"

# Windows (PowerShell)
$env:PATH += ";$env:APPDATA\\Python\\Scripts"
\`\`\``,
  },

  'installation-docker': {
    title: 'Install via Docker',
    content: `Run Heloix CLI without installing Python or any dependencies using the official Docker image.

## Pull the Image

\`\`\`bash
docker pull ghcr.io/heloix-cloud/heloix:latest
\`\`\`

## Run a Scan

\`\`\`bash
# AWS scan using environment variables
docker run --rm \\
  -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \\
  -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \\
  -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \\
  -v $PWD/output:/tmp/heloix-output \\
  ghcr.io/heloix-cloud/heloix:latest aws

# Mount AWS credentials file
docker run --rm \\
  -v ~/.aws:/root/.aws:ro \\
  -v $PWD/output:/tmp/heloix-output \\
  ghcr.io/heloix-cloud/heloix:latest aws --profile myprofile
\`\`\`

## Available Tags

| Tag | Description |
|---|---|
| \`latest\` | Latest stable release |
| \`stable\` | Same as latest |
| \`v5.x.x\` | Specific version pin |
| \`dev\` | Latest development build |

## Output Volumes

Mount a local directory to \`/tmp/heloix-output\` to save scan results to your host.

\`\`\`bash
-v $PWD/output:/tmp/heloix-output
\`\`\``,
  },

  'installation-source': {
    title: 'Install from Source',
    content: `Build and install Heloix directly from the GitHub repository for development or to run the latest unreleased code.

## Clone the Repository

\`\`\`bash
git clone https://github.com/heloix-cloud/heloix.git
cd heloix
\`\`\`

## Create a Virtual Environment

\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate  # Linux / macOS
.venv\\Scripts\\activate     # Windows
\`\`\`

## Install Dependencies

\`\`\`bash
# Install in editable mode with all extras
pip install -e ".[all]"

# Or with specific extras
pip install -e ".[aws,azure,gcp]"
\`\`\`

## Verify

\`\`\`bash
heloix -v
\`\`\`

## Development Extras

\`\`\`bash
# Install with dev/test dependencies
pip install -e ".[dev]"

# Run tests
pytest tests/ -v
\`\`\``,
  },

  'installation-app': {
    title: 'Install Heloix App',
    content: `Heloix App is the self-hosted web dashboard. It runs as a set of Docker containers managed by Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose v2.0+
- 4 GB RAM (8 GB recommended for production)
- 20 GB disk space

## Quick Install

\`\`\`bash
# Download the docker-compose and environment files
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/refs/heads/master/docker-compose.yml
curl -LO https://raw.githubusercontent.com/heloix-cloud/heloix/refs/heads/master/.env

# Edit .env with your settings
nano .env

# Start all services
docker compose up -d
\`\`\`

## Access

| Service | URL |
|---|---|
| Web UI | http://localhost:3000 |
| REST API | http://localhost:8080 |
| API Docs | http://localhost:8080/api/v1/docs |

## Environment Configuration

Key variables in \`.env\`:

| Variable | Description |
|---|---|
| \`DJANGO_SECRET_KEY\` | Django secret key (generate a strong random value) |
| \`POSTGRES_PASSWORD\` | PostgreSQL password |
| \`ALLOWED_HOSTS\` | Comma-separated list of allowed hostnames |
| \`DEBUG\` | Set to \`False\` in production |

## Update

\`\`\`bash
docker compose pull
docker compose up -d
\`\`\`

## Stop

\`\`\`bash
docker compose down
\`\`\``,
  },
};

export default gettingStarted;
