import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight, Search, Book, ExternalLink } from 'lucide-react';
import { docsNav, docsContent } from '../data/docs-content';

const DocsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDoc, setActiveDoc] = useState(searchParams.get('page') || 'introduction');
  const [expandedSections, setExpandedSections] = useState(['getting-started', 'user-guide', 'providers', 'developer-guide', 'reference']);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const page = searchParams.get('page');
    if (page && docsContent[page]) setActiveDoc(page);
  }, [searchParams]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId) ? prev.filter(s => s !== sectionId) : [...prev, sectionId]
    );
  };

  const navigateTo = (pageId) => {
    setActiveDoc(pageId);
    setSearchParams({ page: pageId });
    window.scrollTo(0, 0);
  };

  const content = docsContent[activeDoc];

  // Simple markdown-ish rendering
  const renderContent = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    const elements = [];
    let i = 0;
    let inCodeBlock = false;
    let codeLines = [];
    let codeLang = '';

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${i}`} className="code-block my-4 overflow-x-auto">
              <pre className="text-xs leading-relaxed"><code>{codeLines.join('\n')}</code></pre>
            </div>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLang = line.slice(3);
        }
        i++;
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        i++;
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-base font-semibold text-foreground mt-6 mb-2">{line.slice(4)}</h3>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-lg font-bold text-foreground mt-8 mb-3 font-display">{line.slice(3)}</h2>);
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-xl font-bold text-foreground mt-6 mb-3 font-display">{line.slice(2)}</h1>);
      } else if (line.startsWith('| ')) {
        // Table parsing
        const tableLines = [];
        let j = i;
        while (j < lines.length && lines[j].startsWith('|')) {
          tableLines.push(lines[j]);
          j++;
        }
        const headers = tableLines[0]?.split('|').filter(c => c.trim()).map(c => c.trim());
        const rows = tableLines.slice(2).map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));
        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs">
              <thead className="bg-secondary">
                <tr>{headers?.map((h, hi) => <th key={hi} className="px-3 py-2 text-left font-semibold text-foreground">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-border">
                    {row.map((cell, ci) => <td key={ci} className="px-3 py-2 text-muted-foreground">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        i = j;
        continue;
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(<li key={i} className="text-sm text-muted-foreground ml-4 list-disc">{renderInline(line.slice(2))}</li>);
      } else if (line.match(/^\d+\. /)) {
        elements.push(<li key={i} className="text-sm text-muted-foreground ml-4 list-decimal">{renderInline(line.replace(/^\d+\. /, ''))}</li>);
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="h-2" />);
      } else {
        elements.push(<p key={i} className="text-sm leading-relaxed text-muted-foreground">{renderInline(line)}</p>);
      }
      i++;
    }
    return elements;
  };

  const renderInline = (text) => {
    // Bold, inline code, links
    const parts = [];
    let remaining = text;
    let key = 0;
    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      const codeMatch = remaining.match(/`(.+?)`/);
      const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

      let firstMatch = null;
      let firstIndex = remaining.length;

      if (boldMatch && boldMatch.index < firstIndex) { firstMatch = 'bold'; firstIndex = boldMatch.index; }
      if (codeMatch && codeMatch.index < firstIndex) { firstMatch = 'code'; firstIndex = codeMatch.index; }
      if (linkMatch && linkMatch.index < firstIndex) { firstMatch = 'link'; firstIndex = linkMatch.index; }

      if (!firstMatch) {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }

      if (firstIndex > 0) parts.push(<span key={key++}>{remaining.slice(0, firstIndex)}</span>);

      if (firstMatch === 'bold') {
        parts.push(<strong key={key++} className="text-foreground font-semibold">{boldMatch[1]}</strong>);
        remaining = remaining.slice(firstIndex + boldMatch[0].length);
      } else if (firstMatch === 'code') {
        parts.push(<code key={key++} className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-xs font-mono">{codeMatch[1]}</code>);
        remaining = remaining.slice(firstIndex + codeMatch[0].length);
      } else if (firstMatch === 'link') {
        parts.push(<a key={key++} href={linkMatch[2]} className="text-[hsl(30,60%,32%)] hover:underline">{linkMatch[1]}</a>);
        remaining = remaining.slice(firstIndex + linkMatch[0].length);
      }
    }
    return parts;
  };

  // Search
  const filteredNav = searchQuery
    ? docsNav.map(section => ({
        ...section,
        children: section.children.filter(child =>
          child.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (docsContent[child.id]?.content || '').toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(section => section.children.length > 0)
    : docsNav;

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 shrink-0 sticky top-20 self-start max-h-[calc(100vh-120px)] overflow-y-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium mb-4 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={12} /> Back to Hub
            </Link>
            <h2 className="text-lg font-bold font-display text-foreground mb-4">Documentation</h2>

            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={13} />
              <input type="text" placeholder="Search docs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-8 pr-3 rounded-lg text-xs bg-card border border-border focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>

            <nav className="space-y-1">
              {filteredNav.map(section => (
                <div key={section.id}>
                  <button onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-foreground tracking-wide hover:bg-secondary rounded-md transition-colors">
                    {section.title}
                    {expandedSections.includes(section.id) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>
                  {expandedSections.includes(section.id) && (
                    <div className="ml-2 border-l border-border pl-2 space-y-0.5 mt-0.5">
                      {section.children.map(child => (
                        <button key={child.id} onClick={() => navigateTo(child.id)}
                          className={`w-full text-left px-2 py-1.5 rounded-md text-[11px] transition-all ${
                            activeDoc === child.id
                              ? 'bg-[hsl(30,60%,32%)]/10 text-[hsl(30,60%,32%)] font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                          }`}>
                          {child.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {content ? (
              <div className="rounded-xl p-8 bg-card border border-border">
                <h1 className="text-2xl font-bold font-display text-foreground mb-6">{content.title}</h1>
                <div className="docs-content">{renderContent(content.content)}</div>
              </div>
            ) : (
              <div className="rounded-xl p-8 bg-card border border-border text-center">
                <Book size={40} className="mx-auto text-muted-foreground mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">Page not found</h2>
                <p className="text-sm text-muted-foreground">Select a page from the sidebar.</p>
              </div>
            )}

            {/* Prev/Next navigation */}
            {content && (
              <div className="flex justify-between mt-6">
                {getPrevNext(activeDoc).prev ? (
                  <button onClick={() => navigateTo(getPrevNext(activeDoc).prev.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    ← {getPrevNext(activeDoc).prev.title}
                  </button>
                ) : <div />}
                {getPrevNext(activeDoc).next ? (
                  <button onClick={() => navigateTo(getPrevNext(activeDoc).next.id)}
                    className="text-sm text-[hsl(30,60%,32%)] hover:underline">
                    {getPrevNext(activeDoc).next.title} →
                  </button>
                ) : <div />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function getPrevNext(activeId) {
  const allPages = docsNav.flatMap(s => s.children);
  const idx = allPages.findIndex(p => p.id === activeId);
  return {
    prev: idx > 0 ? allPages[idx - 1] : null,
    next: idx < allPages.length - 1 ? allPages[idx + 1] : null,
  };
}

export default DocsPage;
