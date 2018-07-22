// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebarsPageWrapper } from '.';

describe(`SidebarsPageWrapper`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarsPageWrapper activeSidebarsCount={1} topicId="dummyTopicId">
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </PureSidebarsPageWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});

