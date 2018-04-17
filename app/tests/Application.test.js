// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureApplication } from '../Application';

describe(`Application.js`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureApplication />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
