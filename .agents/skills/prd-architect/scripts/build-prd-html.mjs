#!/usr/bin/env node
/**
 * build-prd-html.mjs - Compile Markdown PRD sang bản HTML Single-Page tuyệt đẹp.
 * Sử dụng thuần Node.js không cần cài thêm npm packages bên ngoài.
 *
 * Cách dùng:
 *   node build-prd-html.mjs --input <path-to-prd.md> [--output <path-to-prd.html>]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf('--' + name);
  return i >= 0 ? argv[i + 1] : null;
};

const INPUT = flag('input');
let OUTPUT = flag('output');

if (!INPUT) {
  console.error('[-] Thiếu tham số: --input <path/to/file.md>');
  process.exit(1);
}

if (!fs.existsSync(INPUT)) {
  console.error(`[-] File không tồn tại: ${INPUT}`);
  process.exit(1);
}

if (!OUTPUT) {
  OUTPUT = INPUT.replace(/\.md$/i, '.html');
}

const templatePath = path.join(__dirname, '..', 'templates', 'prd-viewer-template.html');
if (!fs.existsSync(templatePath)) {
  console.error(`[-] Không tìm thấy template: ${templatePath}`);
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');
const mdContent = fs.readFileSync(INPUT, 'utf8');

// Slugify helper
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Simple Markdown parser
function parseMarkdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  const toc = [];
  let html = [];
  let docTitle = 'Product Requirements Document';
  
  let inCodeBlock = false;
  let codeLang = '';
  let codeBuffer = [];

  let inTable = false;
  let tableHeaderParsed = false;
  let tableRows = [];

  let inList = false;

  const flushTable = () => {
    if (!inTable) return;
    let tHtml = '<table>\n';
    tableRows.forEach((row, idx) => {
      if (idx === 0) {
        tHtml += '  <thead>\n    <tr>\n';
        row.forEach(cell => {
          tHtml += `      <th>${formatInline(cell)}</th>\n`;
        });
        tHtml += '    </tr>\n  </thead>\n  <tbody>\n';
      } else {
        tHtml += '    <tr>\n';
        row.forEach(cell => {
          tHtml += `      <td>${formatInline(cell)}</td>\n`;
        });
        tHtml += '    </tr>\n';
      }
    });
    tHtml += '  </tbody>\n</table>\n';
    html.push(tHtml);
    inTable = false;
    tableHeaderParsed = false;
    tableRows = [];
  };

  const flushList = () => {
    if (!inList) return;
    html.push('</ul>\n');
    inList = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith('```')) {
      if (inTable) flushTable();
      if (inList) flushList();

      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = trimmed.substring(3).trim().toLowerCase();
        codeBuffer = [];
        continue;
      } else {
        inCodeBlock = false;
        const codeText = escapeHtml(codeBuffer.join('\n'));
        if (codeLang === 'mermaid') {
          html.push(`<div class="mermaid-container">\n  <pre class="mermaid">\n${codeBuffer.join('\n')}\n  </pre>\n</div>\n`);
        } else {
          html.push(`<pre><code class="language-${codeLang}">${codeText}</code></pre>\n`);
        }
        continue;
      }
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Tables
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (inList) flushList();
      // Check if it's separator line |---|---|
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        tableHeaderParsed = true;
        continue;
      }
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map(c => c.trim());
      
      inTable = true;
      tableRows.push(cells);
      continue;
    } else {
      if (inTable) flushTable();
    }

    // Lists
    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList) {
        inList = true;
        html.push('<ul>\n');
      }
      const itemText = trimmed.replace(/^[-*]\s+/, '');
      html.push(`  <li>${formatInline(itemText)}</li>\n`);
      continue;
    } else {
      if (inList) flushList();
    }

    // Headings
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      docTitle = trimmed.substring(2).trim();
      const slug = slugify(docTitle);
      html.push(`<h1 id="${slug}">${formatInline(docTitle)}</h1>\n`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      const hText = trimmed.substring(3).trim();
      const slug = slugify(hText);
      toc.push({ level: 2, title: hText, slug });
      html.push(`<h2 id="${slug}">${formatInline(hText)}</h2>\n`);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      const hText = trimmed.substring(4).trim();
      const slug = slugify(hText);
      toc.push({ level: 3, title: hText, slug });
      html.push(`<h3 id="${slug}">${formatInline(hText)}</h3>\n`);
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}$/.test(trimmed)) {
      html.push('<hr style="margin: 32px 0; border: none; border-top: 1px solid var(--border-color);" />\n');
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith('> ')) {
      const bText = trimmed.substring(2).trim();
      html.push(`<blockquote>${formatInline(bText)}</blockquote>\n`);
      continue;
    }

    // Empty line
    if (trimmed === '') {
      continue;
    }

    // Standard paragraph
    html.push(`<p>${formatInline(trimmed)}</p>\n`);
  }

  if (inTable) flushTable();
  if (inList) flushList();

  return { htmlContent: html.join(''), toc, docTitle };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatInline(str) {
  return str
    // Images: ![alt](url)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Bold: **text**
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic: *text*
    .replace(/(^|[^\*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>')
    // Inline code: `code`
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

const { htmlContent, toc, docTitle } = parseMarkdownToHtml(mdContent);

// Build TOC HTML
const tocHtml = toc
  .map(item => {
    const cls = item.level === 3 ? 'toc-item level-3' : 'toc-item';
    return `<li class="${cls}"><a href="#${item.slug}">${item.title}</a></li>`;
  })
  .join('\n      ');

// Replace in template
const finalHtml = templateHtml
  .replace('{{TITLE}}', escapeHtml(docTitle))
  .replace('{{TOC_ITEMS}}', tocHtml)
  .replace('{{BODY_CONTENT}}', htmlContent);

// Ensure output directory exists
const outDir = path.dirname(OUTPUT);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(OUTPUT, finalHtml, 'utf8');
console.log(`[+] Đã xuất bản HTML PRD thành công: ${OUTPUT}`);
