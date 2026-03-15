import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Github } from 'lucide-react';
import { checks, complianceFrameworks, complianceIcons, totalArtifacts, getProviderById } from '../data/mock';

const ProviderBadge = ({ providerId, size = 'md' }) => {
  const p = getProviderById(providerId);
  if (!p) return null;
  const s = size === 'sm' ? 'w-7 h-7 text-[8px]' : 'w-9 h-9 text-[10px]';
  return <div className={`${s} rounded-lg flex items-center justify-center font-bold shrink-0 border`} style={{ backgroundColor: p.color + '12', color: p.color, borderColor: p.color + '30' }}>{p.abbr}</div>;
};

const CIcon = ({ iconType, size = 'md' }) => {
  const ic = complianceIcons[iconType] || complianceIcons.default;
  const s = size === 'sm' ? 'w-7 h-7 text-[8px]' : 'w-9 h-9 text-[10px]';
  return <div className={`${s} rounded-lg flex items-center justify-center font-bold shrink-0 border`} style={{ backgroundColor: ic.color + '12', color: ic.color, borderColor: ic.color + '30' }}>{ic.abbr}</div>;
};

const SevBadge = ({ severity }) => {
  const m = { critical:'bg-red-50 text-red-700 border-red-200', high:'bg-orange-50 text-orange-700 border-orange-200', medium:'bg-amber-50 text-amber-700 border-amber-200', low:'bg-blue-50 text-blue-700 border-blue-200' };
  return <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${m[severity] || m.medium}`}>{severity}</span>;
};

const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let s = 0; const d = 2000; const inc = target / (d / 16);
    const t = setInterval(() => { s += inc; if (s >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [target]);
  return <span>{count}+</span>;
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const cotd = checks[2];
  const popularChecks = [checks[0], checks[1]];
  const popularCompliances = [
    complianceFrameworks.find(c => c.id === 'cis_4.0_aws'),
    complianceFrameworks.find(c => c.id === 'pci_4.0_azure'),
    complianceFrameworks.find(c => c.id === 'cis_3.0_gcp'),
    complianceFrameworks.find(c => c.id === 'cis_1.10_kubernetes'),
  ].filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 to-transparent" />
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-10 font-display animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-3 py-1 rounded-lg bg-[hsl(30,60%,32%)] text-white mr-3">Find</span>
            <span className="text-foreground">Heloix Artifacts</span>
          </h1>
          <div className="max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input type="text" placeholder="Search artifacts ..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full py-3.5 pl-12 pr-4 rounded-xl text-sm bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring shadow-sm" />
            </div>
          </div>
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <span className="text-5xl md:text-6xl font-bold text-foreground font-display"><AnimatedCounter target={totalArtifacts} /></span>
            <span className="text-lg ml-3 text-muted-foreground">artifacts</span>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/check" className="px-6 py-3 rounded-xl text-sm font-medium border-2 border-[hsl(30,60%,32%)] text-[hsl(30,60%,32%)] hover:bg-[hsl(30,60%,32%)] hover:text-white transition-all duration-300">
              Browse Detection & Remediation Checks
            </Link>
            <Link to="/compliance" className="px-6 py-3 rounded-xl text-sm font-medium border-2 border-[hsl(30,60%,32%)] text-[hsl(30,60%,32%)] hover:bg-[hsl(30,60%,32%)] hover:text-white transition-all duration-300">
              Browse Security Compliance Frameworks
            </Link>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Heloix is an Open Source Project</h2>
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-foreground text-background hover:opacity-90 transition-all">
                <Github size={16} /> GitHub
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#4A154B] text-white hover:opacity-90 transition-all">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5 2a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm-4 4a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm8 0a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm-4 4a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3z"/></svg>
                Slack
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Check of the Day */}
      <section className="py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-foreground font-display">Check of the Day</h3>
          <div className="max-w-2xl">
            <Link to={`/check/${cotd.id}`} className="block rounded-xl p-5 bg-card border border-border card-hover group" style={{ borderLeft: '3px solid hsl(30,60%,32%)' }}>
              <div className="text-[11px] mb-3 text-muted-foreground">March 15, 2026</div>
              <div className="flex items-start gap-4">
                <ProviderBadge providerId={cotd.provider} />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold mb-2 text-foreground group-hover:text-[hsl(30,60%,32%)] transition-colors">{cotd.title}</h4>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-secondary text-foreground border border-border">{cotd.service}</span>
                    <SevBadge severity={cotd.severity} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[hsl(30,60%,32%)]/10"><span className="text-[7px] font-bold text-[hsl(30,60%,32%)]">H</span></div>
                    <span className="text-[11px] text-muted-foreground">by Heloix</span>
                  </div>
                  <p className="text-xs mt-3 leading-relaxed text-muted-foreground">{cotd.description}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Checks */}
      <section className="py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-foreground font-display">Popular Checks</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {popularChecks.map(ck => (
              <Link key={ck.id} to={`/check/${ck.id}`} className="block rounded-xl p-5 bg-card border border-border card-hover group">
                <div className="flex items-start gap-4">
                  <ProviderBadge providerId={ck.provider} />
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
                    <p className="text-xs leading-relaxed line-clamp-3 text-muted-foreground">{ck.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Compliances */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-foreground font-display">Popular Compliances</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {popularCompliances.map(cm => (
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
        </div>
      </section>
    </div>
  );
};

export default HomePage;
