// @flow

import * as model from '../../model';

export const emptyMetadata = {
  tags: [],
  visibilityOverrides: {},
};

export const rootContentItem: $Exact<model.RootContentItem> = {
  id: 'g2bmuvvyux',
  type: model.contentItemTypes.ROOT,
  isEditing: false,
  childItemIds: [],
};

export const headingContentItem: $Exact<model.HeadingContentItem> = {
  id: '5nbknerhtd',
  type: model.contentItemTypes.HEADING,
  isEditing: false,
  text: 'This is a heading!!!',
  metadata: emptyMetadata,
  subItemIds: [],
};

export const paragraphContentItem: $Exact<model.ParagraphContentItem> = {
  id: 'f0clvd9l27',
  type: model.contentItemTypes.PARAGRAPH,
  isEditing: false,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  metadata: emptyMetadata,
  subItemIds: [],
};

export const listContentItem: $Exact<model.ListContentItem> = {
  id: 'g09fzfwsnp',
  type: model.contentItemTypes.LIST,
  isEditing: false,
  metadata: emptyMetadata,
  subItemIds: [],
  childItemIds: [],
  ordered: false,
};

export const listItemContentItem: $Exact<model.ListItemContentItem> = {
  id: 'dnwy65sy7q',
  type: model.contentItemTypes.LIST_ITEM,
  isEditing: false,
  text: 'This is a list item.',
  metadata: emptyMetadata,
};

export const blockquoteContentItem: $Exact<model.BlockquoteContentItem> = {
  id: 'nqak0qx8qu',
  type: model.contentItemTypes.BLOCKQUOTE,
  isEditing: false,
  text: 'Do. Or do not. There is no try.',
  metadata: emptyMetadata,
  subItemIds: [],
  cite: 'Yoda',
  href: 'http://www.starwars.com/news/the-starwars-com-10-best-yoda-quotes',
};

export const codeContentItem: $Exact<model.CodeContentItem> = {
  id: 'wiwj9xqnf3',
  type: model.contentItemTypes.CODE,
  isEditing: false,
  text: 'console.log("Hello world!");',
  metadata: emptyMetadata,
  subItemIds: [],
  language: 'JavaScript',
};

export const imageContentItem: $Exact<model.ImageContentItem> = {
  id: 'lvlhptz3fy',
  type: model.contentItemTypes.IMAGE,
  isEditing: false,
  metadata: emptyMetadata,
  subItemIds: [],
  src: 'https://lumiere-a.akamaihd.net/v1/images/Yoda-Retina_2a7ecc26.jpeg',
  alt: 'Yoda looking Yoda-ish.',
  caption: 'Legendary Jedi Master',
};

export const videoContentItem: $Exact<model.VideoContentItem> = {
  id: 'h7oys468au',
  type: model.contentItemTypes.VIDEO,
  isEditing: false,
  metadata: emptyMetadata,
  subItemIds: [],
  src: 'https://youtu.be/BQ4yd2W50No',
  alt: 'Yoda doing Yoda things.',
  caption: 'Legendary Jedi Master teaching Luke.',
};

export const audioContentItem: $Exact<model.AudioContentItem> = {
  id: 'ktnmk0b1qh',
  type: model.contentItemTypes.AUDIO,
  isEditing: false,
  metadata: emptyMetadata,
  subItemIds: [],
  src: 'http://pretend-i-found-a-yoda-audio-fragment.com/example.mp3',
  alt: 'Yoda saying Yoda things.',
  caption: null, // Caption may be NULL.
};

export const iframeContentItem: $Exact<model.IframeContentItem> = {
  id: 'xo346zqvng',
  type: model.contentItemTypes.IFRAME,
  isEditing: false,
  metadata: emptyMetadata,
  subItemIds: [],
  src: 'http://www.starwars.com/databank/yoda',
  alt: 'Yoda entry in the Star Wars databank.',
  caption: null,
};

export const slideBreakContentItem: $Exact<model.SlideBreakContentItem> = {
  id: 'c3g2c30a0u',
  type: model.contentItemTypes.SLIDE_BREAK,
  isEditing: false,
};

export const courseBreakContentItem: $Exact<model.CourseBreakContentItem> = {
  id: 'c3g2c30a0u',
  type: model.contentItemTypes.COURSE_BREAK,
  isEditing: false,
};
