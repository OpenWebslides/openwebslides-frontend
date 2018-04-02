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
  // The text content of the contentItem.
  // May contain markdown to create emphasized / linked elements.
  +text: string,
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

// Additional props for denormalized subable contentItems.
export type DenormalizedSubableContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to subableContentItemTypes.
  +type: SubableContentItemType,
  // ContentItems directly nested under this contentItem.
  // eslint-disable-next-line no-use-before-define
  +subItems: Array<DenormalizedContentItem>,
};

// Additional props for container contentItems.
export type ContainerContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to containerContentItemTypes.
  +type: ContainerContentItemType,
  // Ids of contentItems that are direct children of this container.
  +childItemIds: Array<Identifier>,
};

// Additional props for denormalized container contentItems.
export type DenormalizedContainerContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to containerContentItemTypes.
  +type: ContainerContentItemType,
  // ContentItems that are direct children of this container.
  // eslint-disable-next-line no-use-before-define
  +childItems: Array<DenormalizedContentItem>,
};

// Additional props for ROOT contentItems.
export type RootContentItemProps = {
  // Limit contentItem type to ROOT.
  +type: typeof contentItemTypes.ROOT,
  // Custom ROOT props go here.
};

// Type for a ROOT contentItem.
export type RootContentItem = {
  ...$Exact<SymbolContentItem>,
  ...$Exact<ContainerContentItem>,
  ...$Exact<RootContentItemProps>,
};

// Type for a denormalized ROOT contentItem.
export type DenormalizedRootContentItem = {
  ...$Exact<SymbolContentItem>,
  ...$Exact<DenormalizedContainerContentItem>,
  ...$Exact<RootContentItemProps>,
};

// Additional props for HEADING contentItems.
export type HeadingContentItemProps = {
  // Limit contentItem type to HEADING.
  +type: typeof contentItemTypes.HEADING,
  // Custom HEADING props go here.
};

// Type for a HEADING contentItem.
export type HeadingContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  ...$Exact<HeadingContentItemProps>,
};

// Type for a denormalized HEADING contentItem.
export type DenormalizedHeadingContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
  ...$Exact<HeadingContentItemProps>,
};

// Additional props for PARAGRAPH contentItems.
export type ParagraphContentItemProps = {
  // Limit contentItem type to PARAGRAPH.
  +type: typeof contentItemTypes.PARAGRAPH,
  // Custom PARAGRAPH props go here.
};

// Type for a PARAGRAPH contentItem.
export type ParagraphContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  ...$Exact<ParagraphContentItemProps>,
};

// Type for a denormalized PARAGRAPH contentItem.
export type DenormalizedParagraphContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
  ...$Exact<ParagraphContentItemProps>,
};

// Additional props for LIST contentItems.
export type ListContentItemProps = {
  // Limit contentItem type to LIST.
  +type: typeof contentItemTypes.LIST,
  // TRUE if the list contains ordered items, FALSE if not.
  +ordered: boolean,
};

// Type for a LIST contentItem.
export type ListContentItem = {
  ...$Exact<ContainerContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  ...$Exact<ListContentItemProps>,
};

// Type for a denormalized LIST contentItem.
export type DenormalizedListContentItem = {
  ...$Exact<DenormalizedContainerContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
  ...$Exact<ListContentItemProps>,
};

// Additional props for LIST_ITEM contentItems.
export type ListItemContentItemProps = {
  // Limit contentItem type to LIST_ITEM.
  +type: typeof contentItemTypes.LIST_ITEM,
  // Custom LIST_ITEM props go here.
};

// Type for a LIST_ITEM contentItem.
export type ListItemContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<ListItemContentItemProps>,
};

// Type for a denormalized LIST_ITEM contentItem.
export type DenormalizedListItemContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<ListItemContentItemProps>,
};

// Additional props for BLOCKQUOTE contentItems.
export type BlockquoteContentItemProps = {
  // Limit contentItem type to BLOCKQUOTE.
  +type: typeof contentItemTypes.BLOCKQUOTE,
  // The person / organisation / etc. that is the source of the quote.
  +cite: string,
  // The url to the source of the quote.
  +href: ?string,
};

// Type for a BLOCKQUOTE contentItem.
export type BlockquoteContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  ...$Exact<BlockquoteContentItemProps>,
};

// Type for a denormalized BLOCKQUOTE contentItem.
export type DenormalizedBlockquoteContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
  ...$Exact<BlockquoteContentItemProps>,
};

// Additional props for CODE contentItems.
export type CodeContentItemProps = {
  // Limit contentItem type to CODE.
  +type: typeof contentItemTypes.CODE,
  // The language (e.g. JavaScript, JSON, ...) that the code is written in.
  +language: string,
};

// Type for a CODE contentItem.
export type CodeContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  ...$Exact<CodeContentItemProps>,
};

// Type for a denormalized CODE contentItem.
export type DenormalizedCodeContentItem = {
  ...$Exact<PlainTextContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
  ...$Exact<CodeContentItemProps>,
};

// Additional props for IMAGE contentItems.
export type ImageContentItemProps = {
  // Limit contentItem type to IMAGE.
  +type: typeof contentItemTypes.IMAGE,
  // Custom IMAGE props go here.
};

// Type for an IMAGE contentItem.
export type ImageContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  ...$Exact<ImageContentItemProps>,
};

// Type for a denormalized IMAGE contentItem.
export type DenormalizedImageContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
  ...$Exact<ImageContentItemProps>,
};

// Additional props for VIDEO contentItems.
export type VideoContentItemProps = {
  // Limit contentItem type to VIDEO.
  +type: typeof contentItemTypes.VIDEO,
  // Custom VIDEO props go here.
};

// Type for a VIDEO contentItem.
export type VideoContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  ...$Exact<VideoContentItemProps>,
};

// Type for a denormalized VIDEO contentItem.
export type DenormalizedVideoContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
  ...$Exact<VideoContentItemProps>,
};

// Additional props for AUDIO contentItems.
export type AudioContentItemProps = {
  // Limit contentItem type to AUDIO,
  +type: typeof contentItemTypes.AUDIO,
  // Custom AUDIO props go here.
};

// Type for an AUDIO contentItem.
export type AudioContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  ...$Exact<AudioContentItemProps>,
};

// Type for a denormalized AUDIO contentItem.
export type DenormalizedAudioContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
  ...$Exact<AudioContentItemProps>,
};

// Additional props for IFRAME contentItems.
export type IframeContentItemProps = {
  // Limit contentItem type to IFRAME.
  +type: typeof contentItemTypes.IFRAME,
  // Custom IFRAME props go here.
};

// Type for an IFRAME contentItem.
export type IframeContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<SubableContentItem>,
  ...$Exact<IframeContentItemProps>,
};

// Type for a denormalized IFRAME contentItem.
export type DenormalizedIframeContentItem = {
  ...$Exact<MediaContentItem>,
  ...$Exact<TaggableContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
  ...$Exact<IframeContentItemProps>,
};

// Additional props for SLIDE_BREAK contentItems.
export type SlideBreakContentItemProps = {
  // Limit contentItem type to SLIDE_BREAK.
  +type: typeof contentItemTypes.SLIDE_BREAK,
  // Custom SLIDE_BREAK props go here.
};

// Type for a SLIDE_BREAK contentItem.
export type SlideBreakContentItem = {
  ...$Exact<SymbolContentItem>,
  ...$Exact<SlideBreakContentItemProps>,
};

// Type for a denormalized SLIDE_BREAK contentItem.
export type DenormalizedSlideBreakContentItem = {
  ...$Exact<SymbolContentItem>,
  ...$Exact<SlideBreakContentItemProps>,
};

// Additional props for COURSE_BREAK contentItems.
export type CourseBreakContentItemProps = {
  // Limit contentItem type to COURSE_BREAK.
  +type: typeof contentItemTypes.COURSE_BREAK,
  // Custom COURSE_BREAK props go here.
};

// Type for a COURSE_BREAK contentItem.
export type CourseBreakContentItem = {
  ...$Exact<SymbolContentItem>,
  ...$Exact<CourseBreakContentItemProps>,
};

// Type for a denormalized COURSE_BREAK contentItem.
export type DenormalizedCourseBreakContentItem = {
  ...$Exact<SymbolContentItem>,
  ...$Exact<CourseBreakContentItemProps>,
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

// Type for generic denormalized contentItems.
export type DenormalizedContentItem =
  | DenormalizedRootContentItem
  | DenormalizedHeadingContentItem
  | DenormalizedParagraphContentItem
  | DenormalizedListContentItem
  | DenormalizedListItemContentItem
  | DenormalizedBlockquoteContentItem
  | DenormalizedCodeContentItem
  | DenormalizedImageContentItem
  | DenormalizedVideoContentItem
  | DenormalizedAudioContentItem
  | DenormalizedIframeContentItem
  | DenormalizedSlideBreakContentItem
  | DenormalizedCourseBreakContentItem;

export type ContentItemsById = {
  +[contentItemId: Identifier]: ContentItem,
};

export type ContentItemsState = {
  +byId: ContentItemsById,
};

export {
  contentItemTypes,
  symbolContentItemTypes,
  plainTextContentItemTypes,
  mediaContentItemTypes,
  taggableContentItemTypes,
  subableContentItemTypes,
  containerContentItemTypes,
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
  Tag,
  Visibility,
};
