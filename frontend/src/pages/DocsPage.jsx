import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, X, ExternalLink, AlignLeft } from 'lucide-react';
import DocsSidebar from '../components/DocsSidebar';
import DocsMarkdown from '../components/DocsMarkdown';
import { docsNav, allDocPages, getPageMeta } from '../data/docs-nav';

// ── Lazy section loader ───────────────────────────────────────────────────────
async function loadSection(sectionId) {
  switch (sectionId) {
    case 'getting-started': return (await import('../data/docs/getting-started')).default;
    case 'user-guide':      return (await import('../data/docs/user-guide')).default;
    case 'providers':       return (await import('../data/docs/providers')).default;
    case 'developer-guide': return (await import('../data/docs/developer-guide')).default;
    case 'reference':       return (await import('../data/docs/reference')).default;
    default:                return null;
  }
}

// ── Table of Contents extractor ───────────────────────────────────────────────
function extractToc(content) {
  if (!content) return [];
  const headings = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+)$/);
    if (m) {
      headings.push({
        level: m[1].length,
        text: m[2],
        slug: m[2].toLowerCase().replace(/[^\w]+/g, '-'),
      });
    }
  }
  return headings;
}

// ── Search across all sections ────────────────────────────────────────────────
function useSearch(query, allSectionData) {
  return useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    const results = [];
    for (const section of docsNav) {
      const sectionData = allSectionData[section.id];
      if (!sectionData) continue;
      for (const page of section.pages) {
        const data = sectionData[page.id];
        if (!data) continue;
        const titleMatch = page.title.toLowerCase().includes(q);
        const contentMatch = data.content.toLowerCase().includes(q);
        if (titleMatch || contentMatch) {
          // find excerpt
          let excerpt = '';
          if (contentMatch) {
            const idx = data.content.toLowerCase().indexOf(q);
            excerpt = data.content.slice(Math.max(0, idx - 40), idx + 100).replace(/#+\s/g, '').trim();
          }
          results.push({ section: section.id, sectionTitle: section.title, pageId: page.id, pageTitle: page.title, excerpt });
        }
      }
    }
    return results.slice(0, 10);
  }, [query, allSectionData]);
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DocsPage() {
  const { section = 'getting-started', pageId = 'introduction' } = useParams();
  const navigate = useNavigate();

  const [sectionData, setSectionData] = useState(null);
  const [allSectionData, setAllSectionData] = useState({});
  const [loading, setLoading]   = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen]   = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Load current section
  useEffect(() => {
    setLoading(true);
    loadSection(section).then(data => {
      setSectionData(data);
      setAllSectionData(prev => ({ ...prev, [section]: data }));
      setLoading(false);
    });
  }, [section]);

  // Eagerly prefetch remaining sections for search
  useEffect(() => {
    const remaining = docsNav.map(s => s.id).filter(id => id !== section);
    remaining.forEach(id => {
      loadSection(id).then(data => {
        setAllSectionData(prev => ({ ...prev, [id]: data }));
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close sidebar on route change
  useEffect(() => { setMobileSidebarOpen(false); }, [section, pageId]);

  const page = sectionData?.[pageId];
  const meta = getPageMeta(section, pageId);
  const toc  = extractToc(page?.content || '');
  const searchResults = useSearch(searchQuery, allSectionData);

  // Fallback: redirect to first page if pageId not found
  useEffect(() => {
    if (!loading && sectionData && !page) {
      const firstPage = docsNav.find(s => s.id === section)?.pages[0];
      if (firstPage) navigate(`/docs/${section}/${firstPage.id}`, { replace: true });
      else navigate('/docs/getting-started/introduction', { replace: true });
    }
  }, [loading, sectionData, page, section, pageId, navigate]);

  const sectionTitle = docsNav.find(s => s.id === section)?.title || '';

  return (
    <div className="flex min-h-[calc(100vh-56px)] bg-background">

      {/* ── Mobile sidebar overlay ─────────────────────────────────── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative z-10 h-full">
            <DocsSidebar className="h-full" />
          </div>
        </div>
      )}

      {/* ── Desktop sidebar ───────────────────────────────────────── */}
      <div className="hidden lg:flex lg:flex-col sticky top-14 h-[calc(100vh-56px)]">
        <DocsSidebar className="h-full" />
      </div>

      {/* ── Main content area ──────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Top bar: mobile menu + search */}
        <div className="sticky top-14 z-30 flex items-center justify-between px-6 py-3 border-b border-border bg-background/95 backdrop-blur lg:hidden">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <AlignLeft size={16} strokeWidth={2} />
            <span className="text-[11px] tracking-wider font-medium">{sectionTitle}</span>
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search size={15} />
          </button>
        </div>

        {/* Desktop search bar */}
        <div className="hidden lg:flex items-center justify-end px-8 py-3 border-b border-border/50">
          <div className="relative w-72">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search docs…"
              className="w-full pl-8 pr-8 py-1.5 text-[12px] bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[hsl(30,60%,42%)]/60 focus:ring-1 focus:ring-[hsl(30,60%,42%)]/20 transition-all"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setSearchOpen(false); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                <X size={11} />
              </button>
            )}
          </div>
        </div>

        {/* Search results dropdown */}
        {searchOpen && searchQuery.length >= 2 && (
          <div
            className="hidden lg:block absolute right-8 top-[86px] z-50 w-80 bg-background border border-border rounded-lg shadow-xl overflow-hidden"
            onMouseLeave={() => { if (!searchQuery) setSearchOpen(false); }}
          >
            {searchResults.length === 0 ? (
              <div className="px-4 py-6 text-center text-[12px] text-muted-foreground">No results for "{searchQuery}"</div>
            ) : (
              <>
                <div className="px-3 py-2 border-b border-border bg-secondary/50">
                  <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {searchResults.map((r, i) => (
                  <Link
                    key={i}
                    to={`/docs/${r.section}/${r.pageId}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="block px-4 py-3 border-b border-border/50 last:border-0 hover:bg-secondary/60 transition-colors"
                  >
                    <div className="text-[10px] tracking-wider text-muted-foreground/60 uppercase mb-0.5">{r.sectionTitle}</div>
                    <div className="text-[13px] font-medium text-foreground">{r.pageTitle}</div>
                    {r.excerpt && (
                      <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">…{r.excerpt}…</div>
                    )}
                  </Link>
                ))}
              </>
            )}
          </div>
        )}

        {/* Main scroll area */}
        <div className="flex-1 overflow-y-auto" onClick={() => searchOpen && setSearchOpen(false)}>
          <div className="max-w-3xl mx-auto px-8 py-10">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 mb-6 text-[11px] tracking-wider text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/docs/getting-started/introduction" className="hover:text-foreground transition-colors">DOCS</Link>
              <ChevronRight size={10} className="opacity-50" />
              <span className="uppercase text-muted-foreground/70">{sectionTitle}</span>
              {page && (
                <>
                  <ChevronRight size={10} className="opacity-50" />
                  <span className="text-foreground/80">{page.title}</span>
                </>
              )}
            </nav>

            {/* Content */}
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-secondary rounded w-2/3" />
                <div className="h-4 bg-secondary/70 rounded w-full" />
                <div className="h-4 bg-secondary/70 rounded w-5/6" />
                <div className="h-4 bg-secondary/70 rounded w-4/5" />
                <div className="h-32 bg-secondary/50 rounded mt-6" />
              </div>
            ) : page ? (
              <>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                  {page.title}
                </h1>
                <DocsMarkdown content={page.content} />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Page not found.</p>
                <Link to="/docs/getting-started/introduction" className="mt-4 inline-block text-[hsl(30,60%,42%)] text-sm underline">
                  Go to Introduction →
                </Link>
              </div>
            )}

            {/* Prev / Next navigation */}
            {meta && !loading && (
              <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
                {meta.prev ? (
                  <Link
                    to={`/docs/${meta.prev.section}/${meta.prev.id}`}
                    className="group flex items-center gap-3 flex-1 p-4 rounded-lg border border-border hover:border-[hsl(30,60%,32%)]/40 hover:bg-secondary/50 transition-all"
                  >
                    <ChevronLeft size={16} className="text-muted-foreground group-hover:text-[hsl(30,60%,42%)] transition-colors shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] tracking-wider uppercase text-muted-foreground mb-0.5">Previous</div>
                      <div className="text-[13px] font-medium text-foreground truncate">{meta.prev.title}</div>
                    </div>
                  </Link>
                ) : <div className="flex-1" />}

                {meta.next ? (
                  <Link
                    to={`/docs/${meta.next.section}/${meta.next.id}`}
                    className="group flex items-center gap-3 flex-1 p-4 rounded-lg border border-border hover:border-[hsl(30,60%,32%)]/40 hover:bg-secondary/50 transition-all text-right"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] tracking-wider uppercase text-muted-foreground mb-0.5">Next</div>
                      <div className="text-[13px] font-medium text-foreground truncate">{meta.next.title}</div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground group-hover:text-[hsl(30,60%,42%)] transition-colors shrink-0" />
                  </Link>
                ) : <div className="flex-1" />}
              </div>
            )}

            {/* Edit on GitHub */}
            {page && !loading && (
              <div className="mt-6 flex justify-center">
                <a
                  href={`https://github.com/raj-28/heloix-scribes/tree/main/frontend/src/data/docs/${section}.js`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] tracking-wider text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  <ExternalLink size={11} />
                  Edit this page on GitHub
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Right TOC (desktop only, 220px) ─────────────────────────── */}
      {toc.length > 1 && (
        <div className="hidden xl:block w-52 shrink-0 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto border-l border-border/60 px-5 py-10">
          <div className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground mb-4">On this page</div>
          <nav className="space-y-1">
            {toc.map((h, i) => (
              <a
                key={i}
                href={`#${h.slug}`}
                className={`block text-[12px] text-muted-foreground hover:text-foreground transition-colors leading-snug py-0.5 ${h.level === 1 ? '' : h.level === 2 ? 'pl-0' : 'pl-3'}`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
