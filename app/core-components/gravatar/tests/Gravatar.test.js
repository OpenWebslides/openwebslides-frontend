// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import Gravatar from '../Gravatar';

describe(`Gravatar`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <Gravatar
        email="cucumber.tennismatch@email.com"
        size={42}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
