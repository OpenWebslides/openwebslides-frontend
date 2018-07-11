// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import { PureTopicCard } from '../TopicCard';

describe(`TopicCard`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      userId: '1234567890',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };
    const dummyOnRemoveButtonClick = jest.fn();

    const enzymeWrapper = shallow(
      <PureTopicCard
        {...dummyTranslatorProps}
        topicId="abcdefghij"
        topic={dummyTopic}
        onRemoveButtonClick={dummyOnRemoveButtonClick}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
