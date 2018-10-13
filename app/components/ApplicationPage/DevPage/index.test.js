// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureDevPage } from '.';

describe(`DevPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureDevPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
