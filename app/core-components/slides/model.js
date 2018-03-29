// @flow

// #TODO babel-plugin-flow-react-proptypes throws an error "Cannot read property 'key' of undefined"
// Should probably create a minimal test case to reproduce and make bug report... someday.
// eslint-disable-next-line lines-around-directive
'no babel-plugin-flow-react-proptypes';

import * as contentItems from 'modules/content-items';

export type DenormalizedSubableContentItem = {
  ...$Exact<contentItems.SubableContentItem>,
  // ContentItems directly nested under this contentItem.
  +subItems: Array<contentItems.ContentItem>,
};

export type DenormalizedContainerContentItem = {
  ...$Exact<contentItems.ContainerContentItem>,
  // ContentItems that are direct children of this container.
  +childItems: Array<contentItems.ContentItem>,
};

export type DenormalizedRootContentItem = {
  ...$Exact<contentItems.RootContentItem>,
  ...$Exact<DenormalizedContainerContentItem>,
};

export type DenormalizedHeadingContentItem = {
  ...$Exact<contentItems.HeadingContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
};

export type DenormalizedParagraphContentItem = {
  ...$Exact<contentItems.ParagraphContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
};

export type DenormalizedListContentItem = {
  ...$Exact<contentItems.ListContentItem>,
  ...$Exact<DenormalizedContainerContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
};

export type DenormalizedListItemContentItem = {
  ...$Exact<contentItems.ListItemContentItem>,
};

export type DenormalizedBlockquoteContentItem = {
  ...$Exact<contentItems.BlockquoteContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
};

export type DenormalizedCodeContentItem = {
  ...$Exact<contentItems.CodeContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
};

export type DenormalizedImageContentItem = {
  ...$Exact<contentItems.ImageContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
};

export type DenormalizedVideoContentItem = {
  ...$Exact<contentItems.VideoContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
};

export type DenormalizedAudioContentItem = {
  ...$Exact<contentItems.AudioContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
};

export type DenormalizedIframeContentItem = {
  ...$Exact<contentItems.IframeContentItem>,
  ...$Exact<DenormalizedSubableContentItem>,
};

export type DenormalizedSlideBreakContentItem = {
  ...$Exact<contentItems.SlideBreakContentItem>,
};

export type DenormalizedCourseBreakContentItem = {
  ...$Exact<contentItems.CourseBreakContentItem>,
};

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
