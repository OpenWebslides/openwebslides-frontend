// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebarMenuItem } from '../SidebarMenuItem';
import { sidebar } from '../../model';

describe(`SidebarMenuItem`, (): void => {
  const dummySidebar = sidebar.SLIDE;

  it(`renders without errors`, (): void => {
    const dummyToggle = jest.fn();
    const enzymeWrapper = shallow(
      <PureSidebarMenuItem
        icon="image"
        sidebarName={dummySidebar}
        menuItemActive={false}
        toggle={dummyToggle}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
