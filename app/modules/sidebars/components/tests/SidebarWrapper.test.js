// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebarWrapper } from '../SidebarWrapper';

describe(`SidebarWrapper`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarWrapper
        topicId="abcdefghij"
        sidebars={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
