// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyRouterProps } from 'config/tests';

import { PureGenerateRandomStringPage } from '.';

describe(`GenerateRandomStringPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureGenerateRandomStringPage
        {...dummyRouterProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
