// Heloix Docs — User Guide Section

const userGuide = {

  'tutorials-app': {
    title: 'Heloix App Tutorial',
    content: `This tutorial walks you through using Heloix App for the first time — from adding a cloud provider to reviewing your first findings.

## Step 1: Log In

Open Heloix App at **http://localhost:3000** (self-hosted) or **https://cloud.heloix.devmonk.tech** (cloud).

Sign in with your credentials, or use Social Login (Google / GitHub) if enabled.

## Step 2: Add a Cloud Provider

1. Go to **Settings > Cloud Providers**
2. Click **Add Provider**
3. Select your provider (e.g., AWS)
4. Follow the on-screen instructions to grant the required read-only permissions

### AWS — Minimum IAM Policy

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["SecurityHub:*", "sts:GetCallerIdentity"],
      "Resource": "*"
    }
  ]
}
\`\`\`

For a full list of required permissions, see the [AWS provider docs](/docs/providers/aws).

## Step 3: Run Your First Scan

1. Navigate to **Scans**
2. Click **Launch Scan**
3. Select your provider and account
4. Click **Start**

Scans typically take 5–15 minutes depending on provider and number of resources.

## Step 4: Review Findings

Once the scan completes:
- Navigate to **Findings** to see all security issues
- Use the **Provider**, **Service**, **Severity**, and **Status** filters to drill down
- Click any finding to see full details, remediation steps, and compliance mapping

## Step 5: Track Progress

- Mark findings as **Muted** (known accepted risk) or **Resolved** (remediated)
- Rerun scans to verify fixes — resolved findings will show in **Delta** view
- Export reports via the **Reports** tab (CSV, JSON-OCSF, HTML)`,
  },

  'cli-basic': {
    title: 'CLI Basic Usage',
    content: `Run Heloix CLI against any supported cloud provider with a single command.

## Basic Commands

\`\`\`bash
# AWS
heloix aws

# Azure
heloix azure

# Google Cloud
heloix gcp --project-id my-project-id

# Kubernetes
heloix kubernetes

# Microsoft 365
heloix m365

# GitHub
heloix github --github-org my-org
\`\`\`

## AWS Authentication

Heloix CLI uses the standard AWS SDK credential chain:

\`\`\`bash
# Using environment variables
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
heloix aws

# Using a named profile
heloix aws --profile my-profile

# Using IAM Role assumption
heloix aws --role arn:aws:iam::123456789:role/HeloixRole

# Specify region
heloix aws --region us-east-1 eu-west-1
\`\`\`

## Useful Flags

| Flag | Description |
|---|---|
| \`-v\` | Show version |
| \`-M json\` | Output format (json, csv, html, ocsf) |
| \`--severity critical high\` | Filter by severity |
| \`--service s3 ec2\` | Filter by service |
| \`--checks s3_bucket_public\` | Run specific checks only |
| \`--list-checks\` | List all available checks |
| \`--list-compliance\` | List all compliance frameworks |
| \`--log-level DEBUG\` | Enable debug logging |
| \`--config-file path\` | Use a config file |

## Output Directory

By default, results are saved to \`output/\` in the current directory:

\`\`\`
output/
  heloix_output_<timestamp>.json
  heloix_output_<timestamp>.csv
  heloix_output_<timestamp>.html
\`\`\``,
  },

  'cli-output': {
    title: 'Output Formats',
    content: `Heloix supports multiple output formats to fit different workflows.

## Formats

| Format | Flag | Description |
|---|---|---|
| JSON | \`-M json\` | Standard JSON findings |
| JSON-OCSF | \`-M json-ocsf\` | Open Cybersecurity Schema Framework |
| CSV | \`-M csv\` | Spreadsheet-compatible |
| HTML | \`-M html\` | Interactive HTML report |
| ASFF | \`-M asff\` | AWS Security Finding Format (for Security Hub) |

## Multiple Formats

\`\`\`bash
# Generate all formats at once
heloix aws -M json csv html

# Generate JSON-OCSF only
heloix aws -M json-ocsf
\`\`\`

## Custom Output Path

\`\`\`bash
heloix aws --output-directory /tmp/my-results --output-filename my-scan
\`\`\`

## Send to AWS Security Hub

\`\`\`bash
heloix aws -M asff --send-sh
\`\`\`

## Send to S3

\`\`\`bash
heloix aws -M json --output-modes-options s3_bucket=my-results-bucket
\`\`\`

## JSON Structure

Each finding in the JSON output contains:

\`\`\`json
{
  "CheckID": "s3_bucket_public_access_block_enabled",
  "CheckTitle": "Ensure S3 bucket public access is blocked",
  "ServiceName": "s3",
  "SubServiceName": "S3Bucket",
  "Status": "FAIL",
  "Severity": "HIGH",
  "ResourceId": "my-bucket",
  "ResourceArn": "arn:aws:s3:::my-bucket",
  "Region": "us-east-1",
  "Remediation": {
    "Recommendation": { "Text": "Enable block public access setting" },
    "Code": { "CLI": "aws s3api put-public-access-block ...", "Terraform": "..." }
  }
}
\`\`\``,
  },

  'cli-filtering': {
    title: 'Filtering & Exclusions',
    content: `Heloix provides fine-grained filtering to focus on what matters.

## Severity Filters

\`\`\`bash
# Only critical and high findings
heloix aws --severity critical high

# All except informational
heloix aws --severity critical high medium low
\`\`\`

## Service Filters

\`\`\`bash
# Only S3 and IAM checks
heloix aws --service s3 iam

# List available services
heloix aws --list-services
\`\`\`

## Check Filters

\`\`\`bash
# Run a specific check
heloix aws --checks s3_bucket_public_access_block_enabled

# Exclude specific checks
heloix aws --excluded-checks access_analyzer_enabled

# Run checks by category
heloix aws --categories forensics-ready encryption

# List available checks
heloix aws --list-checks
\`\`\`

## Resource Filters

\`\`\`bash
# Include specific resource tags
heloix aws --resource-tags Environment=Production

# Include specific resource ARNs
heloix aws --resource-arn arn:aws:s3:::my-bucket

# Ignore specific accounts (multi-account setups)
heloix aws --ignore-unused-services
\`\`\`

## Region Filters

\`\`\`bash
# Specific regions
heloix aws --region us-east-1 us-west-2 eu-west-1

# Only regions with active resources
heloix aws --filter-unused-regions
\`\`\`

## Mutelist (Permanent Exclusions)

Create a mutelist file to permanently suppress known accepted risks:

\`\`\`yaml
# mutelist.yaml
Mutes:
  - CheckID: "access_analyzer_enabled"
    Regions: ["us-west-2"]
    Resources: ["*"]
    Tags: ["Environment=Development"]
\`\`\`

\`\`\`bash
heloix aws --mutelist-file mutelist.yaml
\`\`\``,
  },

  'cli-compliance': {
    title: 'Compliance Scans',
    content: `Run Heloix against a specific compliance framework to generate a compliance gap report.

## Run a Compliance Scan

\`\`\`bash
# List available frameworks for a provider
heloix aws --list-compliance

# Run against CIS AWS Foundations Benchmark v4.0
heloix aws --compliance cis_4.0_aws

# Run against multiple frameworks
heloix aws --compliance cis_4.0_aws pci_3.2.1_aws

# Export compliance report
heloix aws --compliance cis_4.0_aws -M csv html
\`\`\`

## Supported Frameworks (Sample)

| Framework | ID |
|---|---|
| CIS AWS Foundations Benchmark v4.0 | \`cis_4.0_aws\` |
| CIS Azure Foundations v2.0 | \`cis_2.0_azure\` |
| PCI DSS v3.2.1 (AWS) | \`pci_3.2.1_aws\` |
| HIPAA AWS | \`hipaa_aws\` |
| SOC 2 AWS | \`soc2_aws\` |
| ISO 27001 AWS | \`iso27001_2013_aws\` |
| NIST 800-53 r5 AWS | \`nist_800_53_revision_5_aws\` |
| NIST CSF 1.1 AWS | \`nist_csf_1.1_aws\` |
| FedRAMP Moderate AWS | \`fedramp_moderate_revision_4_aws\` |
| GDPR AWS | \`gdpr_aws\` |

## Compliance Report Output

The compliance report groups findings by framework requirement:

\`\`\`
CIS 1.1 — Avoid the use of the "root" account
  Status: PASS

CIS 1.2 — Ensure MFA is enabled for all IAM users
  Status: FAIL (3 resources)
  Resources:
    - user/admin-user
    - user/deploy-user
\`\`\``,
  },

  'configuration-file': {
    title: 'Configuration File',
    content: `Use a YAML configuration file to define default settings, credentials, and provider options so you don't need to pass flags every time.

## File Location

By default, Heloix looks for a config file at:
\`\`\`
~/.config/heloix/config.yaml
\`\`\`

Or specify a custom path:
\`\`\`bash
heloix aws --config-file /path/to/config.yaml
\`\`\`

## Example Config

\`\`\`yaml
# heloix_config.yaml

# Global settings
log_level: WARNING
output_directory: /tmp/heloix-results
output_formats: ["json", "html"]

# Provider-specific settings
providers:
  aws:
    credentials_profile: my-profile
    regions:
      - us-east-1
      - us-west-2
    services:
      - s3
      - iam
      - ec2
    severity:
      - critical
      - high
    mutelist_file: mutelist.yaml

  azure:
    subscription_ids:
      - xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
\`\`\`

## Service-Level Configuration

You can tune individual check behaviors:

\`\`\`yaml
# Service check configuration
services:
  s3:
    muted_checks:
      - s3_bucket_default_lock
  accessanalyzer:
    enabled_regions:
      - us-east-1
\`\`\``,
  },

  'custom-checks': {
    title: 'Custom Checks',
    content: `Extend Heloix with your own security checks written in Python.

## Check Structure

A custom check is a Python class that inherits from the Heloix base check class:

\`\`\`python
# custom_checks/my_check/my_check.py
from heloix.providers.aws.lib.check.check import Check, check_metadata
from heloix.providers.aws.services.s3.s3_client import s3_client

class my_custom_s3_check(Check):
    def execute(self):
        findings = []
        for bucket in s3_client.buckets:
            if bucket.name.startswith("tmp-"):
                # FAIL: temporary buckets should not exist
                finding = check_metadata(
                    status="FAIL",
                    status_extended=f"Bucket {bucket.name} uses 'tmp-' prefix",
                    resource_id=bucket.name,
                    resource_arn=bucket.arn,
                )
            else:
                finding = check_metadata(
                    status="PASS",
                    status_extended=f"Bucket {bucket.name} is OK",
                    resource_id=bucket.name,
                    resource_arn=bucket.arn,
                )
            findings.append(finding)
        return findings
\`\`\`

## Metadata File

Each check needs a metadata JSON file:

\`\`\`json
{
  "Provider": "aws",
  "CheckID": "my_custom_s3_check",
  "CheckTitle": "Ensure no temporary S3 buckets exist",
  "ServiceName": "s3",
  "Severity": "medium",
  "Description": "Detects S3 buckets with 'tmp-' prefix.",
  "Remediation": {
    "Recommendation": {
      "Text": "Remove temporary buckets or rename them."
    }
  }
}
\`\`\`

## Run Custom Checks

\`\`\`bash
heloix aws --custom-checks-metadata-directory ./custom_checks
\`\`\``,
  },

  'integrations': {
    title: 'Integrations',
    content: `Connect Heloix with your existing security toolchain.

## GitHub Actions

\`\`\`yaml
# .github/workflows/heloix.yml
name: Heloix Security Scan
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/HeloixGitHubRole
          aws-region: us-east-1
      - name: Install Heloix
        run: pip install heloix
      - name: Run scan
        run: heloix aws -M json --output-directory ./results
      - uses: actions/upload-artifact@v4
        with:
          name: heloix-results
          path: results/
\`\`\`

## AWS Security Hub

Send findings directly to AWS Security Hub:

\`\`\`bash
heloix aws -M asff --send-sh --aws-security-hub-integration
\`\`\`

## Slack Notifications

\`\`\`bash
heloix aws \\
  --slack-token xoxb-your-token \\
  --slack-channel-id C01234567 \\
  --severity critical
\`\`\`

## Jira Integration

\`\`\`bash
heloix aws \\
  --jira-token YOUR_TOKEN \\
  --jira-project-key SEC \\
  --jira-base-url https://yourorg.atlassian.net
\`\`\`

## JIRA / PagerDuty / ServiceNow

Heloix App and Heloix Cloud offer native integrations with JIRA, PagerDuty, ServiceNow, and other ITSM tools under **Settings > Integrations**.

## MCP Server (AI Integration)

\`\`\`bash
# Claude / Cursor / Windsurf integration
heloix-mcp

# Add to Claude Desktop config
{
  "mcpServers": {
    "heloix": {
      "command": "heloix-mcp"
    }
  }
}
\`\`\``,
  },
};

export default userGuide;
