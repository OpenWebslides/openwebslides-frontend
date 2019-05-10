// @flow

import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import { type ModulesAction, type AppState } from 'types/redux';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';
import EditableDisplay from '../EditableDisplay';

type PassedProps = {|
  rootContentItemId: string,
  setTopicDirty: (dirty: boolean) => void,
|};

type StateProps = {|
  currentlySelectedId: ?string,
|};

type DispatchProps = {|
  select: (selection: m.SelectionType) => void,
  selectId: (id: ?string) => void,

  onStartEditing: (id: string) => void,
  onEndEditing: (id: string) => void,
  onEditPlainText: (id: string, text: string) => void,
  onAddEmptySubItem: (id: string) => void,
  onAddEmptySiblingItemBelow: (id: string) => void,
  onRemove: (id: string) => void,
  onIndent: (id: string) => void,
  onReverseIndent: (id: string) => void,
  onFocus: (id: string) => void,
  onBlur: () => void,
|};

type Props = {| ...PassedProps, ...StateProps, ...DispatchProps |};

const passThroughProps = [
  'onStartEditing',
  'onEndEditing',
  'onEditPlainText',
  'onAddEmptySubItem',
  'onAddEmptySiblingItemBelow',
  'onRemove',
  'onIndent',
  'onReverseIndent',
  'onFocus',
  'onBlur',
  'setTopicDirty',
];

const handleKeys = [
  // Selection
  'up',
  'down',
  'left',
  'right',

  // Indent
  'ctrl+left',
  'meta+left',
  'ctrl+right',
  'meta+right',

  // Mode
  'enter',
  'esc',
];

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  return {
    currentlySelectedId: selectors.getCurrentlySelectedId(state),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { setTopicDirty } = props;

  return {
    select: (selection: m.SelectionType): void => {
      dispatch(actions.selectInState(selection));
    },
    selectId: (id: ?string): void => {
      dispatch(actions.setCurrentlySelectedInState(id));
    },
    onStartEditing: (id: string): void => {
      dispatch(actions.toggleEditing(id, true));
    },
    onEndEditing: (id: string): void => {
      dispatch(actions.toggleEditing(id, false));
    },
    onEditPlainText: (id: string, text: string): void => {
      setTopicDirty(true);
      dispatch(actions.edit(id, { text }));
    },
    onAddEmptySubItem: (id: string): void => {
      setTopicDirty(true);
      dispatch(actions.add(
        m.contentItemTypes.PARAGRAPH,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: id,
          indexInSiblingItems: 0,
        },
        { text: '' },
      ));
    },
    onAddEmptySiblingItemBelow: (id: string): void => {
      setTopicDirty(true);
      dispatch(actions.add(
        m.contentItemTypes.PARAGRAPH,
        {
          contextType: m.contextTypes.SIBLING,
          contextItemId: id,
          indexInSiblingItemsShift: 0,
        },
        { text: '' },
      ));
    },
    onRemove: (id: string): void => {
      setTopicDirty(true);
      dispatch(actions.removeAndTogglePreviousItem(id));
    },
    onIndent: (id: string): void => {
      setTopicDirty(true);
      dispatch(actions.indent(id));
    },
    onReverseIndent: (id: string): void => {
      setTopicDirty(true);
      dispatch(actions.reverseIndent(id));
    },
    onFocus: (id: string): void => {
      dispatch(actions.setCurrentlySelectedInState(id));
    },
    onBlur: (): void => {
      dispatch(actions.setCurrentlySelectedInState(null));
    },
  };
};

class PureRootEditableDisplay extends React.Component<Props> {
  handleKeyEvent = (key: string, event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const {
      rootContentItemId,
      select,
      selectId,
      currentlySelectedId,
      onStartEditing,
      onIndent,
      onReverseIndent,
    } = this.props;

    if (key === 'up') {
      event.preventDefault();
      // Set the root content item as default selection
      if (currentlySelectedId == null) selectId(rootContentItemId);
      else select(m.selectionTypes.PREVIOUS);
    }
    else if (key === 'down') {
      event.preventDefault();
      // Set the root content item as default selection
      if (currentlySelectedId == null) selectId(rootContentItemId);
      else select(m.selectionTypes.NEXT);
    }
    else if (key === 'left') {
      event.preventDefault();
      // Set the root content item as default selection
      if (currentlySelectedId == null) selectId(rootContentItemId);
      else select(m.selectionTypes.SUPER);
    }
    else if (key === 'right') {
      event.preventDefault();
      // Set the root content item as default selection
      if (currentlySelectedId == null) selectId(rootContentItemId);
      else select(m.selectionTypes.SUB);
    }
    else if ((key === 'ctrl+left' || key === 'meta+left') && currentlySelectedId != null) {
      event.preventDefault();
      onReverseIndent(currentlySelectedId);
    }
    else if ((key === 'ctrl+right' || key === 'meta+right') && currentlySelectedId != null) {
      event.preventDefault();
      onIndent(currentlySelectedId);
    }
    else if (key === 'enter' && currentlySelectedId != null) {
      event.preventDefault();
      onStartEditing(currentlySelectedId);
    }
    else if (key === 'esc') {
      event.preventDefault();
      selectId(null);
    }
  };

  render(): React.Node {
    const { rootContentItemId, setTopicDirty } = this.props;

    return (
      <div className="root-content-item-editable-display">
        <KeyboardEventHandler
          handleKeys={handleKeys}
          onKeyEvent={this.handleKeyEvent}
          handleFocusableElements={true}
        />
        <EditableDisplay
          {..._.pick(this.props, passThroughProps)}
          contentItemId={rootContentItemId}
          setTopicDirty={setTopicDirty}
        />
      </div>
    );
  }
}

const RootEditableDisplay = connect(mapStateToProps, mapDispatchToProps)(PureRootEditableDisplay);

export { PureRootEditableDisplay, passThroughProps, mapDispatchToProps };
export default RootEditableDisplay;
