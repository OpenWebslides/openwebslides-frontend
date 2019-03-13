// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSigninPage } from '.';

describe(`SigninPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSigninPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
