// @flow

import platform from 'modules/platform';

import TopicInfoSidebar from './TopicInfoSidebar';
import SlidePreviewsSidebar from './SlidePreviewsSidebar';

const sidebarIdsToComponentsMap = {
  [platform.model.sidebarIds.TOPIC_INFO]: TopicInfoSidebar,
  [platform.model.sidebarIds.SLIDE_PREVIEWS]: SlidePreviewsSidebar,
};

export default sidebarIdsToComponentsMap;
