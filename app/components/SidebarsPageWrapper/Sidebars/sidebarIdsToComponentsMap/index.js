// @flow

import platform from 'modules/platform';

import TopicInfoSidebar from './TopicInfoSidebar';
import SlidePreviewsSidebar from './SlidePreviewsSidebar';
import ContributeSidebar from './ContributeSidebar';

const sidebarIdsToComponentsMap = {
  [platform.model.sidebarIds.TOPIC_INFO]: TopicInfoSidebar,
  [platform.model.sidebarIds.SLIDE_PREVIEWS]: SlidePreviewsSidebar,
  [platform.model.sidebarIds.CONTRIBUTE]: ContributeSidebar,
};

export default sidebarIdsToComponentsMap;
