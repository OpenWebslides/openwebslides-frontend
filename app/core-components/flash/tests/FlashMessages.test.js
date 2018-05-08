// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import FlashMessages from '../FlashMessages';

describe(`FlashMessages`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <FlashMessages />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
