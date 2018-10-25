// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData, dummyInitialState } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import Editor, { PureEditor } from '.';

describe(`Editor`, (): void => {

  let dummyTopic: m.Topic;
  let dummyDirtyTopic: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyMessage: string;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnCommitFormSubmit: any;
  let dummyOnSetDirty: any;
  let dummyPreventDefault: any;
  let dummyUnloadEvent: any;

  let dummyAddEventListener: any;
  let dummyRemoveEventListener: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: true };
    dummyDirtyTopic = { ...dummyTopicData.topic, id: 'dummyDirtyTopic', isContentFetched: true, isDirty: true };
    dummyMessage = 'dummyMessage';
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
      [dummyDirtyTopic.id]: dummyDirtyTopic,
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
    dummyMessage = 'dummyMessage';
    dummyDispatch = jest.fn();
    dummyOnCommitFormSubmit = jest.fn();
    dummyOnSetDirty = jest.fn();

    dummyAddEventListener = jest.fn();
    dummyRemoveEventListener = jest.fn();
    dummyPreventDefault = jest.fn();
    dummyUnloadEvent = {
      preventDefault: dummyPreventDefault,
      returnValue: undefined,
    };

    window.addEventListener = dummyAddEventListener;
    window.removeEventListener = dummyRemoveEventListener;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditor
        {...dummyProviderProps.translatorProps}
        topicId={dummyTopic.id}
        onCommitFormSubmit={dummyOnCommitFormSubmit}
        onSetDirty={dummyOnSetDirty}
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

  it(`renders the save modal and submit/cancel buttons when the save button is clicked and the topic is dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyDirtyTopic.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-button"][disabled]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-modal"]').hostNodes()).toHaveLength(0);
    enzymeWrapper.find('[data-test-id="topic-editor-commit-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-modal"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-modal-submit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-modal-cancel-button"]').hostNodes()).toHaveLength(1);

    // Enzyme does not support event propagation yet, so we cannot test out the onSubmit callback by triggering the submit button
    // https://github.com/airbnb/enzyme/issues/308
  });

  it(`hides the save modal when the cancel button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyDirtyTopic.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-button"][disabled]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-modal"]').hostNodes()).toHaveLength(0);
    enzymeWrapper.find('[data-test-id="topic-editor-commit-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-modal"]').hostNodes()).toHaveLength(1);
    enzymeWrapper.find('[data-test-id="topic-editor-commit-modal-cancel-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-modal"]').hostNodes()).toHaveLength(0);
    expect(dummyDispatch).toHaveBeenCalledTimes(0);
  });

  it(`disables the save button when the topic is not dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-editor-commit-button"][disabled]').hostNodes()).toHaveLength(1);
  });

  it(`dispatches a topic UPDATE_CONTENT action, when the topic is dirty and the handleCommitFormSubmit handler is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyDirtyTopic.id} />
      </DummyProviders>,
    );

    const handleCommitFormSubmit = enzymeWrapper.find('PureEditor').instance().handleCommitFormSubmit;
    handleCommitFormSubmit({ message: dummyMessage });

    expect(dummyDispatch).toHaveBeenCalledWith(actions.patchWithContent(dummyDirtyTopic.id, dummyMessage));
  });

  it(`shows only the title, and does not prevent window unloading when the topic is not dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    const beforeUnloadHandler = enzymeWrapper.find(`PureEditor`).instance().beforeUnloadHandler;

    expect(beforeUnloadHandler(dummyUnloadEvent)).toStrictEqual(false);
    expect(dummyPreventDefault).toHaveBeenCalledTimes(0);
    expect(dummyUnloadEvent.returnValue).toBeUndefined();

    expect(enzymeWrapper.find('[data-test-id="topic-editor-title"]').hostNodes().text()).toStrictEqual(dummyTopic.title);
  });

  it(`dispatches a topic SET_DIRTY_IN_STATE action, when the onSetDirty prop is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    const onSetDirty = enzymeWrapper.find(`PureEditor`).props().onSetDirty;
    onSetDirty(true);

    expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, true));
  });

  it(`appends an asterisk to the title, and prevents the window from unloading when the topic is dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyDirtyTopic.id} />
      </DummyProviders>,
    );

    const beforeUnloadHandler = enzymeWrapper.find(`PureEditor`).instance().beforeUnloadHandler;

    expect(beforeUnloadHandler(dummyUnloadEvent)).toStrictEqual(true);
    expect(dummyPreventDefault).toHaveBeenCalled();
    expect(dummyUnloadEvent.returnValue).not.toBeUndefined();

    expect(enzymeWrapper.find('[data-test-id="topic-editor-title"]').hostNodes().text()).toStrictEqual(`${dummyDirtyTopic.title}*`);
  });

  it(`dispatches a topic DISCARD action, when the component is unmounted and the topic is dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyDirtyTopic.id} />
      </DummyProviders>,
    );

    enzymeWrapper.unmount();

    expect(dummyDispatch).toHaveBeenCalledWith(actions.discard(dummyDirtyTopic.id));
  });

  it(`adds and removes a window unload event listener during its lifecycle`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyDirtyTopic.id} />
      </DummyProviders>,
    );

    const beforeUnloadHandler = enzymeWrapper.find(`PureEditor`).instance().beforeUnloadHandler;

    expect(dummyAddEventListener).toHaveBeenCalledWith('beforeunload', beforeUnloadHandler);
    expect(dummyRemoveEventListener).not.toHaveBeenCalledWith('beforeunload', beforeUnloadHandler);

    enzymeWrapper.unmount();

    expect(dummyAddEventListener).toHaveBeenCalledWith('beforeunload', beforeUnloadHandler);
    expect(dummyRemoveEventListener).toHaveBeenCalledWith('beforeunload', beforeUnloadHandler);
  });

  it(`does not dispatch a topic DISCARD action, when the component is unmounted but the topic is not dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Editor topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    enzymeWrapper.unmount();

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
  });

});
