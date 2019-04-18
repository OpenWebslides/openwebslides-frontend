// @flow

/* eslint-disable flowtype/require-types-at-top */
/**
 * Describes properties for editing contentItems
 */

// Markdown ----------------------------------------------------------------------------------------

const STRONG: 'contentItems/markdownTypes/STRONG' = 'contentItems/markdownTypes/STRONG';
const EMPHASIS: 'contentItems/markdownTypes/EMPHASIS' = 'contentItems/markdownTypes/EMPHASIS';
const CODE: 'contentItems/markdownTypes/CODE' = 'contentItems/markdownTypes/CODE';
const STRIKETHROUGH: 'contentItems/markdownTypes/STRIKETHROUGH' = 'contentItems/markdownTypes/STRIKETHROUGH';
const LINK: 'contentItems/markdownTypes/LINK' = 'contentItems/markdownTypes/LINK';

const markdownTypes = {
  STRONG,
  EMPHASIS,
  CODE,
  STRIKETHROUGH,
  LINK,
};

type MarkdownType = $Values<typeof markdownTypes>;

export { markdownTypes };
export type { MarkdownType };
