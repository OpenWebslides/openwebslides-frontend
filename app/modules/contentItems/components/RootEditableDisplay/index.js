// @flow

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
  clearSelection: () => void,
  toggleEditing: (id: string) => void,
  indent: (id: string) => void,
  reverseIndent: (id: string) => void,
|};

type Props = {| ...PassedProps, ...StateProps, ...DispatchProps |};

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
    clearSelection: (): void => {
      dispatch(actions.setCurrentlySelectedInState(null));
    },
    toggleEditing: (id: string): void => {
      dispatch(actions.toggleEditing(id, true));
    },
    indent: (id: string): void => {
      setTopicDirty(true);
      dispatch(actions.indent(id));
    },
    reverseIndent: (id: string): void => {
      setTopicDirty(true);
      dispatch(actions.reverseIndent(id));
    },
  };
};

class PureRootEditableDisplay extends React.Component<Props> {
  handleKeyEvent = (key: string, event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const {
      rootContentItemId,
      select,
      selectId,
      clearSelection,
      toggleEditing,
      currentlySelectedId,
      indent,
      reverseIndent,
    } = this.props;

    switch (key) {
      case 'up':
        event.preventDefault();
        // Set the root content item as default selection
        if (currentlySelectedId == null) selectId(rootContentItemId);
        else select(m.selectionTypes.PREVIOUS);

        break;
      case 'down':
        event.preventDefault();
        // Set the root content item as default selection
        if (currentlySelectedId == null) selectId(rootContentItemId);
        else select(m.selectionTypes.NEXT);

        break;
      case 'left':
        event.preventDefault();
        // Set the root content item as default selection
        if (currentlySelectedId == null) selectId(rootContentItemId);
        else select(m.selectionTypes.SUPER);

        break;
      case 'right':
        event.preventDefault();
        // Set the root content item as default selection
        if (currentlySelectedId == null) selectId(rootContentItemId);
        else select(m.selectionTypes.SUB);

        break;
      case 'meta+left':
      case 'ctrl+left':
        if (currentlySelectedId == null) break;

        event.preventDefault();
        reverseIndent(currentlySelectedId);
        break;
      case 'meta+right':
      case 'ctrl+right':
        if (currentlySelectedId == null) break;

        event.preventDefault();
        indent(currentlySelectedId);
        break;
      case 'enter':
        if (currentlySelectedId == null) break;

        event.preventDefault();
        toggleEditing(currentlySelectedId);
        break;
      case 'esc':
        event.preventDefault();
        clearSelection();
        break;
      default:
        break;
    }
  };

  render(): React.Node {
    const { rootContentItemId, setTopicDirty } = this.props;

    return (
      <>
        <KeyboardEventHandler
          handleKeys={handleKeys}
          onKeyEvent={this.handleKeyEvent}
          handleFocusableElements={true}
        />
        <EditableDisplay
          contentItemId={rootContentItemId}
          setTopicDirty={setTopicDirty}
        />
      </>
    );
  }
}

const RootEditableDisplay = connect(mapStateToProps, mapDispatchToProps)(PureRootEditableDisplay);

export { PureRootEditableDisplay };
export type { DispatchProps };
export default RootEditableDisplay;
