// @flow

import platform from 'modules/platform';

import TopicInfoSidebar from './TopicInfoSidebar';
import SlidePreviewsSidebar from './SlidePreviewsSidebar';
import ShareUpdatesSidebar from './ShareUpdatesSidebar';

const sidebarIdsToComponentsMap = {
  [platform.model.sidebarIds.TOPIC_INFO]: TopicInfoSidebar,
  [platform.model.sidebarIds.SLIDE_PREVIEWS]: SlidePreviewsSidebar,
  [platform.model.sidebarIds.SHARE_UPDATES]: ShareUpdatesSidebar,
};

export default sidebarIdsToComponentsMap;
