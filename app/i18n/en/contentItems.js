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
  contentItemForType: {
    'contentItemTypes/HEADING': 'Heading',
    'contentItemTypes/PARAGRAPH': 'Paragraph',
    'contentItemTypes/LIST': 'List',
    'contentItemTypes/BLOCKQUOTE': 'Quote',
    'contentItemTypes/CODE': 'Code fragment',
    'contentItemTypes/IMAGE': 'Image',
    'contentItemTypes/VIDEO': 'Video',
    'contentItemTypes/AUDIO': 'Audio',
    'contentItemTypes/IFRAME': 'Embed website',
    'contentItemTypes/SLIDE_BREAK': 'Slide break',
    'contentItemTypes/COURSE_BREAK': 'Course break',
  },
};

export default contentItems;
