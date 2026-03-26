// Heloix Docs — Reference Section

const reference = {

  security: {
    title: 'Security',
    content: `## Reporting Security Issues

**Do not open public GitHub issues for security vulnerabilities.**

Email **security@heloix.io** with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Affected versions

We acknowledge reports within 48 hours and aim to release patches within 7 days.

## Security Policy

Heloix follows [responsible disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure). We publicly disclose vulnerabilities after a patch is available.

## Heloix Cloud Security

| Control | Detail |
|---|---|
| Encryption at rest | AES-256 |
| Encryption in transit | TLS 1.3 |
| Authentication | OAuth 2.0, SAML, OIDC |
| MFA | Enforced for all users |
| SOC 2 Type II | Certified |
| GDPR | Compliant |
| Data residency | US, EU regions available |
| Penetration testing | Annual third-party |

## Required Permissions

Heloix only requires **read-only** access to your cloud accounts. It never modifies resources.

For AWS, the minimum required policy is **SecurityAudit + ReadOnlyAccess** (AWS managed policies).

## Data Handling

- Scan results are stored encrypted in your database (self-hosted) or Heloix Cloud
- No cloud credentials are stored — Heloix uses temporary session tokens
- Finding data can be exported and deleted at any time
- See the full [Privacy Policy](https://heloix.devmonk.tech/privacy) for details`,
  },

  support: {
    title: 'Support',
    content: `## Getting Help

### Community Support (Free)

- **GitHub Issues** — Bug reports and feature requests: [github.com/heloix-cloud/heloix/issues](https://github.com/heloix-cloud/heloix/issues)
- **GitHub Discussions** — Questions and ideas: [github.com/heloix-cloud/heloix/discussions](https://github.com/heloix-cloud/heloix/discussions)
- **Slack** — Community chat at [slack.heloix.io](https://slack.heloix.io)
- **Documentation** — You're reading it!

### Pro & Enterprise Support

Heloix Cloud Pro and Enterprise plans include:
- **Email support** — support@heloix.io
- **SLA** — Response time guaranteed by plan tier
- **Dedicated Slack channel** — Direct access to the engineering team
- **Onboarding assistance** — Guided setup for enterprise deployments

### Priority Support Channels

| Plan | Channel | Response SLA |
|---|---|---|
| Free | GitHub Discussions | Best effort |
| Pro | Email | 2 business days |
| Enterprise | Slack + Email | 4 hours |

## Useful Information to Include in Support Requests

- Heloix version: \`heloix -v\`
- Python version: \`python --version\`
- Operating system
- Cloud provider and command run
- Full error message and stack trace
- Debug logs: add \`--log-level DEBUG\` to your command`,
  },

  troubleshooting: {
    title: 'Troubleshooting',
    content: `## Common Issues

### Command Not Found After Installation

\`\b\`bash
# Add Python user scripts to PATH
export PATH="$HOME/.local/bin:$PATH"

# Verify
which heloix
heloix -v
\`\b\`

### AWS: No credentials found

\`\b\`bash
# Check AWS credentials
aws sts get-caller-identity

# If using a profile
heloix aws --profile my-profile
\`\b\`

### AWS: Access Denied errors

Heloix needs **SecurityAudit + ReadOnlyAccess** policies. Run:

\`\b\`bash
aws iam list-attached-user-policies --user-name my-user
aws iam list-attached-role-policies --role-name my-role
\`\b\`

### Azure: Authentication errors

\`\b\`bash
# Re-authenticate
az login
az account show

# Verify service principal
az ad sp show --id $AZURE_CLIENT_ID
\`\b\`

### GCP: Credentials not found

\`\b\`bash
gcloud auth application-default login
gcloud auth application-default print-access-token  # should return a token
\`\b\`

### Slow Scans

- Use \`--service\` to limit the scan scope
- Use \`--region\` to target specific regions
- Use \`--severity critical high\` to skip low-priority checks

### Debug Mode

Always try debug mode first when troubleshooting:

\`\b\`bash
heloix aws --log-level DEBUG 2>&1 | tee heloix-debug.log
\`\b\`

### Docker: Volume permission errors

\`\b\`bash
# Fix output directory permissions
chmod 777 ./output
docker run --rm -v $PWD/output:/tmp/heloix-output ghcr.io/heloix-cloud/heloix:latest aws
\`\b\`

### Import Errors (Python)

\`\b\`bash
# Reinstall cleanly
pip uninstall heloix -y
pip install heloix

# Or use a fresh virtual environment
python3 -m venv .venv-fresh
source .venv-fresh/bin/activate
pip install heloix
\`\b\``,
  },

  changelog: {
    title: 'Changelog',
    content: `## Recent Releases

### v5.5.0 — March 2026

**New Checks:**
- 25 new AWS checks for Bedrock, Q Developer, and SageMaker
- 10 new Azure checks for Defender for Cloud settings
- 8 new Kubernetes checks for Pod Security Standards

**New Features:**
- MCP Server now supports HTTP transport mode
- New \`--delta-findings\` flag to show only changed findings vs last scan
- Heloix App: native JIRA integration (create tickets from findings)
- Support for Python 3.12

**Bug Fixes:**
- Fixed IAM check false positives for service-linked roles
- Fixed Azure pagination issue in large tenants
- Improved GCP organization scanning performance

---

### v5.4.0 — February 2026

**New Providers:**
- LLM Provider (AWS Bedrock, Azure OpenAI)
- Container Image scanning

**New Features:**
- Heloix Hub: new compliance mapping explorer
- CSV output now includes remediation code columns
- \`heloix-mcp\` command for MCP Server

---

### v5.3.0 — January 2026

**New Checks:**
- 40 new GitHub organization and repository checks
- 15 new Cloudflare checks

**Improvements:**
- 60% faster AWS IAM scanning via caching improvements
- Kubernetes check coverage expanded to 100+ checks
- New \`--resource-arn\` filter for targeted scanning

---

For the complete changelog, see [GitHub Releases](https://github.com/heloix-cloud/heloix/releases).`,
  },

  roadmap: {
    title: 'Public Roadmap',
    content: `## Current Focus (Q2 2026)

### In Progress
- **AI-powered remediation** — LLM-generated, context-aware fix suggestions
- **Heloix Agent** — Autonomous cloud security agent (experimental)
- **Drift detection** — Alert when resources change between scans
- **SBOM generation** — Software Bill of Materials for container images

### Planned
- **Terraform fix generation** — Auto-generate Terraform patches for failed checks
- **Multi-cloud compliance dashboards** — Single view across all providers
- **Custom compliance frameworks** — Define your own compliance requirements

---

## Recently Shipped ✅

- MCP Server for AI assistant integration
- JIRA native integration in Heloix App
- LLM and Container Image providers
- GitHub organization scanning (100+ checks)
- Cloudflare provider

---

## Long-Term Vision

Heloix aims to be the **universal cloud security platform** that makes security accessible to every engineering team — whether running a startup on a free tier or managing enterprise multi-cloud environments.

Key long-term goals:
- Zero-friction cloud security (scan in under 60 seconds)
- AI-driven auto-remediation with human-in-the-loop approval
- Real-time continuous monitoring (not just periodic scans)
- Coverage for every major cloud service across all providers

---

## Request a Feature

Open a [GitHub Discussion](https://github.com/heloix-cloud/heloix/discussions) with the **Feature Request** template. Popular requests are added to the roadmap.`,
  },
};

export default reference;
