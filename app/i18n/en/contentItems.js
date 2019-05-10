// @flow

const contentItems = {
  contentItem: 'content item',
  markdown: {
    strong: 'Strong (Ctrl+B)',
    emphasis: 'Emphasis (Ctrl+I)',
    code: 'Inline code fragment',
    strikethrough: 'Strikethrough',
    link: 'Hyperlink (Ctrl+K)',
  },
  structure: {
    indent: 'Indent',
    unindent: 'Unindent',
  },
  hiddenForType: {
    'contentItemTypes/PARAGRAPH': 'Paragraph hidden',
    'contentItemTypes/HEADING': 'Heading hidden',
  },
};

export default contentItems;
