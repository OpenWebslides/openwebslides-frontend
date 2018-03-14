// @flow
/* eslint-disable no-unused-vars */

import * as model from './model';

const rootContentItem: $Exact<model.RootContentItem> = {
  id: 'g2bmuvvyux',
  type: model.contentItemTypes.ROOT,
  childItemIds: [],
};

const headingContentItem: $Exact<model.HeadingContentItem> = {
  id: '5nbknerhtd',
  type: model.contentItemTypes.HEADING,
  text: 'This is a heading!!!',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
};

const paragraphContentItem: $Exact<model.ParagraphContentItem> = {
  id: 'f0clvd9l27',
  type: model.contentItemTypes.PARAGRAPH,
  text: 'Lorem **ipsum** dolor sit amet, [consectetur](https://www.lipsum.com) adipiscing elit.',
  metadata: {
    tags: [],
    visibilityOverrides: {
      // This paragraph is always visible in the course, no matter its length / nesting level.
      course: model.visibilityTypes.VISIBLE,
    },
  },
  subItemIds: [],
};

const listContentItem: $Exact<model.ListContentItem> = {
  id: 'g09fzfwsnp',
  type: model.contentItemTypes.LIST,
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  childItemIds: [],
  ordered: false,
};

const listItemContentItem: $Exact<model.ListItemContentItem> = {
  id: 'dnwy65sy7q',
  type: model.contentItemTypes.LIST_ITEM,
  text: 'This is a list item.',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
};

const blockquoteContentItem: $Exact<model.BlockquoteContentItem> = {
  id: 'nqak0qx8qu',
  type: model.contentItemTypes.BLOCKQUOTE,
  text: 'Do. Or do not. There is no try.',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  cite: 'Yoda',
  href: 'http://www.starwars.com/news/the-starwars-com-10-best-yoda-quotes',
};

const codeContentItem: $Exact<model.CodeContentItem> = {
  id: 'wiwj9xqnf3',
  type: model.contentItemTypes.CODE,
  text: 'console.log("Hello world!");',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  language: 'JavaScript',
};

const imageContentItem: $Exact<model.ImageContentItem> = {
  id: 'lvlhptz3fy',
  type: model.contentItemTypes.IMAGE,
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  src: 'https://lumiere-a.akamaihd.net/v1/images/Yoda-Retina_2a7ecc26.jpeg',
  alt: 'Yoda looking Yoda-ish.',
  caption: 'Legendary Jedi Master',
};

const videoContentItem: $Exact<model.VideoContentItem> = {
  id: 'h7oys468au',
  type: model.contentItemTypes.VIDEO,
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  src: 'https://youtu.be/BQ4yd2W50No',
  alt: 'Yoda doing Yoda things.',
  caption: 'Legendary Jedi Master teaching Luke.',
};

const audioContentItem: $Exact<model.AudioContentItem> = {
  id: 'ktnmk0b1qh',
  type: model.contentItemTypes.AUDIO,
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  src: 'http://pretend-i-found-a-yoda-audio-fragment.com/example.mp3',
  alt: 'Yoda saying Yoda things.',
  caption: null, // Caption may be NULL.
};

const iframeContentItem: $Exact<model.IframeContentItem> = {
  id: 'xo346zqvng',
  type: model.contentItemTypes.IFRAME,
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  src: 'http://www.starwars.com/databank/yoda',
  alt: 'Yoda entry in the Star Wars databank.',
  caption: null,
};

const slideBreakContentItem: $Exact<model.SlideBreakContentItem> = {
  id: 'c3g2c30a0u',
  type: model.contentItemTypes.SLIDE_BREAK,
};

const courseBreakContentItem: $Exact<model.CourseBreakContentItem> = {
  id: 'c3g2c30a0u',
  type: model.contentItemTypes.COURSE_BREAK,
};
