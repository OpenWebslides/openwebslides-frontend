// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebar } from './Sidebar';

describe(`Sidebar`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebar header="Dummy Header" icon="info">
        <p>Content goes here</p>
      </PureSidebar>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
