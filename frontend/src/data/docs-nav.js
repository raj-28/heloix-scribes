// Heloix Docs — Navigation Structure
// Each section maps to a data file in ./docs/

export const docsNav = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '🚀',
    pages: [
      { id: 'introduction',        title: 'What is Heloix?' },
      { id: 'products',            title: 'Products Overview' },
      { id: 'prowler-cli',         title: 'Heloix CLI' },
      { id: 'prowler-app',         title: 'Heloix App' },
      { id: 'prowler-cloud',       title: 'Heloix Cloud' },
      { id: 'prowler-hub',         title: 'Heloix Hub' },
      { id: 'installation-pip',    title: 'Install via pip / pipx' },
      { id: 'installation-docker', title: 'Install via Docker' },
      { id: 'installation-source', title: 'Install from Source' },
      { id: 'installation-app',    title: 'Install Heloix App' },
    ],
  },
  {
    id: 'user-guide',
    title: 'User Guide',
    icon: '📖',
    pages: [
      { id: 'tutorials-app',       title: 'Heloix App Tutorial' },
      { id: 'cli-basic',           title: 'CLI Basic Usage' },
      { id: 'cli-output',          title: 'Output Formats' },
      { id: 'cli-filtering',       title: 'Filtering & Exclusions' },
      { id: 'cli-compliance',      title: 'Compliance Scans' },
      { id: 'configuration-file',  title: 'Configuration File' },
      { id: 'custom-checks',       title: 'Custom Checks' },
      { id: 'integrations',        title: 'Integrations' },
    ],
  },
  {
    id: 'providers',
    title: 'Providers',
    icon: '☁️',
    pages: [
      { id: 'aws',                 title: 'AWS' },
      { id: 'azure',               title: 'Azure' },
      { id: 'gcp',                 title: 'Google Cloud' },
      { id: 'kubernetes',          title: 'Kubernetes' },
      { id: 'microsoft365',        title: 'Microsoft 365' },
      { id: 'github-provider',     title: 'GitHub' },
      { id: 'oracle-cloud',        title: 'Oracle Cloud' },
      { id: 'alibaba-cloud',       title: 'Alibaba Cloud' },
      { id: 'cloudflare-provider', title: 'Cloudflare' },
      { id: 'iac-provider',        title: 'Infra as Code' },
      { id: 'mongodb-atlas',       title: 'MongoDB Atlas' },
      { id: 'openstack-provider',  title: 'OpenStack' },
      { id: 'llm-provider',        title: 'LLM' },
      { id: 'image-provider',      title: 'Container Images' },
      { id: 'google-workspace',    title: 'Google Workspace' },
    ],
  },
  {
    id: 'developer-guide',
    title: 'Developer Guide',
    icon: '⚙️',
    pages: [
      { id: 'dev-introduction',    title: 'Introduction' },
      { id: 'dev-architecture',    title: 'Architecture' },
      { id: 'dev-new-check',       title: 'Creating a New Check' },
      { id: 'dev-new-provider',    title: 'Adding a Provider' },
      { id: 'dev-metadata',        title: 'Check Metadata Guidelines' },
      { id: 'dev-testing',         title: 'Testing' },
      { id: 'dev-contributing',    title: 'Contributing' },
    ],
  },
  {
    id: 'reference',
    title: 'Reference',
    icon: '📚',
    pages: [
      { id: 'security',            title: 'Security' },
      { id: 'support',             title: 'Support' },
      { id: 'troubleshooting',     title: 'Troubleshooting' },
      { id: 'changelog',           title: 'Changelog' },
      { id: 'roadmap',             title: 'Public Roadmap' },
    ],
  },
];

export const allDocPages = docsNav.flatMap(section =>
  section.pages.map(page => ({ ...page, section: section.id, sectionTitle: section.title }))
);

export function getPageMeta(sectionId, pageId) {
  const idx = allDocPages.findIndex(p => p.section === sectionId && p.id === pageId);
  if (idx === -1) return null;
  return {
    current: allDocPages[idx],
    prev: allDocPages[idx - 1] || null,
    next: allDocPages[idx + 1] || null,
  };
}
