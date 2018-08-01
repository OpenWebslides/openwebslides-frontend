// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps, dummyTopicData } from 'lib/testResources';

import { PureTopicCard } from '.';

describe(`TopicCard`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = { ...dummyTopicData.topic };
    const dummyOnRemoveButtonClick = jest.fn();

    const enzymeWrapper = shallow(
      <PureTopicCard
        {...dummyProviderProps.translatorProps}
        topicId={dummyTopic.id}
        topic={dummyTopic}
        onRemoveButtonClick={dummyOnRemoveButtonClick}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
