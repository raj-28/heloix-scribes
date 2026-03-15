import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { checks, providers, getProviderById } from '../data/mock';

const PIcon = ({ provider, selected }) => (
  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[8px] shrink-0 border transition-all ${selected ? 'shadow-sm' : ''}`}
    style={{ backgroundColor: selected ? provider.color + '20' : provider.color + '08', color: provider.color, borderColor: selected ? provider.color : provider.color + '20' }}>{provider.abbr}</div>
);

const SevBadge = ({ severity }) => {
  const m = { critical:'bg-red-50 text-red-700 border-red-200', high:'bg-orange-50 text-orange-700 border-orange-200', medium:'bg-amber-50 text-amber-700 border-amber-200', low:'bg-blue-50 text-blue-700 border-blue-200' };
  return <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${m[severity]||m.medium}`}>{severity}</span>;
};

const ChecksPage = () => {
  const [selectedProvider, setSelectedProvider] = useState('aws');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [showPerPage, setShowPerPage] = useState(20);

  const filtered = useMemo(() => checks.filter(c =>
    c.provider === selectedProvider &&
    (searchQuery === '' || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.service.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedSeverity === 'all' || c.severity === selectedSeverity)
  ), [selectedProvider, searchQuery, selectedSeverity]);

  const sp = getProviderById(selectedProvider);

  // Calculate check counts per provider
  const providerCounts = useMemo(() => {
    const counts = {};
    checks.forEach(c => { counts[c.provider] = (counts[c.provider] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/compliance" className="flex items-center gap-2 text-sm font-medium text-[hsl(30,60%,32%)] hover:underline">Go to Compliances <ArrowRight size={14} /></Link>
        </div>
        <div className="flex gap-8">
          <aside className="w-60 shrink-0">
            <h2 className="text-lg font-semibold mb-4 font-display text-foreground">Detection Checks</h2>
            <div className="space-y-0.5 mb-6">
              {providers.map(p => (
                <button key={p.id} onClick={() => setSelectedProvider(p.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${selectedProvider === p.id ? 'bg-card border border-border shadow-sm' : 'hover:bg-secondary border border-transparent'}`}>
                  <PIcon provider={p} selected={selectedProvider === p.id} />
                  <span className={`text-sm font-medium ${selectedProvider === p.id ? 'text-foreground' : 'text-muted-foreground'}`}>{p.name}</span>
                  {providerCounts[p.id] && <span className="text-[10px] text-muted-foreground ml-auto">({providerCounts[p.id]})</span>}
                </button>
              ))}
            </div>
            <div className="mb-6">
              <h3 className="text-[11px] font-semibold tracking-wider mb-2 text-muted-foreground">SEVERITY</h3>
              <div className="space-y-0.5">
                {['all','critical','high','medium','low'].map(s => (
                  <button key={s} onClick={() => setSelectedSeverity(s)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all ${selectedSeverity === s ? 'bg-card border border-border shadow-sm text-foreground' : 'text-muted-foreground hover:bg-secondary border border-transparent'}`}>
                    {s === 'all' ? 'All Severities' : s}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input type="text" placeholder="Search checks..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 rounded-lg text-sm bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Show:</span>
                <select value={showPerPage} onChange={e => setShowPerPage(Number(e.target.value))}
                  className="py-2 px-3 rounded-lg text-sm bg-card border border-border focus:outline-none">
                  <option value={10}>10</option><option value={20}>20</option><option value={50}>50</option>
                </select>
              </div>
            </div>
            {sp && <div className="flex items-center gap-3 mb-6"><PIcon provider={sp} selected /><h2 className="text-lg font-semibold text-foreground">{sp.name}</h2></div>}
            <h3 className="text-base font-semibold mb-4 font-display text-foreground">Detection Checks</h3>
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="py-16 text-center rounded-xl bg-card border border-border"><p className="text-sm text-muted-foreground">No checks found for this provider.</p></div>
              ) : filtered.slice(0, showPerPage).map(ck => (
                <Link key={ck.id} to={`/check/${ck.id}`} className="block rounded-xl p-5 bg-card border border-border card-hover group">
                  <div className="flex items-start gap-4">
                    <PIcon provider={getProviderById(ck.provider)} selected={false} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold leading-snug mb-2 text-foreground group-hover:text-[hsl(30,60%,32%)] transition-colors">{ck.title}</h4>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-secondary text-foreground border border-border">{ck.service}</span>
                        <SevBadge severity={ck.severity} />
                      </div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[hsl(30,60%,32%)]/10"><span className="text-[7px] font-bold text-[hsl(30,60%,32%)]">H</span></div>
                        <span className="text-[11px] text-muted-foreground">by Heloix</span>
                      </div>
                      {ck.tags?.length > 0 && <div className="flex flex-wrap gap-1.5 mb-2">{ck.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{t}</span>)}</div>}
                      <p className="text-xs leading-relaxed line-clamp-2 text-muted-foreground">{ck.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {filtered.length > 0 && <div className="mt-6 text-center"><span className="text-xs text-muted-foreground">Showing {Math.min(showPerPage, filtered.length)} of {filtered.length} checks</span></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecksPage;
