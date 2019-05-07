// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyContentItemData as dummyData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import RootEditableDisplay, { PureRootEditableDisplay, mapDispatchToProps } from '.';

describe(`RootEditableDisplay`, (): void => {

  let dummyId: string;
  let dummyRootContentItem: m.RootContentItem;
  let dummyState: any;
  let dummyUnselectedState: any;
  let dummyDispatch: any;
  let dummyDispatchProps: any;

  let dummyEvent: any;
  let dummySetTopicDirty: any;

  beforeEach((): void => {
    dummyId = 'dummyId';
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
    dummyDispatchProps = {
      select: jest.fn(),
      selectId: jest.fn(),
      onStartEditing: jest.fn(),
      onEndEditing: jest.fn(),
      onEditPlainText: jest.fn(),
      onAddEmptySubItem: jest.fn(),
      onAddEmptySiblingItemBelow: jest.fn(),
      onRemove: jest.fn(),
      onIndent: jest.fn(),
      onReverseIndent: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn(),
    };

    dummyEvent = { preventDefault: jest.fn() };
    dummySetTopicDirty = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRootEditableDisplay
        rootContentItemId={dummyRootContentItem.id}
        setTopicDirty={dummySetTopicDirty}
        {...dummyDispatchProps}
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

    expect(dummyEvent.preventDefault).not.toHaveBeenCalled();
    expect(dummyDispatch).not.toHaveBeenCalled();
  });

  it(`dispatches a SET_CURRENTLY_SELECTED_IN_STATE action with the passed rootContentItemId when an UP/DOWN/LEFT/RIGHT key is pressed and there is no currently selected contentItem`, (): void => {
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

  it(`calls the passed setTopicDirty function and dispatches an UNINDENT action with the correct arguments when the META+LEFT key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('meta+left', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.reverseIndent(dummyRootContentItem.id));
  });

  it(`calls the passed setTopicDirty function and dispatches an INDENT action with the correct arguments when the META+RIGHT key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('meta+right', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.indent(dummyRootContentItem.id));
  });

  it(`calls the passed setTopicDirty function and dispatches an UNINDENT action with the correct arguments when the CTRL+LEFT key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('ctrl+left', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.reverseIndent(dummyRootContentItem.id));
  });

  it(`calls the passed setTopicDirty function and dispatches an INDENT action with the correct arguments when the CTRL+RIGHT key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <RootEditableDisplay
          rootContentItemId={dummyRootContentItem.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('PureRootEditableDisplay').instance(): any).handleKeyEvent('ctrl+right', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.indent(dummyRootContentItem.id));
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

    expect(dummyEvent.preventDefault).not.toHaveBeenCalled();
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

  describe(`mapDispatchToProps`, (): void => {

    it(`dispatches the correct TOGGLE_EDITING action, when onStartEditing is called`, (): void => {
      mapDispatchToProps(dummyDispatch, ({}: any)).onStartEditing(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.toggleEditing(dummyId, true));
    });

    it(`dispatches the correct TOGGLE_EDITING action, when onEndEditing is called`, (): void => {
      mapDispatchToProps(dummyDispatch, ({}: any)).onEndEditing(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.toggleEditing(dummyId, false));
    });

    it(`dispatches the correct EDIT action and calls setTopicDirty, when onEditPlainText is called`, (): void => {
      const dummyText = 'Lorem ipsum';
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onEditPlainText(dummyId, dummyText);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.edit(dummyId, { text: dummyText }));
    });

    it(`dispatches the correct ADD action and calls setTopicDirty, when onAddEmptySubItem is called`, (): void => {
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onAddEmptySubItem(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.add(
        m.contentItemTypes.PARAGRAPH,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyId,
          indexInSiblingItems: 0,
        },
        { text: '' },
      ));
    });

    it(`dispatches the correct ADD action and calls setTopicDirty, when onAddEmptySiblingItemBelow is called`, (): void => {
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onAddEmptySiblingItemBelow(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.add(
        m.contentItemTypes.PARAGRAPH,
        {
          contextType: m.contextTypes.SIBLING,
          contextItemId: dummyId,
          indexInSiblingItemsShift: 0,
        },
        { text: '' },
      ));
    });

    it(`dispatches the correct REMOVE_AND_TOGGLE_PREVIOUS_ITEM action and calls setTopicDirty, when onRemove is called`, (): void => {
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onRemove(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.removeAndTogglePreviousItem(dummyId));
    });

    it(`dispatches the correct INDENT action and calls setTopicDirty, when onIndent is called`, (): void => {
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onIndent(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.indent(dummyId));
    });

    it(`dispatches the correct REVERSE_INDENT action and calls setTopicDirty, when onReverseIndent is called`, (): void => {
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onReverseIndent(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.reverseIndent(dummyId));
    });

    it(`dispatches the correct SET_CURRENTLY_SELECTED_IN_STATE action, when onFocus is called`, (): void => {
      mapDispatchToProps(dummyDispatch, ({}: any)).onFocus(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.setCurrentlySelectedInState(dummyId));
    });

    it(`dispatches the correct SET_CURRENTLY_SELECTED_IN_STATE action, when onBlur is called`, (): void => {
      mapDispatchToProps(dummyDispatch, ({}: any)).onBlur();
      expect(dummyDispatch).toHaveBeenCalledWith(actions.setCurrentlySelectedInState(null));
    });

  });

});
