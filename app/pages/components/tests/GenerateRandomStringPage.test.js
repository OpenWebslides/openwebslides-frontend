// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyRouterMatchProps } from 'config/tests';

import { PureGenerateRandomStringPage } from '../GenerateRandomStringPage';

describe(`GenerateRandomStringPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureGenerateRandomStringPage
        {...dummyRouterMatchProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
