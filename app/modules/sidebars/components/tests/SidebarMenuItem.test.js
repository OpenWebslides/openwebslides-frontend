// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebarMenuItem } from '../SidebarMenuItem';
import { sidebar } from '../../model';

describe(`SidebarMenuItem`, (): void => {
  const dummySidebar = sidebar.SLIDE;

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarMenuItem
        icon="image"
        sidebarName={dummySidebar}
        dispatchToggle={(): void => {}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
