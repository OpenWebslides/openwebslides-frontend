// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebarsMenu } from '.';

describe(`SidebarsMenu`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarsMenu />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
