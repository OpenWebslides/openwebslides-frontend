// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSubmitButtonGroup } from '.';

describe(`SubmitButtonGroup`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSubmitButtonGroup />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
