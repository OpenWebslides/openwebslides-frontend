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
  const rootContentItem = getById(state, props.rootContentItemId);

  if (rootContentItem.type !== contentItemTypes.ROOT) {
    throw new Error('Not a ROOT contentItem.');
  }

  return {
    rootContentItem,
  };
};

const Editor = (props: Props): React.Node => {
  const { t, rootContentItem } = props;

  return (
    <div>
      <p>{t('common:lipsum.long')}</p>
      { rootContentItem.childItemIds.map((id) => (
        <EditorBlock key={id} contentItemId={id} />
      ))}
    </div>
  );
};

export { Editor as PureEditor };
export default connect(mapStateToProps)(translate()(Editor));
