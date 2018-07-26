// @flow

import type { Tag } from './tags';
import type { Visibility } from './visibilities';

// Type for contentItem metadata.
export type Metadata = {|
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
|};
