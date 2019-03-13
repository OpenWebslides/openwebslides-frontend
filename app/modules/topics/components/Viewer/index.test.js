// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { push } from 'connected-react-router';

import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import { DummyProviders, dummyInitialState, dummyTopicData } from 'lib/testResources';
import makeRoute from 'lib/makeRoute';

import actions from '../../actions';
import * as m from '../../model';

import Viewer, { PureViewer } from '.';

describe(`Viewer`, (): void => {

  let dummyUserId: string;
  let dummyTopic: m.Topic;
  let dummyTopic2: m.Topic;
  let dummyTopicNoDesc: m.Topic;
  let dummyTopicEmptyDesc: m.Topic;
  let upstreamTopic: m.Topic;
  let downstreamTopic: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnForkTopic: any;

  let dummyOnEdit: any;

  beforeEach((): void => {
    dummyUserId = 'someDummyUserId';
    dummyTopic = { ...dummyTopicData.topic, userId: dummyUserId, isContentFetched: true };
    dummyTopic2 = { ...dummyTopicData.topic2, isContentFetched: true };
    dummyTopicNoDesc = { ...dummyTopicData.topic, id: 'dummyTopicNoDesc', description: null, isContentFetched: true };
    dummyTopicEmptyDesc = { ...dummyTopicData.topic, id: 'dummyTopicEmptyDesc', description: '', isContentFetched: true };
    upstreamTopic = { ...dummyTopicData.upstream, isContentFetched: true };
    downstreamTopic = { ...dummyTopicData.downstream, isContentFetched: true };
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
      [dummyTopic2.id]: dummyTopic2,
      [dummyTopicNoDesc.id]: dummyTopicNoDesc,
      [dummyTopicEmptyDesc.id]: dummyTopicEmptyDesc,
      [upstreamTopic.id]: upstreamTopic,
      [downstreamTopic.id]: downstreamTopic,
    };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        topics: {
          ...dummyInitialState.modules.topics,
          byId: dummyTopicsById,
        },
        platform: {
          ...dummyInitialState.modules.platform,
          userAuth: { userId: dummyUserId, apiToken: '' },
        },
      },
    };
    dummyDispatch = jest.fn();
    dummyOnForkTopic = jest.fn();

    dummyOnEdit = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureViewer
        topicId={dummyTopic.id}
        topic={dummyTopic}
        currentUserId={dummyUserId}
        onForkTopic={dummyOnForkTopic}
        onEdit={dummyOnEdit}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the topic, when the topic or its content was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetchWithContent(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-viewer"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic viewer, when the topic and its content were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer"]').hostNodes()).toHaveLength(1);
  });

  it(`shows the description when the topic has a description`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-viewer-description"]').text()).toContain(dummyTopic.description);
  });

  it(`shows a placeholder when the topic has no description`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopicNoDesc.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-viewer-no-description"]').hostNodes()).toHaveLength(1);
  });

  it(`shows a placeholder when the topic has an empty description`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopicEmptyDesc.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-viewer-no-description"]').hostNodes()).toHaveLength(1);
  });

  it(`shows the share modal when the share button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureShareModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="topic-viewer-share-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PureShareModal').props().isOpen).toBe(true);
  });

  it(`closes the share modal when the onCancel handler passed to the share modal is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    const onCancel = enzymeWrapper.find('PureShareModal').props().onCancel;

    expect(enzymeWrapper.find('PureShareModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="topic-viewer-share-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PureShareModal').props().isOpen).toBe(true);
    onCancel();
    enzymeWrapper.update();
    expect(enzymeWrapper.find('PureShareModal').props().isOpen).toBe(false);
  });

  it(`renders the topic fork button and no fork info, when the topic does not have an upstream`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={upstreamTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer-fork-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('PureForkInfo')).toHaveLength(0);
  });

  it(`renders the disabled topic fork button and fork info, when the topic has an upstream`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={downstreamTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer-fork-button"][disabled]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('PureForkInfo')).not.toHaveLength(0);
  });

  it(`renders the enabled topic fork button, when there is a user signed in`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={upstreamTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-viewer-fork-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer-fork-button"][disabled]').hostNodes()).toHaveLength(0);
  });

  it(`renders the disabled topic fork button, when there is no user signed in`, (): void => {
    _.unset(dummyState, 'modules.platform.userAuth');

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={downstreamTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-viewer-fork-button"][disabled]').hostNodes()).toHaveLength(1);
  });

  it(`calls the passed onForkTopic function, when the fork button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="topic-viewer-fork-button"]').hostNodes().simulate('click');
    expect(dummyOnForkTopic).toHaveBeenCalledWith(dummyTopic.id);
  });

  it(`enables the edit button when the user can edit`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-viewer-edit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer-edit-button"][disabled]').hostNodes()).toHaveLength(0);
  });

  it(`disables the edit button when the user cannot edit`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic2.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-viewer-edit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer-edit-button"][disabled]').hostNodes()).toHaveLength(1);
  });

  it(`disables the edit button when there is no user signed in`, (): void => {
    _.unset(dummyState, 'modules.platform.userAuth');

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-viewer-edit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-viewer-edit-button"][disabled]').hostNodes()).toHaveLength(1);
  });

  it(`dispatches a PUSH action when the edit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Viewer topicId={dummyTopic.id} onForkTopic={dummyOnForkTopic} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="topic-viewer-edit-button"]').hostNodes().simulate('click');
    expect(dummyDispatch).toHaveBeenCalledWith(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId: dummyTopic.id })));
  });

});
