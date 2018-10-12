// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureUserPage } from '.';

describe(`UserPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUserPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
