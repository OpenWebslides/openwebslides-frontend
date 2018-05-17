// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebarMenuItem } from '../SidebarMenuItem';

describe(`SidebarMenuItem`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarMenuItem
        icon="image"
        sidebarName="SidebarName/SLIDE"
        toggle={(): void => {}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
