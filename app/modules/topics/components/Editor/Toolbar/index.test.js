// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyTopicData } from 'lib/testResources';
import contentItems from 'modules/contentItems';

import * as m from '../../../model';
import actions from '../../../actions';

import Toolbar, { PureToolbar } from '.';

describe(`Toolbar`, (): void => {

  let dummyTopic: m.Topic;
  let dummyId: string;

  let dummyState: any;
  let dummyUnselectedState: any;
  let dummyDispatch: any;

  let dummyOnInsertContentItem: any;

  let dummyEvent: any;

  beforeEach((): void => {
    dummyTopic = dummyTopicData.topic;
    dummyId = 'dummyId';

    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        contentItems: {
          ...dummyInitialState.modules.contentItems,
          currentlySelectedId: dummyId,
        },
      },
    };
    dummyUnselectedState = {
      ...dummyState,
      modules: {
        ...dummyState.modules,
        contentItems: {
          ...dummyState.modules.contentItems,
          currentlySelectedId: null,
        },
      },
    };
    dummyDispatch = jest.fn();

    dummyOnInsertContentItem = jest.fn();

    dummyEvent = { preventDefault: jest.fn() };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureToolbar topic={dummyTopic} onInsertContentItem={dummyOnInsertContentItem} currentlySelectedId={null} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  describe(`when the HEADING button is clicked`, (): void => {

    it(`dispatches a content items ADD action with the right arguments when the current selection is not empty`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Toolbar topic={dummyTopic} />
        </DummyProviders>,
      );

      enzymeWrapper.find('[data-test-id="toolbar-heading-button"]').hostNodes().simulate('mousedown', dummyEvent);
      expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);

      enzymeWrapper.find('[data-test-id="toolbar-heading-button"]').hostNodes().simulate('click');
      expect(dummyDispatch).toHaveBeenCalledWith(contentItems.actions.add(
        contentItems.model.contentItemTypes.HEADING,
        {
          contextType: contentItems.model.contextTypes.SIBLING,
          contextItemId: dummyId,
        },
        { text: 'Untitled heading' },
      ));
      expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, true));
    });

    it(`dispatches a content items ADD action with the right arguments when the current selection is empty`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyUnselectedState} dummyDispatch={dummyDispatch}>
          <Toolbar topic={dummyTopic} />
        </DummyProviders>,
      );

      enzymeWrapper.find('[data-test-id="toolbar-heading-button"]').hostNodes().simulate('mousedown', dummyEvent);
      expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);

      enzymeWrapper.find('[data-test-id="toolbar-heading-button"]').hostNodes().simulate('click');
      expect(dummyDispatch).toHaveBeenCalledWith(contentItems.actions.add(
        contentItems.model.contentItemTypes.HEADING,
        {
          contextType: contentItems.model.contextTypes.SUPER,
          contextItemId: dummyTopic.rootContentItemId,
          indexInSiblingItems: -1,
        },
        { text: 'Untitled heading' },
      ));
      expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, true));
    });

  });

  describe(`when the PARAGRAPH button is clicked`, (): void => {

    it(`dispatches a content items ADD action with the right arguments when the current selection is not empty`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Toolbar topic={dummyTopic} />
        </DummyProviders>,
      );

      enzymeWrapper.find('[data-test-id="toolbar-paragraph-button"]').hostNodes().simulate('mousedown', dummyEvent);
      expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);

      enzymeWrapper.find('[data-test-id="toolbar-paragraph-button"]').hostNodes().simulate('click');
      expect(dummyDispatch).toHaveBeenCalledWith(contentItems.actions.add(
        contentItems.model.contentItemTypes.PARAGRAPH,
        {
          contextType: contentItems.model.contextTypes.SIBLING,
          contextItemId: dummyId,
        },
        { text: 'Untitled heading' },
      ));
      expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, true));
    });

    it(`dispatches a content items ADD action with the right arguments when the current selection is empty`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyUnselectedState} dummyDispatch={dummyDispatch}>
          <Toolbar topic={dummyTopic} />
        </DummyProviders>,
      );

      enzymeWrapper.find('[data-test-id="toolbar-paragraph-button"]').hostNodes().simulate('mousedown', dummyEvent);
      expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);

      enzymeWrapper.find('[data-test-id="toolbar-paragraph-button"]').hostNodes().simulate('click');
      expect(dummyDispatch).toHaveBeenCalledWith(contentItems.actions.add(
        contentItems.model.contentItemTypes.PARAGRAPH,
        {
          contextType: contentItems.model.contextTypes.SUPER,
          contextItemId: dummyTopic.rootContentItemId,
          indexInSiblingItems: -1,
        },
        { text: 'Untitled heading' },
      ));
      expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, true));
    });

  });

  describe(`when the BLOCKQUOTE button is clicked`, (): void => {

    it(`dispatches a content items ADD action with the right arguments when the current selection is not empty`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Toolbar topic={dummyTopic} />
        </DummyProviders>,
      );

      enzymeWrapper.find('[data-test-id="toolbar-blockquote-button"]').hostNodes().simulate('mousedown', dummyEvent);
      expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);

      enzymeWrapper.find('[data-test-id="toolbar-blockquote-button"]').hostNodes().simulate('click');
      expect(dummyDispatch).toHaveBeenCalledWith(contentItems.actions.add(
        contentItems.model.contentItemTypes.BLOCKQUOTE,
        {
          contextType: contentItems.model.contextTypes.SIBLING,
          contextItemId: dummyId,
        },
        { text: 'Untitled heading' },
      ));
      expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, true));
    });

    it(`dispatches a content items ADD action with the right arguments when the current selection is empty`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyUnselectedState} dummyDispatch={dummyDispatch}>
          <Toolbar topic={dummyTopic} />
        </DummyProviders>,
      );

      enzymeWrapper.find('[data-test-id="toolbar-blockquote-button"]').hostNodes().simulate('mousedown', dummyEvent);
      expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);

      enzymeWrapper.find('[data-test-id="toolbar-blockquote-button"]').hostNodes().simulate('click');
      expect(dummyDispatch).toHaveBeenCalledWith(contentItems.actions.add(
        contentItems.model.contentItemTypes.BLOCKQUOTE,
        {
          contextType: contentItems.model.contextTypes.SUPER,
          contextItemId: dummyTopic.rootContentItemId,
          indexInSiblingItems: -1,
        },
        { text: 'Untitled heading' },
      ));
      expect(dummyDispatch).toHaveBeenCalledWith(actions.setDirtyInState(dummyTopic.id, true));
    });

  });

});
