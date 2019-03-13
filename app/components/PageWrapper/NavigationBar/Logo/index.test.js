// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureLogo } from '.';

describe(`Logo`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureLogo />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
