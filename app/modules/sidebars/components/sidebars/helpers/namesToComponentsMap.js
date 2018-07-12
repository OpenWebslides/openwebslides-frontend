// @flow

import * as m from '../../../model';
import InfoSidebar from '../InfoSidebar';
import SlideSidebar from '../SlideSidebar';

const namesToComponentsMap = {
  [m.sidebarNames.INFO]: InfoSidebar,
  [m.sidebarNames.SLIDE]: SlideSidebar,
};

export default namesToComponentsMap;
