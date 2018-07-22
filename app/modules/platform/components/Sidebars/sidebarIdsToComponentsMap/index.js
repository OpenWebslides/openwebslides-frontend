// @flow

import * as m from '../../../model';

import TopicInfoSidebar from './TopicInfoSidebar';
import SlidePreviewsSidebar from './SlidePreviewsSidebar';

const sidebarIdsToComponentsMap = {
  [m.sidebarIds.TOPIC_INFO]: TopicInfoSidebar,
  [m.sidebarIds.SLIDE_PREVIEWS]: SlidePreviewsSidebar,
};

export default sidebarIdsToComponentsMap;
