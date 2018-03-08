// @flow

import type { SelectionPosition } from 'types/model';

const MILD_EMPHASIS: 'highlightTypes/MILD_EMPHASIS' = 'highlightTypes/MILD_EMPHASIS';
const STRONG_EMPHASIS: 'highlightTypes/STRONG_EMPHASIS' = 'highlightTypes/STRONG_EMPHASIS';
const LINK: 'highlightTypes/LINK' = 'highlightTypes/LINK';

// Group all highlightTypes.
export const highlightTypes = {
  MILD_EMPHASIS,
  STRONG_EMPHASIS,
  LINK,
};
export type HighlightType = $Values<typeof highlightTypes>;

// Base type for highlights.
export type BaseHighlight = {
  // Type of the highlight.
  +type: HighlightType,
  // Highlight position in the text.
  +position: SelectionPosition,
};

// Type for a MILD_EMPHASIS highlight.
export type MildEmphasisHighlight = {
  ...$Exact<BaseHighlight>,
  // Limit highlight type to MILD_EMPHASIS.
  +type: typeof MILD_EMPHASIS,
};

// Type for a STRONG_EMPHASIS highlight.
export type StrongEmphasisHighlight = {
  ...$Exact<BaseHighlight>,
  // Limit highlight type to STRONG_EMPHASIS.
  +type: typeof STRONG_EMPHASIS,
};

// Type for a LINK highlight.
export type LinkHighlight = {
  ...$Exact<BaseHighlight>,
  // Limit highlight type to LINK.
  +type: typeof LINK,
  // The href attribute of the link.
  +href: string,
};

// Type for a generic highlight.
export type Highlight = MildEmphasisHighlight | StrongEmphasisHighlight | LinkHighlight;
