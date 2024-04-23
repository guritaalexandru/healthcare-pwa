import {remark} from 'remark';
import html from 'remark-html';
import slug from 'remark-slug'; // Import remark-slug to generate IDs

import {visit} from 'unist-util-visit';

function markdownToHtml(markdown) {
  const processedContent = remark()
      .use(html)
      .use(slug)
      .processSync(markdown);
  return processedContent.toString();
}

function extractHeadersWithAnchors(markdownString) {
  const headers = [];
  remark().use(() => (tree) => {
    visit(tree, 'heading', (node) => {
      const headerText = node.children.map((child) => child.value).join('');
      const anchor = headerText.toLowerCase().replace(/\s+/g, '-');
      headers.push({
        level: node.depth,
        text: headerText,
        anchor: `#${anchor}`,
      });
    });
  }).processSync(markdownString);

  return headers;
}

function generateTocWithAnchors(headers) {
  const toc = headers.map((header) => {
    const indentation = '  '.repeat(header.level - 1);
    return `${indentation}- [${header.text}](${header.anchor})`;
  });

  return toc.join('\n');
}


export {
  markdownToHtml,
  extractHeadersWithAnchors,
  generateTocWithAnchors,
};