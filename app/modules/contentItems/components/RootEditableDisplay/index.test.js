// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyContentItemData as dummyData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import RootEditableDisplay, { PureRootEditableDisplay } from '.';

describe(`RootEditableDisplay`, (): void => {

  let dummyRootContentItem: m.RootContentItem;
  let dummyState: any;
  let dummyUnselectedState: any;
  let dummyDispatch: any;

  let dummyEvent: any;
  let dummySetTopicDirty: any;

  beforeEach((): void => {
    dummyRootContentItem = dummyData.rootContentItem;
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        contentItems: {
          ...dummyInitialState.modules.contentItems,
          byId: {
            [dummyRootContentItem.id]: dummyRootContentItem,
          },
          currentlySelectedId: dummyRootContentItem.id,
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

    dummyEvent = { preventDefault: jest.fn() };
    dummySetTopicDirty = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRootEditableDisplay
        rootContentItemId={dummyRootContentItem.id}
        setTopicDirty={dummySetTopicDirty}
        select={jest.fn()}
        clearSelection={jest.fn()}
        toggleEditing={jest.fn()}
        currentlySelectedId="dummyCurrentlySelectedId"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches nothing when an unknown key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyUnselectedState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('r', dummyEvent);

    expect(dummyDispatch).not.toHaveBeenCalled();
  });

  it(`dispatches a SET_CURRENTLY_SELECTED_IN_STATE action with the passed rootContentItemId when a key is pressed and there is no currently selected contentItem`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyUnselectedState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('up', dummyEvent);

    expect(dummyDispatch).toHaveBeenCalledWith(actions.setCurrentlySelectedInState(dummyRootContentItem.id));
  });

  it(`dispatches a SELECT action with the correct arguments when the UP key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('up', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.selectInState(m.selectionTypes.PREVIOUS));
  });

  it(`dispatches a SELECT action with the correct arguments when the DOWN key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('down', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.selectInState(m.selectionTypes.NEXT));
  });

  it(`dispatches a SELECT action with the correct arguments when the LEFT key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('left', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.selectInState(m.selectionTypes.SUPER));
  });

  it(`dispatches a SELECT action with the correct arguments when the RIGHT key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('right', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.selectInState(m.selectionTypes.SUB));
  });

  it(`dispatches a TOGGLE_EDITING action with the correct arguments when the ENTER key is pressed, and there is a currently selected contentItem`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('enter', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.toggleEditing(dummyRootContentItem.id, true));
  });

  it(`dispatches nothing when the ENTER key is pressed, and there is no currently selected contentItem`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyUnselectedState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('enter', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyDispatch).not.toHaveBeenCalled();
  });

  it(`dispatches a SET_CURRENTLY_SELECTED_IN_STATE action with the correct arguments when the ESC key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('esc', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.setCurrentlySelectedInState(null));
  });

});
