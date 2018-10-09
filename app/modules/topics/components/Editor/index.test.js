// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import Editor, { PureEditor } from '.';

describe(`Editor`, (): void => {

  let dummyTopic: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnSave: any;
  let dummySetDirty: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: true };
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
    };
    dummyState = { modules: {
      asyncRequests: { byId: {} },
      contentItems: { byId: {} },
      topics: { byId: dummyTopicsById },
    } };
    dummyDispatch = jest.fn();
    dummyOnSave = jest.fn();
    dummySetDirty = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditor
        {...dummyProviderProps.translatorProps}
        topicId={dummyTopic.id}
        onSave={dummyOnSave}
        setDirty={dummySetDirty}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the topic, when the topic or its content was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetchWithContent(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-editor"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic editor, when the topic and its content were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-editor"]').hostNodes()).toHaveLength(1);
  });

  it(`dispatches a topic UPDATE_WITH_CONTENT action, when the save button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyTopic.id} />
      </DummyProviders>,
    );
    enzymeWrapper.find('[data-test-id="topic-editor-save-button"]').hostNodes().simulate('click');

    expect(dummyDispatch).toHaveBeenCalledWith(actions.patchWithContent(dummyTopic.id));
  });

  it(`dispatches a topic SET_DIRTY_IN_STATE action and sets a window.unbeforeunload action, when the setDirty prop is called with TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor
          topicId={dummyTopic.id}
        />
      </DummyProviders>,
    );

    const setDirty = enzymeWrapper.find(`PureEditor`).props().setDirty;
    setDirty(true);

    expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, true));
    expect(window.onbeforeunload).not.toBeNull();
  });

  it(`dispatches a topic SET_DIRTY_IN_STATE action and unsets a window.unbeforeunload action, when the setDirty prop is called with FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor
          topicId={dummyTopic.id}
        />
      </DummyProviders>,
    );

    const setDirty = enzymeWrapper.find(`PureEditor`).props().setDirty;
    setDirty(false);

    expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, false));
    expect(window.onbeforeunload).toBeNull();
  });

  it(`dispatches a topic SET_DIRTY_IN_STATE action, when the setDirty prop is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    const setDirty = enzymeWrapper.find(`PureEditor`).props().setDirty;
    setDirty(true);

    expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, true));
  });

});
