// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureAuthMenu } from '.';

describe(`AuthMenu`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAuthMenu />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
