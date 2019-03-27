// @flow

/* eslint-disable flowtype/require-types-at-top */

// ContentItemType constants
const ROOT: 'contentItemTypes/ROOT' = 'contentItemTypes/ROOT';
const HEADING: 'contentItemTypes/HEADING' = 'contentItemTypes/HEADING';
const PARAGRAPH: 'contentItemTypes/PARAGRAPH' = 'contentItemTypes/PARAGRAPH';
const LIST: 'contentItemTypes/LIST' = 'contentItemTypes/LIST';
const BLOCKQUOTE: 'contentItemTypes/BLOCKQUOTE' = 'contentItemTypes/BLOCKQUOTE';
const CODE: 'contentItemTypes/CODE' = 'contentItemTypes/CODE';
const IMAGE: 'contentItemTypes/IMAGE' = 'contentItemTypes/IMAGE';
const VIDEO: 'contentItemTypes/VIDEO' = 'contentItemTypes/VIDEO';
const AUDIO: 'contentItemTypes/AUDIO' = 'contentItemTypes/AUDIO';
const IFRAME: 'contentItemTypes/IFRAME' = 'contentItemTypes/IFRAME';
const SLIDE_BREAK: 'contentItemTypes/SLIDE_BREAK' = 'contentItemTypes/SLIDE_BREAK';
const COURSE_BREAK: 'contentItemTypes/COURSE_BREAK' = 'contentItemTypes/COURSE_BREAK';

// Group all contentItemtypes.
export const contentItemTypes = {
  ROOT,
  HEADING,
  PARAGRAPH,
  LIST,
  BLOCKQUOTE,
  CODE,
  IMAGE,
  VIDEO,
  AUDIO,
  IFRAME,
  SLIDE_BREAK,
  COURSE_BREAK,
};
export type ContentItemType = $Values<typeof contentItemTypes>;

// Group contentItemTypes that contain special symbols, such as slide or page breaks.
export const symbolContentItemTypes = {
  ROOT,
  SLIDE_BREAK,
  COURSE_BREAK,
};
export type SymbolContentItemType = $Values<typeof symbolContentItemTypes>;

// Group contentItemTypes that contain plain text.
export const plainTextContentItemTypes = {
  HEADING,
  PARAGRAPH,
  BLOCKQUOTE,
  CODE,
};
export type PlainTextContentItemType = $Values<typeof plainTextContentItemTypes>;

// Group contentItemTypes that contain media.
export const mediaContentItemTypes = {
  IMAGE,
  VIDEO,
  AUDIO,
  IFRAME,
};
export type MediaContentItemType = $Values<typeof mediaContentItemTypes>;

// Group contentItemTypes that can have metadata.
export const taggableContentItemTypes = {
  HEADING,
  PARAGRAPH,
  LIST,
  BLOCKQUOTE,
  CODE,
  IMAGE,
  VIDEO,
  AUDIO,
  IFRAME,
};
export type TaggableContentItemType = $Values<typeof taggableContentItemTypes>;

// Group contentItemTypes that can have sub-items.
export const subableContentItemTypes = {
  HEADING,
  PARAGRAPH,
  LIST,
  BLOCKQUOTE,
  CODE,
  IMAGE,
  VIDEO,
  AUDIO,
  IFRAME,
};
export type SubableContentItemType = $Values<typeof subableContentItemTypes>;

// Group contentItemTypes that can contain other contentItems.
export const containerContentItemTypes = {
  ROOT,
  LIST,
};
export type ContainerContentItemType = $Values<typeof containerContentItemTypes>;
