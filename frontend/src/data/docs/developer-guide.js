// Heloix Docs — Developer Guide Section

const developerGuide = {

  'dev-introduction': {
    title: 'Developer Guide Introduction',
    content: `Welcome to the Heloix developer guide. Heloix is fully open-source and contributions are always welcome.

## Repository

\`\`\`bash
git clone https://github.com/heloix-cloud/heloix.git
cd heloix
\`\`\`

## Development Setup

\`\`\`bash
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install in editable mode with dev dependencies
pip install -e ".[dev]"

# Verify
heloix -v
pytest --version
\`\b\`

## Contribution Workflow

1. Fork the repository on GitHub
2. Create a feature branch: \`git checkout -b feature/my-new-check\`
3. Write your check and tests
4. Run the test suite: \`pytest tests/\`
5. Submit a Pull Request

## Community

- **GitHub Issues** — Bug reports and feature requests
- **GitHub Discussions** — Questions and ideas
- **Slack** — Join the community at slack.heloix.io
- **Security** — security@heloix.io`,
  },

  'dev-architecture': {
    title: 'Architecture',
    content: `Heloix is organized as a Python package with a modular provider/service/check hierarchy.

## Directory Structure

\`\`\`
heloix/
├── heloix/
│   ├── providers/
│   │   ├── aws/
│   │   │   ├── lib/
│   │   │   │   └── check/
│   │   │   ├── services/
│   │   │   │   ├── s3/
│   │   │   │   │   ├── s3_client.py
│   │   │   │   │   ├── s3_service.py
│   │   │   │   │   └── s3_bucket_public_access_block/
│   │   │   │   │       ├── s3_bucket_public_access_block.py
│   │   │   │   │       └── s3_bucket_public_access_block.metadata.json
│   │   │   │   └── iam/
│   │   │   └── aws_provider.py
│   │   ├── azure/
│   │   └── gcp/
│   ├── lib/
│   └── cli/
└── tests/
    └── providers/
        └── aws/
            └── services/
                └── s3/
                    └── test_s3_bucket_public_access_block.py
\`\b\`

## Core Concepts

### Provider
A cloud platform (aws, azure, gcp, kubernetes). Each provider has an authentication layer and a set of services.

### Service
A cloud service within a provider (e.g., S3, IAM, EC2). The service client fetches and caches all resource data once; checks then iterate over the cached data.

### Check
A single security assertion against a set of resources. A check takes no arguments — it reads from the cached service client and returns a list of findings.

### Finding
The result of a check execution for a single resource. Has \`status\` (PASS/FAIL/ERROR), \`status_extended\` (human-readable reason), and resource identifiers.`,
  },

  'dev-new-check': {
    title: 'Creating a New Check',
    content: `This guide walks through creating a new AWS check from scratch.

## 1. Create the Check Directory

\`\b\`bash
mkdir -p heloix/providers/aws/services/s3/s3_my_new_check
\`\b\`

## 2. Write the Check Class

\`\b\`python
# heloix/providers/aws/services/s3/s3_my_new_check/s3_my_new_check.py

from heloix.providers.aws.lib.check.check import Check
from heloix.providers.aws.services.s3.s3_client import s3_client
from heloix.lib.check.models import CheckResult


class s3_my_new_check(Check):
    def execute(self) -> list[CheckResult]:
        findings = []
        for bucket in s3_client.buckets:
            report = CheckResult(
                check_id=self.CheckID,
                check_description=self.CheckTitle,
                status="FAIL" if not bucket.versioning else "PASS",
                status_extended=f"Bucket {bucket.name} {'does not have' if not bucket.versioning else 'has'} versioning enabled.",
                resource_id=bucket.name,
                resource_arn=bucket.arn,
                region=bucket.region,
            )
            findings.append(report)
        return findings
\`\b\`

## 3. Write the Metadata File

\`\b\`json
{
  "Provider": "aws",
  "CheckID": "s3_my_new_check",
  "CheckTitle": "Ensure S3 bucket versioning is enabled",
  "CheckType": [],
  "ServiceName": "s3",
  "SubServiceName": "S3Bucket",
  "Severity": "medium",
  "Description": "S3 bucket versioning protects against accidental deletion and overwrites.",
  "Risk": "Without versioning, objects can be permanently deleted or overwritten.",
  "RelatedUrl": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html",
  "Remediation": {
    "Code": {
      "CLI": "aws s3api put-bucket-versioning --bucket <BUCKET_NAME> --versioning-configuration Status=Enabled",
      "NativeIaC": "",
      "Terraform": "resource \\"aws_s3_bucket_versioning\\" ...",
      "Other": ""
    },
    "Recommendation": {
      "Text": "Enable versioning on all S3 buckets that store important data.",
      "Url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/manage-versioning-examples.html"
    }
  },
  "Categories": ["storage"],
  "Tags": {
    "CheckType": "Software and Configuration Checks",
    "Services": ["s3"]
  }
}
\`\b\`

## 4. Write Tests

\`\b\`python
# tests/providers/aws/services/s3/test_s3_my_new_check.py

from unittest.mock import MagicMock, patch
from heloix.providers.aws.services.s3.s3_my_new_check.s3_my_new_check import s3_my_new_check


class TestS3MyNewCheck:
    def test_bucket_versioning_enabled(self):
        bucket = MagicMock()
        bucket.name = "my-bucket"
        bucket.arn = "arn:aws:s3:::my-bucket"
        bucket.region = "us-east-1"
        bucket.versioning = True

        with patch("heloix.providers.aws.services.s3.s3_my_new_check.s3_my_new_check.s3_client") as mock_client:
            mock_client.buckets = [bucket]
            check = s3_my_new_check()
            result = check.execute()

        assert len(result) == 1
        assert result[0].status == "PASS"

    def test_bucket_versioning_disabled(self):
        bucket = MagicMock()
        bucket.name = "my-bucket"
        bucket.versioning = False

        with patch("heloix.providers.aws.services.s3.s3_my_new_check.s3_my_new_check.s3_client") as mock_client:
            mock_client.buckets = [bucket]
            check = s3_my_new_check()
            result = check.execute()

        assert result[0].status == "FAIL"
\`\b\`

## 5. Run Tests

\`\b\`bash
pytest tests/providers/aws/services/s3/test_s3_my_new_check.py -v
\`\b\``,
  },

  'dev-new-provider': {
    title: 'Adding a Provider',
    content: `Adding a new cloud provider to Heloix requires implementing the provider class, authentication layer, and at least one service client.

## Provider Directory Structure

\`\b\`
heloix/providers/myprovider/
├── __init__.py
├── myprovider_provider.py      # Provider authentication class
├── lib/
│   └── check/
│       └── check.py            # Base check class for this provider
└── services/
    └── myservice/
        ├── __init__.py
        ├── myservice_client.py  # Singleton service client
        ├── myservice_service.py # Service implementation
        └── mycheck/
            ├── mycheck.py
            └── mycheck.metadata.json
\`\b\`

## 1. Create the Provider Class

\`\b\`python
# heloix/providers/myprovider/myprovider_provider.py

from heloix.lib.providers.provider import Provider


class MyProvider(Provider):
    provider = "myprovider"
    provider_description = "My Cloud Provider"

    def setup_session(self):
        # Initialize SDK client with credentials
        ...

    def print_credentials(self):
        # Log which credentials are being used
        ...
\`\b\`

## 2. Implement a Service Client

\`\b\`python
# heloix/providers/myprovider/services/myservice/myservice_client.py

from heloix.providers.myprovider.services.myservice.myservice_service import MyService

myprovider_client = MyService()
\`\b\`

## 3. Register the Provider

Add your provider to the provider registry in \`heloix/lib/providers/manager.py\`.

## 4. Add CLI Entry Point

Register the provider as a CLI subcommand in \`heloix/cli/cli.py\`.`,
  },

  'dev-metadata': {
    title: 'Check Metadata Guidelines',
    content: `Every Heloix check requires a \`.metadata.json\` file. This reference covers all required and optional fields.

## Required Fields

| Field | Type | Description |
|---|---|---|
| \`Provider\` | string | Provider name (\`aws\`, \`azure\`, \`gcp\`, etc.) |
| \`CheckID\` | string | Snake_case unique check ID matching the file/class name |
| \`CheckTitle\` | string | Short, imperative title (e.g., "Ensure S3 bucket...") |
| \`ServiceName\` | string | Service name in snake_case (\`s3\`, \`iam\`, \`ec2\`) |
| \`Severity\` | string | \`critical\`, \`high\`, \`medium\`, \`low\`, or \`informational\` |
| \`Description\` | string | What the check verifies and why it matters |
| \`Remediation\` | object | Code snippets and recommendation text |

## Severity Guidelines

| Severity | Use For |
|---|---|
| **critical** | Publicly exposed resources, hardcoded credentials, no auth |
| **high** | Encryption disabled, logging off on sensitive data, privilege escalation |
| **medium** | Best practices not followed, weak configurations |
| **low** | Minor improvements, cosmetic issues |
| **informational** | Inventory items, no security impact |

## Naming Convention

Check IDs follow the pattern: \`{service}_{resource}_{condition}\`

Examples:
- \`s3_bucket_public_access_block_enabled\`
- \`iam_root_hardware_mfa_enabled\`
- \`ec2_instance_no_public_ip\`
- \`cloudtrail_s3_bucket_access_logging_enabled\``,
  },

  'dev-testing': {
    title: 'Testing',
    content: `Heloix uses pytest for unit testing. Every check must have a corresponding test file.

## Run All Tests

\`\b\`bash
# Run the full test suite
pytest tests/ -v

# Run tests for a specific provider
pytest tests/providers/aws/ -v

# Run tests for a specific service
pytest tests/providers/aws/services/s3/ -v

# Run a single test file
pytest tests/providers/aws/services/s3/test_s3_bucket_public.py -v
\`\b\`

## Test Coverage

\`\b\`bash
# Generate coverage report
pytest tests/ --cov=heloix --cov-report=html

# Open report
open htmlcov/index.html
\`\b\`

## Test Structure

Each check test should cover:
1. **PASS case** — resource meets the security requirement
2. **FAIL case** — resource does not meet the requirement
3. **Edge cases** — empty resource list, None values, API errors

\`\b\`python
class TestMyCheck:
    def test_pass(self):
        ...  # Resource is compliant

    def test_fail(self):
        ...  # Resource is non-compliant

    def test_empty(self):
        with patch(...) as mock_client:
            mock_client.resources = []
            check = my_check()
            result = check.execute()
        assert result == []
\`\b\`

## Linting and Formatting

\`\b\`bash
# Format code
black heloix/ tests/

# Type checking
mypy heloix/

# Linting
ruff heloix/ tests/
\`\b\``,
  },

  'dev-contributing': {
    title: 'Contributing',
    content: `We welcome all contributions — bug fixes, new checks, documentation improvements, and more.

## Before You Start

- Read the [Code of Conduct](https://github.com/heloix-cloud/heloix/blob/master/CODE_OF_CONDUCT.md)
- Check [open issues](https://github.com/heloix-cloud/heloix/issues) to avoid duplicating effort
- For large changes, open an issue first to discuss the approach

## Pull Request Process

1. Fork the repository
2. Create a branch: \`git checkout -b feature/my-change\`
3. Make your changes
4. Add/update tests
5. Ensure all tests pass: \`pytest tests/\`
6. Ensure linting passes: \`ruff heloix/ && black --check heloix/\`
7. Commit with a clear message
8. Push and open a Pull Request

## PR Requirements Checklist

- [ ] Tests added for new checks (PASS, FAIL, edge cases)
- [ ] Metadata JSON file present and complete
- [ ] Check ID follows naming convention
- [ ] Severity level justified in PR description
- [ ] Documentation updated if applicable
- [ ] No secrets or credentials in code

## Reporting Bugs

Use the [GitHub Issues](https://github.com/heloix-cloud/heloix/issues) template. Include:
- Heloix version (\`heloix -v\`)
- Python version (\`python --version\`)
- Cloud provider and scan command
- Expected vs actual behavior
- Relevant log output (\`--log-level DEBUG\`)

## Reporting Security Issues

**Do not open public GitHub issues for security vulnerabilities.**

Email **security@heloix.io** with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We respond within 48 hours and aim to release patches within 7 days.`,
  },
};

export default developerGuide;
