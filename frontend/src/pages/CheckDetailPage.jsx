import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Copy, Shield, Terminal, FileCode, Settings } from 'lucide-react';
import { getCheckById, getProviderById } from '../data/mock';

const CheckDetailPage = () => {
  const { checkId } = useParams();
  const check = getCheckById(checkId);
  const provider = check ? getProviderById(check.provider) : null;

  if (!check) return (
    <div className="min-h-screen flex items-center justify-center"><div className="text-center">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Check not found</h2>
      <Link to="/check" className="text-sm font-medium text-[hsl(30,60%,32%)]">Back to Checks</Link>
    </div></div>
  );

  const sevM = { critical:'bg-red-50 text-red-700 border-red-200', high:'bg-orange-50 text-orange-700 border-orange-200', medium:'bg-amber-50 text-amber-700 border-amber-200', low:'bg-blue-50 text-blue-700 border-blue-200' };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        <Link to="/check" className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /> Go back</Link>

        {/* Header card */}
        <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <div className="flex items-start gap-4">
            {provider && <div className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border" style={{ backgroundColor: provider.color + '12', color: provider.color, borderColor: provider.color + '30' }}>{provider.abbr}</div>}
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1 text-foreground font-display">{check.title}</h1>
              <code className="text-xs text-muted-foreground">{check.id}</code>
              <div className="flex items-center gap-3 flex-wrap mt-3">
                <span className={`text-xs px-2.5 py-1 rounded border ${sevM[check.severity]||sevM.medium}`}>Severity: {check.severity}</span>
                <span className="text-xs px-2.5 py-1 rounded bg-secondary text-foreground border border-border">Service: {check.service}</span>
                {provider && <Link to={`/check?provider=${provider.id}`} className="text-xs px-2.5 py-1 rounded bg-secondary text-foreground border border-border hover:border-[hsl(30,60%,32%)]/40">{provider.name}</Link>}
              </div>
            </div>
          </div>
        </div>

        {/* Author & meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl p-4 bg-card border border-border">
            <div className="text-xs mb-1 text-muted-foreground">Author</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full flex items-center justify-center bg-[hsl(30,60%,32%)]/10"><span className="text-[7px] font-bold text-[hsl(30,60%,32%)]">H</span></div><span className="text-sm font-medium text-foreground">Heloix</span></div>
          </div>
          <div className="rounded-xl p-4 bg-card border border-border">
            <div className="text-xs mb-1 text-muted-foreground">Resource Type</div>
            <span className="text-sm font-medium text-foreground">{check.resourceType || 'N/A'}</span>
          </div>
          <div className="rounded-xl p-4 bg-card border border-border">
            <div className="text-xs mb-1 text-muted-foreground">Tags</div>
            <div className="flex flex-wrap gap-1">{(check.tags||[]).map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{t}</span>)}</div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <p className="text-sm leading-relaxed text-foreground">{check.description}</p>
        </div>

        {/* Risk */}
        {check.risk && <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <h3 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2"><Shield size={14} className="text-red-500" />Risk</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{check.risk}</p>
        </div>}

        {/* CLI command */}
        <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2"><Terminal size={14} />Run this check with Heloix CLI</h3>
          <div className="code-block flex items-center justify-between">
            <code className="text-xs">heloix {check.provider} --checks {check.id}</code>
            <button onClick={() => navigator.clipboard.writeText(`heloix ${check.provider} --checks ${check.id}`)} className="text-gray-400 hover:text-white transition-colors"><Copy size={14} /></button>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium mt-3 text-[hsl(30,60%,32%)] hover:underline">Run in Heloix Cloud</a>
        </div>

        {/* Recommendation */}
        {check.recommendation && <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <h3 className="text-sm font-semibold mb-2 text-foreground">Recommendation</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{check.recommendation}</p>
        </div>}

        {/* Remediation */}
        <div className="rounded-xl p-6 mb-6 bg-card border border-border">
          <h3 className="text-sm font-semibold mb-4 text-foreground flex items-center gap-2"><Settings size={14} />Remediation</h3>
          {check.remediation_cli && <div className="mb-4"><h4 className="text-xs font-semibold mb-2 text-muted-foreground flex items-center gap-1"><Terminal size={12} />CLI</h4><div className="code-block"><code className="text-xs whitespace-pre-wrap">{check.remediation_cli}</code></div></div>}
          {check.remediation_iac && <div className="mb-4"><h4 className="text-xs font-semibold mb-2 text-muted-foreground flex items-center gap-1"><FileCode size={12} />Native IaC</h4><div className="code-block"><code className="text-xs whitespace-pre-wrap">{check.remediation_iac}</code></div></div>}
          {check.remediation_terraform && <div className="mb-4"><h4 className="text-xs font-semibold mb-2 text-muted-foreground flex items-center gap-1"><FileCode size={12} />Terraform</h4><div className="code-block"><code className="text-xs whitespace-pre-wrap">{check.remediation_terraform}</code></div></div>}
          {check.remediation_manual && <div className="mb-4"><h4 className="text-xs font-semibold mb-2 text-muted-foreground">Console Steps</h4><p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{check.remediation_manual}</p></div>}
        </div>

        {/* References */}
        {check.references?.length > 0 && <div className="rounded-xl p-6 bg-card border border-border">
          <h3 className="text-sm font-semibold mb-3 text-foreground">References</h3>
          <ul className="space-y-2">{check.references.map((r, i) => <li key={i}><a href={r} target="_blank" rel="noopener noreferrer" className="text-sm text-[hsl(30,60%,32%)] hover:underline break-all flex items-center gap-1"><ExternalLink size={12} />{r}</a></li>)}</ul>
        </div>}
      </div>
    </div>
  );
};

export default CheckDetailPage;
