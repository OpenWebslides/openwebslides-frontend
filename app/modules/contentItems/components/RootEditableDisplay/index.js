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
  select: (selection: m.SelectionType, currentlySelectedId: ?string) => void,
  clearSelection: () => void,
  toggleEditing: (id: ?string) => void,
|};

type Props = {| ...PassedProps, ...StateProps, ...DispatchProps |};

const handleKeys = [
  'up',
  'down',
  'left',
  'right',
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
  const { rootContentItemId } = props;

  return {
    select: (selection: m.SelectionType, currentlySelectedId: ?string): void => {
      if (currentlySelectedId == null) {
        // Set the root content item as default selection
        dispatch(actions.setCurrentlySelectedInState(rootContentItemId));
      }
      else dispatch(actions.selectInState(selection));
    },
    clearSelection: (): void => {
      dispatch(actions.setCurrentlySelectedInState(null));
    },
    toggleEditing: (id: ?string): void => {
      if (id != null) dispatch(actions.toggleEditing(id, true));
    },
  };
};

class PureRootEditableDisplay extends React.Component<Props> {
  handleKeyEvent = (key: string, event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const { select, clearSelection, toggleEditing, currentlySelectedId } = this.props;

    event.preventDefault();

    switch (key) {
      case 'up':
        select(m.selectionTypes.PREVIOUS, currentlySelectedId);
        break;
      case 'down':
        select(m.selectionTypes.NEXT, currentlySelectedId);
        break;
      case 'left':
        select(m.selectionTypes.SUPER, currentlySelectedId);
        break;
      case 'right':
        select(m.selectionTypes.SUB, currentlySelectedId);
        break;
      case 'enter':
        toggleEditing(currentlySelectedId);
        break;
      case 'esc':
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
