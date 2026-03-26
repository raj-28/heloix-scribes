import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, BookOpen, Rocket, Book, Cloud, Code, Library } from 'lucide-react';
import { docsNav } from '../data/docs-nav';

const SECTION_ICONS = {
  'getting-started': Rocket,
  'user-guide': Book,
  'providers': Cloud,
  'developer-guide': Code,
  'reference': Library,
};

export default function DocsSidebar({ className = '' }) {
  const { section: activeSection, pageId: activePageId } = useParams();
  const [openSections, setOpenSections] = useState({});

  // Auto-expand the active section on mount / route change
  useEffect(() => {
    if (activeSection) {
      setOpenSections(prev => ({ ...prev, [activeSection]: true }));
    }
  }, [activeSection]);

  function toggle(sectionId) {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }

  return (
    <nav
      className={`w-64 shrink-0 border-r border-border bg-background overflow-y-auto ${className}`}
      aria-label="Documentation navigation"
    >
      {/* Sidebar header */}
      <div className="px-5 py-4 border-b border-border">
        <Link
          to="/docs/getting-started/introduction"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <BookOpen size={14} strokeWidth={2} />
          <span className="text-[11px] tracking-widest font-semibold uppercase">Documentation</span>
        </Link>
      </div>

      {/* Sections */}
      <div className="py-3">
        {docsNav.map(section => {
          const isOpen = openSections[section.id] ?? (section.id === activeSection);
          const Icon = SECTION_ICONS[section.id] || BookOpen;
          const isSectionActive = section.id === activeSection;

          return (
            <div key={section.id} className="mb-1">
              {/* Section toggle button */}
              <button
                onClick={() => toggle(section.id)}
                className={`w-full flex items-center justify-between px-5 py-2 text-left transition-colors group
                  ${isSectionActive
                    ? 'text-[hsl(30,60%,42%)] bg-[hsl(30,60%,32%)]/8'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={13} strokeWidth={2} className="shrink-0" />
                  <span className="text-[11px] tracking-wider font-semibold uppercase">
                    {section.title}
                  </span>
                </span>
                {isOpen
                  ? <ChevronDown size={12} strokeWidth={2.5} className="shrink-0 opacity-60" />
                  : <ChevronRight size={12} strokeWidth={2.5} className="shrink-0 opacity-40" />
                }
              </button>

              {/* Pages list */}
              {isOpen && (
                <div className="ml-5 border-l border-border/60 py-1">
                  {section.pages.map(page => {
                    const isActive = page.id === activePageId && section.id === activeSection;
                    return (
                      <Link
                        key={page.id}
                        to={`/docs/${section.id}/${page.id}`}
                        className={`block pl-4 pr-3 py-1.5 text-[12px] transition-colors leading-snug
                          ${isActive
                            ? 'text-[hsl(30,60%,42%)] font-semibold border-l-2 border-[hsl(30,60%,42%)] -ml-px'
                            : 'text-muted-foreground hover:text-foreground hover:border-l-2 hover:border-border hover:-ml-px'
                          }`}
                      >
                        {page.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer links */}
      <div className="px-5 py-4 border-t border-border mt-2">
        <a
          href="https://github.com/heloix-cloud/heloix"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span>GitHub Repository</span>
        </a>
      </div>
    </nav>
  );
}
