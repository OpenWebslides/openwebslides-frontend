// @flow

import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import {
  contentItemTypes,
  subableContentItemTypes,
  contextTypes,
} from '../../model';
import type {
  ContentItem,
  SubableContentItem,
} from '../../model';
import { getById } from '../../selectors';
import { add, edit, toggleEditing, removeAndTogglePreviousItem } from '../../actions';

import Root from './types/Root';
import Heading from './types/Heading';
import Paragraph from './types/Paragraph';

const DummyDisplayComponent = (): React.Node => (
  <p>Not implemented yet.</p>
);

const contentItemTypesToDisplayComponentMap = {
  [contentItemTypes.ROOT]: Root,
  [contentItemTypes.HEADING]: Heading,
  [contentItemTypes.PARAGRAPH]: Paragraph,
  [contentItemTypes.LIST]: DummyDisplayComponent,
  [contentItemTypes.LIST_ITEM]: DummyDisplayComponent,
  [contentItemTypes.BLOCKQUOTE]: DummyDisplayComponent,
  [contentItemTypes.CODE]: DummyDisplayComponent,
  [contentItemTypes.IMAGE]: DummyDisplayComponent,
  [contentItemTypes.VIDEO]: DummyDisplayComponent,
  [contentItemTypes.AUDIO]: DummyDisplayComponent,
  [contentItemTypes.IFRAME]: DummyDisplayComponent,
  [contentItemTypes.SLIDE_BREAK]: DummyDisplayComponent,
  [contentItemTypes.COURSE_BREAK]: DummyDisplayComponent,
};

type PassedProps = {
  contentItemId: Identifier,
  baseClassName: string,
  subItemsClassNameSuffix: string,
};

type StateProps = {
  contentItem: ContentItem,
};

type DispatchProps = {
  onStartEditing: (id: Identifier) => void,
  onEndEditing: (id: Identifier) => void,
  onEditPlainText: (id: Identifier, text: string) => void,
  onAddEmptySubItem: (id: Identifier) => void,
  onAddEmptySiblingItemBelow: (id: Identifier) => void,
  onRemove: (id: Identifier) => void,
};

type Props = PassedProps & StateProps & DispatchProps;

const passThroughProps = [
  'baseClassName',
  'subItemsClassNameSuffix',
  'onStartEditing',
  'onEndEditing',
  'onEditPlainText',
  'onAddEmptySubItem',
  'onAddEmptySiblingItemBelow',
  'onRemove',
];

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const contentItem = getById(state, { id: props.contentItemId });

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
      dispatch(toggleEditing(id, true));
    },
    onEndEditing: (id: Identifier): void => {
      dispatch(toggleEditing(id, false));
    },
    onEditPlainText: (id: Identifier, text: string): void => {
      dispatch(edit(id, { text }));
    },
    onAddEmptySubItem: (id: Identifier): void => {
      dispatch(toggleEditing(id, false));
      dispatch(add(
        contentItemTypes.PARAGRAPH,
        {
          contextType: contextTypes.SUPER,
          contextItemId: id,
          indexInSiblingItems: 0,
        },
        { text: '' },
      ));
    },
    onAddEmptySiblingItemBelow: (id: Identifier): void => {
      dispatch(toggleEditing(id, false));
      dispatch(add(
        contentItemTypes.PARAGRAPH,
        {
          contextType: contextTypes.SIBLING,
          contextItemId: id,
          indexInSiblingItemsShift: 0,
        },
        { text: '' },
      ));
    },
    onRemove: (id: Identifier): void => {
      dispatch(removeAndTogglePreviousItem(id));
    },
  };
};

const SubItemsEditableDisplay = (props: Props): React.Node => {
  const { contentItem, baseClassName, subItemsClassNameSuffix } = props;

  if (!_.includes(subableContentItemTypes, contentItem.type)) {
    return null;
  }
  else {
    // eslint-disable-next-line flowtype/no-weak-types
    const subableContentItem = (((contentItem: any): SubableContentItem));

    if (subableContentItem.subItemIds.length === 0) {
      return null;
    }
    else {
      return (
        <div className={`${baseClassName}${subItemsClassNameSuffix}`}>
          {subableContentItem.subItemIds.map(
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
  }
};

const PureEditableDisplay = (props: Props): React.Node => {
  const { contentItem, baseClassName } = props;
  const DisplayComponent = contentItemTypesToDisplayComponentMap[contentItem.type];

  return (
    <div className={baseClassName}>
      <DisplayComponent
        {..._.pick(props, passThroughProps)}
        // eslint-disable-next-line flowtype/no-weak-types
        contentItem={(contentItem: any)}
      />
      <SubItemsEditableDisplay {...props} />
    </div>
  );
};

PureEditableDisplay.defaultProps = {
  baseClassName: 'content-item-editable-display',
  subItemsClassNameSuffix: '__sub-items',
};

const EditableDisplay = connect(mapStateToProps, mapDispatchToProps)(PureEditableDisplay);

export { PureEditableDisplay, passThroughProps, mapDispatchToProps, DummyDisplayComponent };
export default EditableDisplay;
