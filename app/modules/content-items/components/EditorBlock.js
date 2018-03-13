// @flow

import _ from 'lodash';
import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import { subableContentItemTypes } from '../model';
import type { ContentItem, SubableContentItem } from '../model';
import { getById } from '../selectors';

type PassedProps = {
  contentItemId: Identifier,
};

type StateProps = {
  contentItem: ContentItem,
};

type Props = TranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const contentItem = getById(state, props.contentItemId);

  return {
    contentItem,
  };
};

const PureEditorBlock = (props: Props): React.Node => {
  const { contentItem } = props;
  let subableContentItem: ?SubableContentItem;

  if (_.includes(subableContentItemTypes, contentItem.type)) {
    // eslint-disable-next-line flowtype/no-weak-types
    subableContentItem = ((contentItem: any): SubableContentItem);
  }
  else {
    subableContentItem = null;
  }

  return (
    <div>
      <code>
        {JSON.stringify(contentItem)}
      </code>
      { subableContentItem && (
        <div style={{ display: 'block', marginLeft: '2em' }}>
          { subableContentItem.subItemIds.map((id: Identifier) => (
            <EditorBlock key={id} contentItemId={id} />
          ))}
        </div>
      )}
    </div>
  );
};

const EditorBlock = connect(mapStateToProps)(translate()(PureEditorBlock));

export { PureEditorBlock };
export default EditorBlock;
