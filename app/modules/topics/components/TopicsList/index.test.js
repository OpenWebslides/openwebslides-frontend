// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyProviderProps, dummyTopicData } from 'lib/testResources';

import * as m from '../../model';

import TopicsList, { PureTopicsList } from '.';

describe(`TopicsList`, (): void => {

  let dummyTopic2: m.Topic;
  let dummyTopic1: m.Topic;
  let dummyTopicIds: $ReadOnlyArray<string>;
  let dummyState: any;

  beforeEach((): void => {
    dummyTopic2 = { ...dummyTopicData.topic2 };
    dummyTopic1 = { ...dummyTopicData.topic };
    dummyTopicIds = [dummyTopic1.id, dummyTopic2.id];
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        topics: {
          ...dummyInitialState.modules.topics,
          byId: {
            [dummyTopic1.id]: dummyTopic1,
            [dummyTopic2.id]: dummyTopic2,
          },
        },
      },
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicsList
        {...dummyProviderProps.translatorProps}
        topicIds={[]}
        isCurrentUser={false}
        onRemoveTopic={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a new topic button, when isCurrentUser is TRUE`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicsList
        {...dummyProviderProps.translatorProps}
        topicIds={[]}
        isCurrentUser={true}
        onRemoveTopic={jest.fn()}
      />,
    );
    expect(enzymeWrapper.find(`[data-test-id="topics-list-add-button"]`)).toHaveLength(1);
  });

  it(`renders an empty message and no TopicCard, when there are no topics`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <TopicsList topicIds={[]} isCurrentUser={false} onRemoveTopic={jest.fn()} />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find(`[data-test-id="topics-list-empty"]`)).toHaveLength(1);
    expect(enzymeWrapper.find(`PureTopicCard`)).toHaveLength(0);
  });

  it(`renders a TopicCard for each topicId, in reverse order`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <TopicsList topicIds={dummyTopicIds} isCurrentUser={false} onRemoveTopic={jest.fn()} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find(`[data-test-id="topics-list-empty"]`)).toHaveLength(0);

    const topicCardNodes = enzymeWrapper.find(`PureTopicCard`);

    expect(topicCardNodes).toHaveLength(2);
    expect(topicCardNodes.at(0).props().topicId).toBe(dummyTopic2.id);
    expect(topicCardNodes.at(1).props().topicId).toBe(dummyTopic1.id);
  });

});
