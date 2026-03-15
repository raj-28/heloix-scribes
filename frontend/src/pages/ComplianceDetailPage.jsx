import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Copy, FileText, CheckCircle, Terminal } from 'lucide-react';
import { getComplianceById, getProviderById, complianceIcons } from '../data/mock';

const ComplianceDetailPage = () => {
  const { complianceId } = useParams();
  const cm = getComplianceById(complianceId);
  const provider = cm ? getProviderById(cm.provider) : null;

  if (!cm) return (
    <div className="min-h-screen flex items-center justify-center"><div className="text-center">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Compliance framework not found</h2>
      <Link to="/compliance" className="text-sm font-medium text-[hsl(30,60%,32%)]">Back to Compliance</Link>
    </div></div>
  );

  const ic = complianceIcons[cm.icon] || complianceIcons.default;

  // Simulated requirement sections based on real CIS structure
  const sections = [
    { name: 'Identity and Access Management', reqs: Math.ceil(cm.requirementsCount * 0.25), checks: Math.ceil(cm.checksCount * 0.3) },
    { name: 'Storage', reqs: Math.ceil(cm.requirementsCount * 0.15), checks: Math.ceil(cm.checksCount * 0.15) },
    { name: 'Logging', reqs: Math.ceil(cm.requirementsCount * 0.12), checks: Math.ceil(cm.checksCount * 0.12) },
    { name: 'Monitoring', reqs: Math.ceil(cm.requirementsCount * 0.18), checks: Math.ceil(cm.checksCount * 0.18) },
    { name: 'Networking', reqs: Math.ceil(cm.requirementsCount * 0.15), checks: Math.ceil(cm.checksCount * 0.15) },
  ];
  if (cm.requirementsCount > 50) {
    sections.push({ name: 'Encryption & Data Protection', reqs: Math.ceil(cm.requirementsCount * 0.15), checks: Math.ceil(cm.checksCount * 0.1) });
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        <Link to="/compliance" className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /> Compliance Frameworks</Link>

        {/* Header */}
        <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border" style={{ backgroundColor: ic.color + '12', color: ic.color, borderColor: ic.color + '30' }}>{ic.abbr}</div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground font-display">
                {cm.title}
                {cm.version && <span className="ml-3 px-2.5 py-1 rounded text-xs font-semibold bg-[hsl(30,60%,32%)]/10 text-[hsl(30,60%,32%)]">{cm.version}</span>}
              </h1>
              <code className="text-xs text-muted-foreground mt-1 block">{cm.id}</code>
              {provider && <Link to={`/compliance?provider=${provider.id}`} className="inline-flex items-center gap-2 mt-3 text-xs px-2.5 py-1 rounded bg-secondary text-foreground border border-border hover:border-[hsl(30,60%,32%)]/40">
                <div className="w-4 h-4 rounded flex items-center justify-center text-[6px] font-bold" style={{ backgroundColor: provider.color + '15', color: provider.color }}>{provider.abbr}</div>
                {provider.name}
              </Link>}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-xl p-4 bg-card border border-border"><div className="text-xs mb-1 text-muted-foreground">Author</div><div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full flex items-center justify-center bg-[hsl(30,60%,32%)]/10"><span className="text-[7px] font-bold text-[hsl(30,60%,32%)]">H</span></div><span className="text-sm font-medium text-foreground">Heloix</span></div></div>
          <div className="rounded-xl p-4 bg-card border border-border"><div className="text-xs mb-1 text-muted-foreground">Last Updated</div><span className="text-sm font-medium text-foreground">{cm.date}</span></div>
          <div className="rounded-xl p-4 bg-card border border-border"><div className="text-xs mb-1 text-muted-foreground">Requirements</div><span className="text-lg font-bold text-[hsl(30,60%,32%)]">{cm.requirementsCount}</span></div>
          <div className="rounded-xl p-4 bg-card border border-border"><div className="text-xs mb-1 text-muted-foreground">Checks</div><span className="text-lg font-bold text-[hsl(30,60%,32%)]">{cm.checksCount}</span></div>
        </div>

        {/* Description */}
        <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <h3 className="text-sm font-semibold mb-2 text-foreground">Description</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{cm.description}</p>
        </div>

        {/* CLI */}
        <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2"><Terminal size={14} />Check your compliance status</h3>
          <div className="code-block flex items-center justify-between">
            <code className="text-xs">heloix {cm.provider} --compliance {cm.id}</code>
            <button onClick={() => navigator.clipboard.writeText(`heloix ${cm.provider} --compliance ${cm.id}`)} className="text-gray-400 hover:text-white transition-colors"><Copy size={14} /></button>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium mt-3 text-[hsl(30,60%,32%)] hover:underline">Run in Heloix Cloud</a>
        </div>

        {/* Requirements */}
        <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <h3 className="text-sm font-semibold mb-4 text-foreground">Requirements</h3>
          <div className="space-y-3">
            {sections.map((sec, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-[hsl(30,60%,32%)]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-[hsl(30,60%,32%)]" />
                  <span className="text-sm font-medium text-foreground">{i + 1} {sec.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[hsl(30,60%,32%)]/8 text-[hsl(30,60%,32%)]">{sec.reqs} Requirements</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">{sec.checks} Checks</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata */}
        <div className="rounded-xl p-6 bg-card border border-border">
          <h3 className="text-sm font-semibold mb-3 text-foreground">Compliance Metadata</h3>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(30,60%,32%)] hover:underline"><ExternalLink size={14} />View Source</a>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(30,60%,32%)] hover:underline"><FileText size={14} />Edit on GitHub</a>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Compliance ID:</span>
            <code className="text-xs text-[hsl(30,60%,32%)]">{cm.id}</code>
            <button onClick={() => navigator.clipboard.writeText(cm.id)} className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground"><Copy size={12} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDetailPage;
