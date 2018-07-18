// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PurePage } from '.';

describe(`Page`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePage>
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </PurePage>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
