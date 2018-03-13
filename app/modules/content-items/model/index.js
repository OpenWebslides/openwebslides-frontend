// @flow

import type { Identifier } from 'types/model';
import generateRandomString from 'lib/generate-random-string';

import {
  contentItemTypes,
  symbolContentItemTypes,
  plainTextContentItemTypes,
  mediaContentItemTypes,
  taggableContentItemTypes,
  subableContentItemTypes,
  containerContentItemTypes,
} from './contentItemTypes';
import type {
  ContentItemType,
  SymbolContentItemType,
  PlainTextContentItemType,
  MediaContentItemType,
  TaggableContentItemType,
  SubableContentItemType,
  ContainerContentItemType,
} from './contentItemTypes';
import { highlightTypes } from './highlights';
import type {
  BaseHighlight,
  MildEmphasisHighlight,
  StrongEmphasisHighlight,
  LinkHighlight,
  Highlight,
} from './highlights';
import type { Metadata } from './metadata';
import { tagTypes } from './tags';
import type { Tag } from './tags';
import { visibilityTypes } from './visibilities';
import type { Visibility } from './visibilities';

// #TODO optimal id length / generation method?
const ID_LENGTH = 10;

export const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};

// Base type for contentItems.
export type BaseContentItem = {
  // Unique identifier for the contentItem.
  +id: Identifier,
  // Type of the contentItem.
  +type: ContentItemType,
};

// Additional props for 'symbol' contentItems.
export type SymbolContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to symbolContentItemTypes.
  +type: SymbolContentItemType,
};

// Additonal props for 'plainText' contentItems.
export type PlainTextContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to plainTextContentItemTypes.
  +type: PlainTextContentItemType,
  // The plain text content of the contentItem.
  +text: string,
  // Highlights in the plain text content (such as emphasis and links).
  +highlights: Array<Highlight>,
};

// Additional props for 'media' contentItems.
export type MediaContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to mediaContentItemTypes.
  +type: MediaContentItemType,
  // The source url of the media.
  +src: string,
  // The alt text in case the media doesn't load.
  +alt: string,
  // The caption for the media.
  +caption: ?string,
};

// Additional props for taggable contentItems.
export type TaggableContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to taggableContentItemTypes.
  +type: TaggableContentItemType,
  // ContentItem metadata.
  +metadata: Metadata,
};

// Additional props for subable contentItems.
export type SubableContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to subableContentItemTypes.
  +type: SubableContentItemType,
  // Ids of contentItems directly nested under this contentItem.
  +subItemIds: Array<Identifier>,
};

// Additional props for container contentItems.
export type ContainerContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to containerContentItemTypes.
  +type: ContainerContentItemType,
  // Ids of contentItems that are direct children of this container.
  +childItemIds: Array<Identifier>,
};

// Type for a ROOT contentItem.
export type RootContentItem = {
  ...$Exact<SymbolContentItem>,
  ...$Exact<ContainerContentItem>,
  // Limit contentItem type to ROOT.
  +type: typeof contentItemTypes.ROOT,
  // Custom ROOT props go here.
};

// Type for a HEADING contentItem.
export type HeadingContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  // Limit contentItem type to HEADING.
  +type: typeof contentItemTypes.HEADING,
  // Custom HEADING props go here.
};

// Type for a PARAGRAPH contentItem.
export type ParagraphContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  // Limit contentItem type to PARAGRAPH.
  +type: typeof contentItemTypes.PARAGRAPH,
  // Custom PARAGRAPH props go here.
};

// Type for a LIST contentItem.
export type ListContentItem = {
  ...$Exact<ContainerContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  // Limit contentItem type to LIST.
  +type: typeof contentItemTypes.LIST,
  // TRUE if the list contains ordered items, FALSE if not.
  +ordered: boolean,
};

// Type for a LIST_ITEM contentItem.
export type ListItemContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  // Limit contentItem type to LIST_ITEM.
  +type: typeof contentItemTypes.LIST_ITEM,
  // Custom LIST_ITEM props go here.
};

// Type for a BLOCKQUOTE contentItem.
export type BlockquoteContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  // Limit contentItem type to BLOCKQUOTE.
  +type: typeof contentItemTypes.BLOCKQUOTE,
  // The person / organisation / etc. that is the source of the quote.
  +cite: string,
  // The url to the source of the quote.
  +href: ?string,
};

// Type for a CODE contentItem.
export type CodeContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  // Limit contentItem type to CODE.
  +type: typeof contentItemTypes.CODE,
  // The language (e.g. JavaScript, JSON, ...) that the code is written in.
  +language: string,
};

// Type for an IMAGE contentItem.
export type ImageContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  // Limit contentItem type to IMAGE.
  +type: typeof contentItemTypes.IMAGE,
  // Custom IMAGE props go here.
};

// Type for a VIDEO contentItem.
export type VideoContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  // Limit contentItem type to VIDEO.
  +type: typeof contentItemTypes.VIDEO,
  // Custom VIDEO props go here.
};

// Type for an AUDIO contentItem.
export type AudioContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  // Limit contentItem type to AUDIO,
  +type: typeof contentItemTypes.AUDIO,
  // Custom AUDIO props go here.
};

// Type for an IFRAME contentItem.
export type IframeContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  // Limit contentItem type to IFRAME.
  +type: typeof contentItemTypes.IFRAME,
  // Custom IFRAME props go here.
};

// Type for a SLIDE_BREAK contentItem.
export type SlideBreakContentItem = {
  ...$Exact<SymbolContentItem>,
  // Limit contentItem type to SLIDE_BREAK.
  +type: typeof contentItemTypes.SLIDE_BREAK,
  // Custom SLIDE_BREAK props go here.
};

// Type for a COURSE_BREAK contentItem.
export type CourseBreakContentItem = {
  ...$Exact<SymbolContentItem>,
  // Limit contentItem type to COURSE_BREAK.
  +type: typeof contentItemTypes.COURSE_BREAK,
  // Custom COURSE_BREAK props go here.
};

// Type for generic contentItems.
export type ContentItem =
  | RootContentItem
  | HeadingContentItem
  | ParagraphContentItem
  | ListContentItem
  | ListItemContentItem
  | BlockquoteContentItem
  | CodeContentItem
  | ImageContentItem
  | VideoContentItem
  | AudioContentItem
  | IframeContentItem
  | SlideBreakContentItem
  | CourseBreakContentItem;

export type ContentItemsState = {
  +[contentItemId: Identifier]: ContentItem,
};

export {
  contentItemTypes,
  symbolContentItemTypes,
  plainTextContentItemTypes,
  mediaContentItemTypes,
  taggableContentItemTypes,
  subableContentItemTypes,
  containerContentItemTypes,
  highlightTypes,
  tagTypes,
  visibilityTypes,
};

export type {
  ContentItemType,
  SymbolContentItemType,
  PlainTextContentItemType,
  MediaContentItemType,
  TaggableContentItemType,
  SubableContentItemType,
  ContainerContentItemType,
  Metadata,
  BaseHighlight,
  MildEmphasisHighlight,
  StrongEmphasisHighlight,
  LinkHighlight,
  Highlight,
  Tag,
  Visibility,
};
