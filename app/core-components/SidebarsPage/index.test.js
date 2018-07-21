// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebarsPage } from '.';

describe(`SidebarsPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarsPage activeSidebarsCount={1} topicId="dummyTopicId">
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </PureSidebarsPage>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});

