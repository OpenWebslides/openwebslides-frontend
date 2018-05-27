// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebarMenu } from '../SidebarMenu';

describe(`SidebarMenu`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarMenu />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
