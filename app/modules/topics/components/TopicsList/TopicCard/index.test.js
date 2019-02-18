// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyTopicData } from 'lib/testResources';

import actions from '../../../actions';
import * as m from '../../../model';

import TopicCard, { PureTopicCard } from '.';

describe(`TopicCard`, (): void => {

  let dummyTopic: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnRemoveTopic: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: true };
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
    };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        topics: {
          ...dummyInitialState.modules.topics,
          byId: dummyTopicsById,
        },
      },
    };
    dummyDispatch = jest.fn();
    dummyOnRemoveTopic = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicCard
        topicId={dummyTopic.id}
        isCurrentUser={true}
        onRemoveTopic={dummyOnRemoveTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`fetches the topic, when the topic was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard
          topicId={dummyTopic.id}
          isCurrentUser={true}
          onRemoveTopic={dummyOnRemoveTopic}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-card"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic card, when the topic was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard
          topicId={dummyTopic.id}
          isCurrentUser={true}
          onRemoveTopic={dummyOnRemoveTopic}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-card"]').hostNodes()).toHaveLength(1);
  });

  it(`renders an empty description indicator, when the topic description is NULL`, (): void => {
    // $FlowFixMe ignore immutability for testing purposes
    dummyTopic.description = null;

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard
          topicId={dummyTopic.id}
          isCurrentUser={true}
          onRemoveTopic={dummyOnRemoveTopic}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-card-no-description"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render edit and remove buttons, when isCurrentUser is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard
          topicId={dummyTopic.id}
          isCurrentUser={false}
          onRemoveTopic={dummyOnRemoveTopic}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-card-remove-button"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="topic-card-edit-button"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="topic-card-view-button"]').hostNodes()).toHaveLength(1);
  });

  it(`renders view, edit and remove buttons, when isCurrentUser is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard
          topicId={dummyTopic.id}
          isCurrentUser={true}
          onRemoveTopic={dummyOnRemoveTopic}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-card-remove-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-card-edit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-card-view-button"]').hostNodes()).toHaveLength(1);
  });

  it(`shows the remove modal when the remove button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard
          topicId={dummyTopic.id}
          isCurrentUser={true}
          onRemoveTopic={dummyOnRemoveTopic}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureRemoveTopicModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="topic-card-remove-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PureRemoveTopicModal').props().isOpen).toBe(true);
  });

  it(`closes the remove modal when the onCancel handler passed to the RemoveTopicModal is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard
          topicId={dummyTopic.id}
          isCurrentUser={true}
          onRemoveTopic={dummyOnRemoveTopic}
        />
      </DummyProviders>,
    );

    const onCancel = enzymeWrapper.find('PureRemoveTopicModal').props().onCancel;

    expect(enzymeWrapper.find('PureRemoveTopicModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="topic-card-remove-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PureRemoveTopicModal').props().isOpen).toBe(true);
    onCancel();
    enzymeWrapper.update();
    expect(enzymeWrapper.find('PureRemoveTopicModal').props().isOpen).toBe(false);
  });

  it(`calls the passed onRemoveTopic function, when the onSubmit handler passed to the RemoveTopicModal is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard
          topicId={dummyTopic.id}
          isCurrentUser={true}
          onRemoveTopic={dummyOnRemoveTopic}
        />
      </DummyProviders>,
    );

    const onSubmit = enzymeWrapper.find('PureRemoveTopicModal').props().onSubmit;

    expect(enzymeWrapper.find('PureRemoveTopicModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="topic-card-remove-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PureRemoveTopicModal').props().isOpen).toBe(true);
    onSubmit(dummyTopic.id);
    enzymeWrapper.update();
    expect(enzymeWrapper.find('PureRemoveTopicModal').props().isOpen).toBe(false);
    expect(dummyOnRemoveTopic).toHaveBeenCalledWith(dummyTopic.id);
  });

});
