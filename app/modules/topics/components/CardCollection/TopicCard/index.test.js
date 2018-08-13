// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData } from 'lib/testResources';

import actions from '../../../actions';
import * as m from '../../../model';

import TopicCard, { PureTopicCard } from '.';

describe(`TopicCard`, (): void => {

  let dummyTopic: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnRemove: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: true };
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
    };
    dummyState = { modules: {
      apiRequestsStatus: {},
      topics: { byId: dummyTopicsById },
    } };
    dummyDispatch = jest.fn();
    dummyOnRemove = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicCard
        {...dummyProviderProps.translatorProps}
        topicId={dummyTopic.id}
        onRemove={dummyOnRemove}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`fetches the topic, when the topic was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-card"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic card, when the topic was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard topicId={dummyTopic.id} />
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
        <TopicCard topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-card-no-description"]').hostNodes()).toHaveLength(1);
  });

  it(`dispatches a topic REMOVE action, when the remove modal is opened and its submit button clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-card-remove-modal"]').hostNodes()).toHaveLength(0);
    enzymeWrapper.find('[data-test-id="topic-card-remove-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('[data-test-id="topic-card-remove-modal"]').hostNodes()).toHaveLength(1);
    enzymeWrapper.find('[data-test-id="topic-card-remove-modal-submit-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('[data-test-id="topic-card-remove-modal"]').hostNodes()).toHaveLength(0);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.remove(dummyTopic.id));
  });

  it(`does not dispatch a topic REMOVE action, when the remove modal is opened and its cancel button clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicCard topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-card-remove-modal"]').hostNodes()).toHaveLength(0);
    enzymeWrapper.find('[data-test-id="topic-card-remove-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('[data-test-id="topic-card-remove-modal"]').hostNodes()).toHaveLength(1);
    enzymeWrapper.find('[data-test-id="topic-card-remove-modal-cancel-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('[data-test-id="topic-card-remove-modal"]').hostNodes()).toHaveLength(0);
    expect(dummyDispatch).toHaveBeenCalledTimes(0);
  });

});
