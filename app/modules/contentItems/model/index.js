// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import * as types from './contentItemTypes';
import * as metadata from './metadata';


// BASE --------------------------------------------------------------------------------------------

// Base type for contentItems.
export type BaseContentItem = {|
  // Unique identifier for the contentItem.
  +id: string,
  // Type of the contentItem.
  +type: types.ContentItemType,
  // TRUE if the contentItem is currently being edited, FALSE if not.
  // Has consequences for validation - e.g. empty text is ok while editing, but not otherwise.
  +isEditing: boolean,
|};

// List of 'base' contentItem props that can be edited through propsForType.
export const editablePropsForBaseContentItem = [
  // Placeholder
];


// SYMBOL ------------------------------------------------------------------------------------------

// Additional props for 'symbol' contentItems.
export type SymbolContentItem = {|
  ...BaseContentItem,
  // Limit contentItem type to symbolContentItemTypes.
  +type: types.SymbolContentItemType,
|};

// List of 'symbol' contentItem props that can be edited through propsForType.
export const editablePropsForSymbolContentItem = [
  ...editablePropsForBaseContentItem,
];


// PLAINTEXT ---------------------------------------------------------------------------------------

// Additonal props for 'plainText' contentItems.
export type PlainTextContentItem = {|
  ...BaseContentItem,
  // Limit contentItem type to plainTextContentItemTypes.
  +type: types.PlainTextContentItemType,
  // The text content of the contentItem.
  // May contain markdown to create emphasized / linked elements.
  +text: string,
|};

// List of 'plainText' contentItem props that can be edited through propsForType.
export const editablePropsForPlainTextContentItem = [
  ...editablePropsForBaseContentItem,
  'text',
];


// MEDIA -------------------------------------------------------------------------------------------

// Additional props for 'media' contentItems.
export type MediaContentItem = {|
  ...BaseContentItem,
  // Limit contentItem type to mediaContentItemTypes.
  +type: types.MediaContentItemType,
  // The source url of the media.
  +src: string,
  // The alt text in case the media doesn't load.
  +alt: string,
  // The caption for the media.
  +caption: ?string,
|};

// List of 'media' contentItem props that can be edited through propsForType.
export const editablePropsForMediaContentItem = [
  ...editablePropsForBaseContentItem,
];


// TAGGABLE ----------------------------------------------------------------------------------------

// Additional props for 'taggable' contentItems.
export type TaggableContentItem = {|
  ...BaseContentItem,
  // Limit contentItem type to taggableContentItemTypes.
  +type: types.TaggableContentItemType,
  // ContentItem metadata.
  +metadata: metadata.Metadata,
|};

// List of 'taggable' contentItem props that can be edited through propsForType.
export const editablePropsForTaggableContentItem = [
  ...editablePropsForBaseContentItem,
];


// SUBABLE -----------------------------------------------------------------------------------------

// Additional props for 'subable' contentItems.
export type SubableContentItem = {|
  ...BaseContentItem,
  // Limit contentItem type to subableContentItemTypes.
  +type: types.SubableContentItemType,
  // Ids of contentItems directly nested under this contentItem.
  +subItemIds: $ReadOnlyArray<string>,
|};

// Additional props for denormalized 'subable' contentItems.
export type DenormalizedSubableContentItem = {|
  ...BaseContentItem,
  // Limit contentItem type to subableContentItemTypes.
  +type: types.SubableContentItemType,
  // ContentItems directly nested under this contentItem.
  // eslint-disable-next-line no-use-before-define
  +subItems: $ReadOnlyArray<DenormalizedContentItem>,
|};

// List of 'subable' contentItem props that can be edited through propsForType.
export const editablePropsForSubableContentItem = [
  ...editablePropsForBaseContentItem,
];


// ROOT --------------------------------------------------------------------------------------------

// Additional props for ROOT contentItems.
export type RootContentItemProps = {|
  // Limit contentItem type to ROOT.
  +type: typeof types.contentItemTypes.ROOT,
  // Custom ROOT props go here.
|};

// Type for a ROOT contentItem.
export type RootContentItem = {|
  ...SymbolContentItem,
  ...SubableContentItem,
  ...RootContentItemProps,
|};

// Type for a denormalized ROOT contentItem.
export type DenormalizedRootContentItem = {|
  ...SymbolContentItem,
  ...DenormalizedSubableContentItem,
  ...RootContentItemProps,
|};

// List of ROOT contentItem props that can be edited through propsForType.
export const editablePropsForRootContentItem = [
  ...editablePropsForSymbolContentItem,
  ...editablePropsForSubableContentItem,
];


// HEADING -----------------------------------------------------------------------------------------

// Additional props for HEADING contentItems.
export type HeadingContentItemProps = {|
  // Limit contentItem type to HEADING.
  +type: typeof types.contentItemTypes.HEADING,
  // Custom HEADING props go here.
|};

// Type for a HEADING contentItem.
export type HeadingContentItem = {|
  ...PlainTextContentItem,
  ...TaggableContentItem,
  ...SubableContentItem,
  ...HeadingContentItemProps,
|};

// Type for a denormalized HEADING contentItem.
export type DenormalizedHeadingContentItem = {|
  ...PlainTextContentItem,
  ...TaggableContentItem,
  ...DenormalizedSubableContentItem,
  ...HeadingContentItemProps,
|};

// List of HEADING contentItem props that can be edited through propsForType.
export const editablePropsForHeadingContentItem = [
  ...editablePropsForPlainTextContentItem,
  ...editablePropsForTaggableContentItem,
  ...editablePropsForSubableContentItem,
];


// PARAGRAPH ---------------------------------------------------------------------------------------

// Additional props for PARAGRAPH contentItems.
export type ParagraphContentItemProps = {|
  // Limit contentItem type to PARAGRAPH.
  +type: typeof types.contentItemTypes.PARAGRAPH,
  // Custom PARAGRAPH props go here.
|};

// Type for a PARAGRAPH contentItem.
export type ParagraphContentItem = {|
  ...PlainTextContentItem,
  ...TaggableContentItem,
  ...SubableContentItem,
  ...ParagraphContentItemProps,
|};

// Type for a denormalized PARAGRAPH contentItem.
export type DenormalizedParagraphContentItem = {|
  ...PlainTextContentItem,
  ...TaggableContentItem,
  ...DenormalizedSubableContentItem,
  ...ParagraphContentItemProps,
|};

// List of PARAGRAPH contentItem props that can be edited through propsForType.
export const editablePropsForParagraphContentItem = [
  ...editablePropsForPlainTextContentItem,
  ...editablePropsForTaggableContentItem,
  ...editablePropsForSubableContentItem,
];


// LIST --------------------------------------------------------------------------------------------

// Additional props for LIST contentItems.
export type ListContentItemProps = {|
  // Limit contentItem type to LIST.
  +type: typeof types.contentItemTypes.LIST,
  // TRUE if the list contains ordered items, FALSE if not.
  +ordered: boolean,
  // The list items. Note that list items can only contain text, not other contentItems.
  // This is by design; using complex list is not encouraged.
  // This type of content should be represented by headings and paragraphs instead.
  +items: $ReadOnlyArray<string>,
|};

// Type for a LIST contentItem.
export type ListContentItem = {|
  ...TaggableContentItem,
  ...SubableContentItem,
  ...ListContentItemProps,
|};

// Type for a denormalized LIST contentItem.
export type DenormalizedListContentItem = {|
  ...TaggableContentItem,
  ...DenormalizedSubableContentItem,
  ...ListContentItemProps,
|};

// List of LIST contentItem props that can be edited through propsForType.
export const editablePropsForListContentItem = [
  ...editablePropsForTaggableContentItem,
  ...editablePropsForSubableContentItem,
];


// BLOCKQUOTE --------------------------------------------------------------------------------------

// Additional props for BLOCKQUOTE contentItems.
export type BlockquoteContentItemProps = {|
  // Limit contentItem type to BLOCKQUOTE.
  +type: typeof types.contentItemTypes.BLOCKQUOTE,
  // The person / organisation / etc. that is the source of the quote.
  +cite: string,
  // The url to the source of the quote.
  +href: ?string,
|};

// Type for a BLOCKQUOTE contentItem.
export type BlockquoteContentItem = {|
  ...PlainTextContentItem,
  ...TaggableContentItem,
  ...SubableContentItem,
  ...BlockquoteContentItemProps,
|};

// Type for a denormalized BLOCKQUOTE contentItem.
export type DenormalizedBlockquoteContentItem = {|
  ...PlainTextContentItem,
  ...TaggableContentItem,
  ...DenormalizedSubableContentItem,
  ...BlockquoteContentItemProps,
|};

// List of BLOCKQUOTE contentItem props that can be edited through propsForType.
export const editablePropsForBlockquoteContentItem = [
  ...editablePropsForPlainTextContentItem,
  ...editablePropsForTaggableContentItem,
  ...editablePropsForSubableContentItem,
];


// CODE --------------------------------------------------------------------------------------------

// Additional props for CODE contentItems.
export type CodeContentItemProps = {|
  // Limit contentItem type to CODE.
  +type: typeof types.contentItemTypes.CODE,
  // The language (e.g. JavaScript, JSON, ...) that the code is written in.
  +language: string,
|};

// Type for a CODE contentItem.
export type CodeContentItem = {|
  ...PlainTextContentItem,
  ...TaggableContentItem,
  ...SubableContentItem,
  ...CodeContentItemProps,
|};

// Type for a denormalized CODE contentItem.
export type DenormalizedCodeContentItem = {|
  ...PlainTextContentItem,
  ...TaggableContentItem,
  ...DenormalizedSubableContentItem,
  ...CodeContentItemProps,
|};

// List of CODE contentItem props that can be edited through propsForType.
export const editablePropsForCodeContentItem = [
  ...editablePropsForPlainTextContentItem,
  ...editablePropsForTaggableContentItem,
  ...editablePropsForSubableContentItem,
];


// IMAGE -------------------------------------------------------------------------------------------

// Additional props for IMAGE contentItems.
export type ImageContentItemProps = {|
  // Limit contentItem type to IMAGE.
  +type: typeof types.contentItemTypes.IMAGE,
  // Custom IMAGE props go here.
|};

// Type for an IMAGE contentItem.
export type ImageContentItem = {|
  ...MediaContentItem,
  ...TaggableContentItem,
  ...SubableContentItem,
  ...ImageContentItemProps,
|};

// Type for a denormalized IMAGE contentItem.
export type DenormalizedImageContentItem = {|
  ...MediaContentItem,
  ...TaggableContentItem,
  ...DenormalizedSubableContentItem,
  ...ImageContentItemProps,
|};

// List of IMAGE contentItem props that can be edited through propsForType.
export const editablePropsForImageContentItem = [
  ...editablePropsForMediaContentItem,
  ...editablePropsForTaggableContentItem,
  ...editablePropsForSubableContentItem,
];


// VIDEO -------------------------------------------------------------------------------------------

// Additional props for VIDEO contentItems.
export type VideoContentItemProps = {|
  // Limit contentItem type to VIDEO.
  +type: typeof types.contentItemTypes.VIDEO,
  // Custom VIDEO props go here.
|};

// Type for a VIDEO contentItem.
export type VideoContentItem = {|
  ...MediaContentItem,
  ...TaggableContentItem,
  ...SubableContentItem,
  ...VideoContentItemProps,
|};

// Type for a denormalized VIDEO contentItem.
export type DenormalizedVideoContentItem = {|
  ...MediaContentItem,
  ...TaggableContentItem,
  ...DenormalizedSubableContentItem,
  ...VideoContentItemProps,
|};

// List of VIDEO contentItem props that can be edited through propsForType.
export const editablePropsForVideoContentItem = [
  ...editablePropsForMediaContentItem,
  ...editablePropsForTaggableContentItem,
  ...editablePropsForSubableContentItem,
];


// AUDIO -------------------------------------------------------------------------------------------

// Additional props for AUDIO contentItems.
export type AudioContentItemProps = {|
  // Limit contentItem type to AUDIO,
  +type: typeof types.contentItemTypes.AUDIO,
  // Custom AUDIO props go here.
|};

// Type for an AUDIO contentItem.
export type AudioContentItem = {|
  ...MediaContentItem,
  ...TaggableContentItem,
  ...SubableContentItem,
  ...AudioContentItemProps,
|};

// Type for a denormalized AUDIO contentItem.
export type DenormalizedAudioContentItem = {|
  ...MediaContentItem,
  ...TaggableContentItem,
  ...DenormalizedSubableContentItem,
  ...AudioContentItemProps,
|};

// List of AUDIO contentItem props that can be edited through propsForType.
export const editablePropsForAudioContentItem = [
  ...editablePropsForMediaContentItem,
  ...editablePropsForTaggableContentItem,
  ...editablePropsForSubableContentItem,
];


// IFRAME ------------------------------------------------------------------------------------------

// Additional props for IFRAME contentItems.
export type IframeContentItemProps = {|
  // Limit contentItem type to IFRAME.
  +type: typeof types.contentItemTypes.IFRAME,
  // Custom IFRAME props go here.
|};

// Type for an IFRAME contentItem.
export type IframeContentItem = {|
  ...MediaContentItem,
  ...TaggableContentItem,
  ...SubableContentItem,
  ...IframeContentItemProps,
|};

// Type for a denormalized IFRAME contentItem.
export type DenormalizedIframeContentItem = {|
  ...MediaContentItem,
  ...TaggableContentItem,
  ...DenormalizedSubableContentItem,
  ...IframeContentItemProps,
|};

// List of IFRAME contentItem props that can be edited through propsForType.
export const editablePropsForIframeContentItem = [
  ...editablePropsForMediaContentItem,
  ...editablePropsForTaggableContentItem,
  ...editablePropsForSubableContentItem,
];


// SLIDE_BREAK -------------------------------------------------------------------------------------

// Additional props for SLIDE_BREAK contentItems.
export type SlideBreakContentItemProps = {|
  // Limit contentItem type to SLIDE_BREAK.
  +type: typeof types.contentItemTypes.SLIDE_BREAK,
  // Custom SLIDE_BREAK props go here.
|};

// Type for a SLIDE_BREAK contentItem.
export type SlideBreakContentItem = {|
  ...SymbolContentItem,
  ...SlideBreakContentItemProps,
|};

// Type for a denormalized SLIDE_BREAK contentItem.
export type DenormalizedSlideBreakContentItem = {|
  ...SymbolContentItem,
  ...SlideBreakContentItemProps,
|};

// List of SLIDE_BREAK contentItem props that can be edited through propsForType.
export const editablePropsForSlideBreakContentItem = [
  ...editablePropsForSymbolContentItem,
];


// COURSE_BREAK ------------------------------------------------------------------------------------

// Additional props for COURSE_BREAK contentItems.
export type CourseBreakContentItemProps = {|
  // Limit contentItem type to COURSE_BREAK.
  +type: typeof types.contentItemTypes.COURSE_BREAK,
  // Custom COURSE_BREAK props go here.
|};

// Type for a COURSE_BREAK contentItem.
export type CourseBreakContentItem = {|
  ...SymbolContentItem,
  ...CourseBreakContentItemProps,
|};

// Type for a denormalized COURSE_BREAK contentItem.
export type DenormalizedCourseBreakContentItem = {|
  ...SymbolContentItem,
  ...CourseBreakContentItemProps,
|};

// List of COURSE_BREAK contentItem props that can be edited through propsForType.
export const editablePropsForCourseBreakContentItem = [
  ...editablePropsForSymbolContentItem,
];


// CONTENT_ITEM ------------------------------------------------------------------------------------

// Type for generic contentItems.
export type ContentItem =
  | RootContentItem
  | HeadingContentItem
  | ParagraphContentItem
  | ListContentItem
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
  | DenormalizedBlockquoteContentItem
  | DenormalizedCodeContentItem
  | DenormalizedImageContentItem
  | DenormalizedVideoContentItem
  | DenormalizedAudioContentItem
  | DenormalizedIframeContentItem
  | DenormalizedSlideBreakContentItem
  | DenormalizedCourseBreakContentItem;

// Map contentItemTypes to their editable props lists.
export const editablePropsForType = {
  [types.contentItemTypes.ROOT]: editablePropsForRootContentItem,
  [types.contentItemTypes.HEADING]: editablePropsForHeadingContentItem,
  [types.contentItemTypes.PARAGRAPH]: editablePropsForParagraphContentItem,
  [types.contentItemTypes.LIST]: editablePropsForListContentItem,
  [types.contentItemTypes.BLOCKQUOTE]: editablePropsForBlockquoteContentItem,
  [types.contentItemTypes.CODE]: editablePropsForCodeContentItem,
  [types.contentItemTypes.IMAGE]: editablePropsForImageContentItem,
  [types.contentItemTypes.VIDEO]: editablePropsForVideoContentItem,
  [types.contentItemTypes.AUDIO]: editablePropsForAudioContentItem,
  [types.contentItemTypes.IFRAME]: editablePropsForIframeContentItem,
  [types.contentItemTypes.SLIDE_BREAK]: editablePropsForSlideBreakContentItem,
  [types.contentItemTypes.COURSE_BREAK]: editablePropsForCourseBreakContentItem,
};

// Type object containing all possible props for all possible types.
export type AllPropsForAllTypes = {|
  ...RootContentItem,
  ...HeadingContentItem,
  ...ParagraphContentItem,
  ...ListContentItem,
  ...BlockquoteContentItem,
  ...CodeContentItem,
  ...ImageContentItem,
  ...VideoContentItem,
  ...AudioContentItem,
  ...IframeContentItem,
  ...SlideBreakContentItem,
  ...CourseBreakContentItem,
  // Reset this to the generic contentItemType
  +type: types.ContentItemType,
|};


// STATE -------------------------------------------------------------------------------------------

// eslint-disable-next-line flowtype/require-exact-type
export type ContentItemsById = {
  +[contentItemId: string]: ContentItem,
};

export type ContentItemsState = {|
  +byId: ContentItemsById,
  // Currently selected content item
  +currentlySelectedId: ?string,
|};


// EXPORTS -----------------------------------------------------------------------------------------

export * from './contentItemTypes';
export * from './metadata';
export * from './context';
