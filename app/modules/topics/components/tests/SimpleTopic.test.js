// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSimpleTopic } from '../SimpleTopic';

describe(`SimpleTopic`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      userId: '1234567890',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };

    const enzymeWrapper = shallow(
      <PureSimpleTopic
        topicId="abcdefghij"
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
