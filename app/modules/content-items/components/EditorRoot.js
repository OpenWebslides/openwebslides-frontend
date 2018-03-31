// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import { getById } from '../selectors';
import { contentItemTypes } from '../model';
import type { RootContentItem } from '../model';

import EditorBlock from './EditorBlock';

type PassedProps = {
  rootContentItemId: Identifier,
};

type StateProps = {
  rootContentItem: RootContentItem,
};

type Props = TranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const rootContentItem = getById(state, { id: props.rootContentItemId });

  if (rootContentItem == null) {
    throw new Error(`ContentItem with id "${props.rootContentItemId}" could not be found.`);
  }
  else if (rootContentItem.type !== contentItemTypes.ROOT) {
    throw new Error('Not a ROOT contentItem.');
  }

  return {
    rootContentItem,
  };
};

const PureEditorRoot = (props: Props): React.Node => {
  const { rootContentItem } = props;

  return (
    <div>
      { rootContentItem.childItemIds.map((id) => (
        <EditorBlock key={id} contentItemId={id} />
      ))}
    </div>
  );
};

const EditorRoot = connect(mapStateToProps)(translate()(PureEditorRoot));

export { PureEditorRoot };
export default EditorRoot;
