// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureNotFoundPage } from '.';

describe(`NotFoundPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNotFoundPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
