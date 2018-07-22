// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureAuthPage } from '.';

describe(`AuthPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAuthPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
