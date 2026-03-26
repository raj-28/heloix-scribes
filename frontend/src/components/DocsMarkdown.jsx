/**
 * DocsMarkdown — lightweight markdown renderer for Heloix docs
 * Renders: headings, bold, inline code, code blocks, tables, lists, links, horizontal rules
 * Uses the scribe design tokens: tracking-wider typography, hsl(30,60%,32%) accent
 */
import React from 'react';

// ── Inline tokeniser ──────────────────────────────────────────────────────────
function parseInline(text) {
  if (!text) return null;
  const parts = [];
  // Regex: **bold**, `code`, [link](url)
  const pattern = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      // **bold**
      parts.push(<strong key={m.index} className="font-semibold text-foreground">{m[1]}</strong>);
    } else if (m[2] !== undefined) {
      // `inline code`
      parts.push(
        <code
          key={m.index}
          className="font-mono text-[0.83em] bg-secondary border border-border rounded px-1.5 py-0.5 text-[hsl(30,60%,42%)]"
        >
          {m[2]}
        </code>
      );
    } else if (m[3] !== undefined) {
      // [link](url)
      parts.push(
        <a
          key={m.index}
          href={m[4]}
          className="text-[hsl(30,60%,42%)] underline underline-offset-2 hover:no-underline transition-colors"
        >
          {m[3]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
}

// ── Block parser ──────────────────────────────────────────────────────────────
function parseBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === '') { i++; continue; }

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: 'code', lang, value: codeLines.join('\n') });
      continue;
    }

    // Headings
    const hMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (hMatch) {
      blocks.push({ type: 'heading', level: hMatch[1].length, value: hMatch[2] });
      i++; continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: 'hr' });
      i++; continue;
    }

    // Table (starts with |)
    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      // Parse header row, separator, body rows
      const rows = tableLines
        .filter(l => !/^\|[\s|:-]+\|$/.test(l.trim())) // skip separator rows
        .map(l => l.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim()));
      if (rows.length > 0) {
        blocks.push({ type: 'table', header: rows[0], rows: rows.slice(1) });
      }
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Paragraph
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') && !lines[i].startsWith('|') && !lines[i].startsWith('```') && !/^[-*]\s/.test(lines[i]) && !/^\d+\.\s/.test(lines[i]) && !/^---+$/.test(lines[i].trim())) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'para', value: paraLines.join(' ') });
    }
  }
  return blocks;
}

// ── Render ────────────────────────────────────────────────────────────────────
function renderBlock(block, idx) {
  switch (block.type) {

    case 'heading': {
      const slug = block.value.toLowerCase().replace(/[^\w]+/g, '-');
      const Tag = `h${block.level}`;
      const sizes = ['', 'text-2xl font-bold tracking-tight mt-10 mb-4', 'text-xl font-semibold tracking-tight mt-8 mb-3', 'text-base font-semibold tracking-wide mt-6 mb-2', 'text-sm font-semibold tracking-wider uppercase mt-5 mb-2'];
      return (
        <Tag key={idx} id={slug} className={`${sizes[block.level] || sizes[2]} text-foreground scroll-mt-20`}>
          {parseInline(block.value)}
        </Tag>
      );
    }

    case 'para':
      return (
        <p key={idx} className="text-[14px] leading-7 text-muted-foreground mb-4">
          {parseInline(block.value)}
        </p>
      );

    case 'code':
      return (
        <div key={idx} className="relative my-5 rounded-lg overflow-hidden border border-border bg-[hsl(0,0%,8%)]">
          {block.lang && (
            <div className="px-4 py-1.5 border-b border-border/60 bg-[hsl(0,0%,6%)]">
              <span className="text-[10px] tracking-widest font-mono text-muted-foreground uppercase">{block.lang}</span>
            </div>
          )}
          <pre className="overflow-x-auto p-4 text-[13px] font-mono text-[hsl(140,50%,68%)] leading-6 whitespace-pre">
            <code>{block.value}</code>
          </pre>
        </div>
      );

    case 'ul':
      return (
        <ul key={idx} className="my-4 space-y-1.5 pl-5 list-none">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-[14px] leading-6 text-muted-foreground">
              <span className="mt-2 w-1 h-1 rounded-full bg-[hsl(30,60%,42%)] shrink-0" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case 'ol':
      return (
        <ol key={idx} className="my-4 space-y-1.5 pl-2 list-none counter-reset-item">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-[14px] leading-6 text-muted-foreground">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[hsl(30,60%,32%)]/15 border border-[hsl(30,60%,32%)]/30 flex items-center justify-center text-[10px] font-bold text-[hsl(30,60%,42%)]">
                {j + 1}
              </span>
              <span className="mt-0.5">{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );

    case 'table':
      return (
        <div key={idx} className="my-5 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/70">
                {block.header.map((cell, j) => (
                  <th key={j} className="px-4 py-2.5 text-left text-[11px] tracking-wider font-semibold uppercase text-muted-foreground">
                    {parseInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr key={j} className={`border-b border-border/60 transition-colors ${j % 2 === 0 ? '' : 'bg-secondary/30'} hover:bg-secondary/60`}>
                  {row.map((cell, k) => (
                    <td key={k} className="px-4 py-2.5 text-muted-foreground leading-5">
                      {parseInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'hr':
      return <hr key={idx} className="my-8 border-border" />;

    default:
      return null;
  }
}

export default function DocsMarkdown({ content }) {
  if (!content) return null;
  const blocks = parseBlocks(content);
  return (
    <div className="docs-content max-w-none">
      {blocks.map((block, idx) => renderBlock(block, idx))}
    </div>
  );
}
