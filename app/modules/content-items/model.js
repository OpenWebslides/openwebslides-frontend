// @flow

import type { Identifier, SelectionPosition } from 'types/model';


// ContentItemTypes --------------------------------------------------------------------------------

// Weird syntax is necessary to avoid repeating string literals in flow types.
// See https://github.com/facebook/flow/issues/2377#issuecomment-262894389
const ROOT: 'contentItemTypes/ROOT' = 'contentItemTypes/ROOT';
const HEADING: 'contentItemTypes/HEADING' = 'contentItemTypes/HEADING';
const PARAGRAPH: 'contentItemTypes/PARAGRAPH' = 'contentItemTypes/PARAGRAPH';
const LIST: 'contentItemTypes/LIST' = 'contentItemTypes/LIST';
const LIST_ITEM: 'contentItemTypes/LIST_ITEM' = 'contentItemTypes/LIST_ITEM';
const BLOCKQUOTE: 'contentItemTypes/BLOCKQUOTE' = 'contentItemTypes/BLOCKQUOTE';
const CODE: 'contentItemTypes/CODE' = 'contentItemTypes/CODE';
const IMAGE: 'contentItemTypes/IMAGE' = 'contentItemTypes/IMAGE';
const VIDEO: 'contentItemTypes/VIDEO' = 'contentItemTypes/VIDEO';
const AUDIO: 'contentItemTypes/AUDIO' = 'contentItemTypes/AUDIO';
const IFRAME: 'contentItemTypes/IFRAME' = 'contentItemTypes/IFRAME';
const SLIDE_BREAK: 'contentItemTypes/SLIDE_BREAK' = 'contentItemTypes/SLIDE_BREAK';
const COURSE_BREAK: 'contentItemTypes/COURSE_BREAK' = 'contentItemTypes/COURSE_BREAK';

// Group contentItemTypes that contain plain text.
const plainTextContentItemTypes = {
  HEADING,
  PARAGRAPH,
  LIST_ITEM,
  BLOCKQUOTE,
  CODE,
};
type PlainTextContentItemType = $Values<typeof plainTextContentItemTypes>;

// Group contentItemTypes that contain media.
const mediaContentItemTypes = {
  IMAGE,
  VIDEO,
  AUDIO,
  IFRAME,
};
type MediaContentItemType = $Values<typeof mediaContentItemTypes>;

// Group contentItemTypes that contain 'building blocks' of content.
const blockContentItemTypes = {
  ...plainTextContentItemTypes,
  ...mediaContentItemTypes,
};
type BlockContentItemType =
  | PlainTextContentItemType
  | MediaContentItemType
  | typeof LIST;

// Group contentItemTypes that contain non-block symbols, such as slide or page breaks.
const symbolContentItemTypes = {
  ROOT,
  SLIDE_BREAK,
  COURSE_BREAK,
};
type SymbolContentItemType = $Values<typeof symbolContentItemTypes>;

// Group all contentItemtypes.
const contentItemTypes = {
  ...blockContentItemTypes,
  ...symbolContentItemTypes,
};
type ContentItemType =
  | BlockContentItemType
  | SymbolContentItemType;


// TagTypes ----------------------------------------------------------------------------------------

const IMPORTANT: 'tagTypes/IMPORTANT' = 'tagTypes/IMPORTANT';
const OPINION: 'tagTypes/OPINION' = 'tagTypes/OPINION';

// Group all tagTypes.
const tagTypes = {
  IMPORTANT,
  OPINION,
};

// Type for contentItem tags.
type Tag = $Values<typeof tagTypes>;


// VisiblityTypes ----------------------------------------------------------------------------------

const VISIBLE: 'visibilityTypes/VISIBLE' = 'visibilityTypes/VISIBLE';
const HIDDEN: 'visibilityTypes/HIDDEN' = 'visibilityTypes/HIDDEN';

// Group all visibilityTypes.
const visibilityTypes = {
  VISIBLE,
  HIDDEN,
};

// Type for contentItem visibility.
type Visibility = $Values<typeof visibilityTypes>;


// Metadata ----------------------------------------------------------------------------------------

// Type for contentItem metadata.
type Metadata = {
  // ContentItem tags
  // Use these to toggle specific styles (such as exclamation marks next to the item, etc.)
  +tags: Array<Tag>,
  // Manual overrides for contentItem visibility
  // Use these to override the automatic visibility settings for the contentItem, if necessary.
  +visibilityOverrides: {
    // Visibility override for slide view.
    +slide?: Visibility,
    // Visibility override for course view.
    +course?: Visibility,
  },
};


// Highlights --------------------------------------------------------------------------------------

const MILD_EMPHASIS: 'highlightTypes/MILD_EMPHASIS' = 'highlightTypes/MILD_EMPHASIS';
const STRONG_EMPHASIS: 'highlightTypes/STRONG_EMPHASIS' = 'highlightTypes/STRONG_EMPHASIS';
const LINK: 'highlightTypes/LINK' = 'highlightTypes/LINK';

// Group all highlightTypes.
const highlightTypes = {
  MILD_EMPHASIS,
  STRONG_EMPHASIS,
  LINK,
};
type HighlightType = $Values<typeof highlightTypes>;

// Base type for highlights.
type BaseHighlight = {
  // Type of the highlight.
  +type: HighlightType,
  // Highlight position in the text.
  +position: SelectionPosition,
};

// Type for a MILD_EMPHASIS highlight.
type MildEmphasisHighlight = {
  ...$Exact<BaseHighlight>,
  // Limit highlight type to MILD_EMPHASIS.
  +type: typeof MILD_EMPHASIS,
};

// Type for a STRONG_EMPHASIS highlight.
type StrongEmphasisHighlight = {
  ...$Exact<BaseHighlight>,
  // Limit highlight type to STRONG_EMPHASIS.
  +type: typeof STRONG_EMPHASIS,
};

// Type for a LINK highlight.
type LinkHighlight = {
  ...$Exact<BaseHighlight>,
  // Limit highlight type to LINK.
  +type: typeof LINK,
  // The href attribute of the link.
  +href: string,
};

// Type for a generic highlight.
type Highlight = MildEmphasisHighlight | StrongEmphasisHighlight | LinkHighlight;


// ContentItems ------------------------------------------------------------------------------------

// Base type for contentItems.
type BaseContentItem = {
  // Unique identifier for the contentItem.
  +id: Identifier,
  // Type of the contentItem.
  +type: ContentItemType,
};

// Group type for 'symbol' contentItems.
type SymbolContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to symbolContentItemTypes.
  +type: SymbolContentItemType,
};

// Group type for 'block' contentItems.
type BlockContentItem = {
  ...$Exact<BaseContentItem>,
  // Limit contentItem type to blockContentItemTypes.
  +type: BlockContentItemType,
  // ContentItem metadata.
  +metadata: Metadata,
  // Ids of contentItems directly nested under this contentItem.
  +subItemIds: Array<Identifier>,
};

// Group type for 'plainText' contentItems.
type PlainTextContentItem = {
  ...$Exact<BlockContentItem>,
  // Limit contentItem type to plainTextContentItemTypes.
  +type: PlainTextContentItemType,
  // The plain text content of the contentItem.
  +text: string,
  // Highlights in the plain text content (such as emphasis and links).
  +highlights: Array<Highlight>,
};

// Group type for 'media' contentItems.
type MediaContentItem = {
  ...$Exact<BlockContentItem>,
  // Limit contentItem type to mediaContentItemTypes.
  +type: MediaContentItemType,
  // The source url of the media.
  +src: string,
  // The alt text in case the media doesn't load.
  +alt: string,
  // The caption for the media.
  +caption: ?string,
};

// Type for a ROOT contentItem.
export type RootContentItem = {
  ...$Exact<SymbolContentItem>,
  // Limit contentItem type to ROOT.
  +type: typeof ROOT,
  // Ids of the headings that are direct children of the root.
  +topLevelHeadingItemIds: Array<Identifier>,
};

// Type for a HEADING contentItem.
export type HeadingContentItem = {
  ...$Exact<PlainTextContentItem>,
  // Limit contentItem type to HEADING.
  +type: typeof HEADING,
  // Custom HEADING props go here.
};

// Type for a PARAGRAPH contentItem.
export type ParagraphContentItem = {
  ...$Exact<PlainTextContentItem>,
  // Limit contentItem type to PARAGRAPH.
  +type: typeof PARAGRAPH,
  // Custom PARAGRAPH props go here.
};

// Type for a LIST contentItem.
export type ListContentItem = {
  ...$Exact<BlockContentItem>,
  // Limit contentItem type to LIST.
  +type: typeof LIST,
  // Ids of the list items contained in this list. (Note: nested lists are not supported.)
  +listItemIds: Array<Identifier>,
  // TRUE if the list contains ordered items, FALSE if not.
  +ordered: boolean,
};

// Type for a LIST_ITEM contentItem.
export type ListItemContentItem = {
  ...$Exact<PlainTextContentItem>,
  // Limit contentItem type to LIST_ITEM.
  +type: typeof LIST_ITEM,
  // Custom LIST_ITEM props go here.
};

// Type for a BLOCKQUOTE contentItem.
export type BlockquoteContentItem = {
  ...$Exact<PlainTextContentItem>,
  // Limit contentItem type to BLOCKQUOTE.
  +type: typeof BLOCKQUOTE,
  // The person / organisation / etc. that is the source of the quote.
  +cite: string,
  // The url to the source of the quote.
  +href: ?string,
};

// Type for a CODE contentItem.
export type CodeContentItem = {
  ...$Exact<PlainTextContentItem>,
  // Limit contentItem type to CODE.
  +type: typeof CODE,
  // The language (e.g. JavaScript, JSON, ...) that the code is written in.
  +language: string,
};

// Type for an IMAGE contentItem.
export type ImageContentItem = {
  ...$Exact<MediaContentItem>,
  // Limit contentItem type to IMAGE.
  +type: typeof IMAGE,
  // Custom IMAGE props go here.
};

// Type for a VIDEO contentItem.
export type VideoContentItem = {
  ...$Exact<MediaContentItem>,
  // Limit contentItem type to VIDEO.
  +type: typeof VIDEO,
  // Custom VIDEO props go here.
};

// Type for an AUDIO contentItem.
export type AudioContentItem = {
  ...$Exact<MediaContentItem>,
  // Limit contentItem type to AUDIO,
  +type: typeof AUDIO,
  // Custom AUDIO props go here.
};

// Type for an IFRAME contentItem.
export type IframeContentItem = {
  ...$Exact<MediaContentItem>,
  // Limit contentItem type to IFRAME.
  +type: typeof IFRAME,
  // Custom IFRAME props go here.
};

// Type for a SLIDE_BREAK contentItem.
export type SlideBreakContentItem = {
  ...$Exact<SymbolContentItem>,
  // Limit contentItem type to SLIDE_BREAK.
  +type: typeof SLIDE_BREAK,
  // Custom SLIDE_BREAK props go here.
};

// Type for a COURSE_BREAK contentItem.
export type CourseBreakContentItem = {
  ...$Exact<SymbolContentItem>,
  // Limit contentItem type to COURSE_BREAK.
  +type: typeof COURSE_BREAK,
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


// Export constants --------------------------------------------------------------------------------

export {
  contentItemTypes,
  highlightTypes,
  visibilityTypes,
  tagTypes,
};
