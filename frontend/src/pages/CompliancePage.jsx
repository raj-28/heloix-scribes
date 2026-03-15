import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { complianceFrameworks, providers, getProviderById, complianceIcons } from '../data/mock';

const PIcon = ({ provider, selected }) => (
  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[8px] shrink-0 border transition-all ${selected ? 'shadow-sm' : ''}`}
    style={{ backgroundColor: selected ? provider.color + '20' : provider.color + '08', color: provider.color, borderColor: selected ? provider.color : provider.color + '20' }}>{provider.abbr}</div>
);

const CIcon = ({ iconType }) => {
  const ic = complianceIcons[iconType] || complianceIcons.default;
  return <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 border" style={{ backgroundColor: ic.color + '12', color: ic.color, borderColor: ic.color + '30' }}>{ic.abbr}</div>;
};

const CompliancePage = () => {
  const [selectedProvider, setSelectedProvider] = useState('aws');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => complianceFrameworks.filter(c =>
    c.provider === selectedProvider &&
    (searchQuery === '' || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  ), [selectedProvider, searchQuery]);

  const sp = getProviderById(selectedProvider);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/check" className="flex items-center gap-2 text-sm font-medium text-[hsl(30,60%,32%)] hover:underline">Go to Checks <ArrowRight size={14} /></Link>
        </div>
        <div className="flex gap-8">
          <aside className="w-60 shrink-0">
            <h2 className="text-lg font-semibold mb-4 font-display text-foreground">Compliance Frameworks</h2>
            <div className="space-y-0.5 mb-6">
              {providers.map(p => (
                <button key={p.id} onClick={() => setSelectedProvider(p.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${selectedProvider === p.id ? 'bg-card border border-border shadow-sm' : 'hover:bg-secondary border border-transparent'}`}>
                  <PIcon provider={p} selected={selectedProvider === p.id} />
                  <span className={`text-sm font-medium ${selectedProvider === p.id ? 'text-foreground' : 'text-muted-foreground'}`}>{p.name}</span>
                </button>
              ))}
            </div>
          </aside>
          <div className="flex-1">
            <div className="mb-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input type="text" placeholder="Search compliance frameworks..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 rounded-lg text-sm bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            {/* Provider icon row */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {providers.map(p => (
                <button key={p.id} onClick={() => setSelectedProvider(p.id)} className="shrink-0" title={p.name}>
                  <PIcon provider={p} selected={selectedProvider === p.id} />
                </button>
              ))}
            </div>
            {sp && <div className="flex items-center gap-3 mb-6"><PIcon provider={sp} selected /><h2 className="text-lg font-semibold text-foreground">{sp.name}</h2></div>}
            <h3 className="text-base font-semibold mb-4 font-display text-foreground">Compliance Frameworks</h3>
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="py-16 text-center rounded-xl bg-card border border-border"><p className="text-sm text-muted-foreground">No compliance frameworks found for this provider.</p></div>
              ) : filtered.map(cm => (
                <Link key={cm.id} to={`/compliance/${cm.id}`} className="block rounded-xl p-5 bg-card border border-border card-hover group">
                  <div className="flex items-start gap-4">
                    <CIcon iconType={cm.icon} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-sm font-semibold leading-snug text-foreground group-hover:text-[hsl(30,60%,32%)] transition-colors">
                          {cm.title}
                          {cm.version && <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[hsl(30,60%,32%)]/10 text-[hsl(30,60%,32%)]">{cm.version}</span>}
                        </h4>
                        <span className="text-[11px] shrink-0 text-muted-foreground">{cm.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[hsl(30,60%,32%)]/10"><span className="text-[7px] font-bold text-[hsl(30,60%,32%)]">H</span></div>
                        <span className="text-[11px] text-muted-foreground">by Heloix</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[11px] px-2.5 py-1 rounded bg-[hsl(30,60%,32%)]/8 text-[hsl(30,60%,32%)] border border-[hsl(30,60%,32%)]/20">{cm.requirementsCount} Requirements</span>
                        <span className="text-[11px] px-2.5 py-1 rounded bg-[hsl(30,60%,32%)]/8 text-[hsl(30,60%,32%)] border border-[hsl(30,60%,32%)]/20">{cm.checksCount} Checks</span>
                      </div>
                      <p className="text-xs leading-relaxed line-clamp-3 text-muted-foreground">{cm.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {filtered.length > 0 && <div className="mt-6 text-center"><span className="text-xs text-muted-foreground">Showing {filtered.length} compliance frameworks</span></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
