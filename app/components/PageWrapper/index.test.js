// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PurePageWrapper } from '.';

describe(`PageWrapper`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePageWrapper>
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </PurePageWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
