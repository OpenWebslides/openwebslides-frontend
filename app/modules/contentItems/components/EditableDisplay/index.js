// @flow

import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { ObjectNotFoundError } from 'errors';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

import typesToComponentsMap from './typesToComponentsMap';

type PassedProps = {|
  contentItemId: Identifier,
|};

type StateProps = {|
  contentItem: m.ContentItem,
|};

type DispatchProps = {|
  onStartEditing: (id: Identifier) => void,
  onEndEditing: (id: Identifier) => void,
  onEditPlainText: (id: Identifier, text: string) => void,
  onAddEmptySubItem: (id: Identifier) => void,
  onAddEmptySiblingItemBelow: (id: Identifier) => void,
  onRemove: (id: Identifier) => void,
  onIndent: (id: Identifier) => void,
  onReverseIndent: (id: Identifier) => void,
|};

type Props = {|
  ...PassedProps,
  ...StateProps,
  ...DispatchProps,
|};

const passThroughProps = [
  'onStartEditing',
  'onEndEditing',
  'onEditPlainText',
  'onAddEmptySubItem',
  'onAddEmptySiblingItemBelow',
  'onRemove',
  'onIndent',
  'onReverseIndent',
];

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { contentItemId } = props;
  const contentItem = selectors.getById(state, { id: contentItemId });

  if (contentItem == null) {
    throw new ObjectNotFoundError('contentItems:contentItem', props.contentItemId);
  }

  return {
    contentItem,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>, props: PassedProps): DispatchProps => {
  return {
    onStartEditing: (id: Identifier): void => {
      dispatch(actions.toggleEditing(id, true));
    },
    onEndEditing: (id: Identifier): void => {
      dispatch(actions.toggleEditing(id, false));
    },
    onEditPlainText: (id: Identifier, text: string): void => {
      dispatch(actions.edit(id, { text }));
    },
    onAddEmptySubItem: (id: Identifier): void => {
      dispatch(actions.toggleEditing(id, false));
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
    onAddEmptySiblingItemBelow: (id: Identifier): void => {
      dispatch(actions.toggleEditing(id, false));
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
    onRemove: (id: Identifier): void => {
      dispatch(actions.removeAndTogglePreviousItem(id));
    },
    onIndent: (id: Identifier): void => {
      dispatch(actions.indent(id));
    },
    onReverseIndent: (id: Identifier): void => {
      dispatch(actions.reverseIndent(id));
    },
  };
};

const SubItemsEditableDisplay = (props: Props): React.Node => {
  const { contentItem } = props;

  if (contentItem.subItemIds == null) {
    return null;
  }
  else if (contentItem.subItemIds.length === 0) {
    return null;
  }
  else {
    return (
      <div
        className="content-item-editable-display__sub-items"
        data-test-id="content-item-editable-display__sub-items"
      >
        { /* $FlowFixMe Technically, flow has all the information needed; probably a bug */ }
        {contentItem.subItemIds.map(
          (subItemId: Identifier): React.Node => (
            <EditableDisplay
              {..._.pick(props, passThroughProps)}
              key={subItemId}
              contentItemId={subItemId}
            />
          ),
        )}
      </div>
    );
  }
};

const PureEditableDisplay = (props: Props): React.Node => {
  const { contentItem } = props;
  const DisplayComponent = typesToComponentsMap[contentItem.type];

  return (
    <div
      className="content-item-editable-display"
      data-test-id="content-item-editable-display"
    >
      <DisplayComponent
        {..._.pick(props, passThroughProps)}
        contentItem={contentItem}
      />
      <SubItemsEditableDisplay {...props} />
    </div>
  );
};

const EditableDisplay = connect(mapStateToProps, mapDispatchToProps)(PureEditableDisplay);

export { PureEditableDisplay, passThroughProps, mapDispatchToProps };
export type { DispatchProps };
export default EditableDisplay;
