// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import type { State } from 'types/state';
import contentItems, { contentItemTypes } from 'modules/content-items';
import type { DenormalizedContentItem } from 'modules/content-items';
import Slide from 'core-components/slides/Slide';

import Page from '../Page';

type PassedProps = {};

type StateProps = {
  contentItemTreeRootItem: DenormalizedContentItem,
};

type Props = TranslatorProps & StateProps & PassedProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const contentItemTreeRootItemId = 'qyrgv0bcd6'; // 'w4lg2u0p1h'; // #TODO stub
  const contentItemTreeRootItem = contentItems.selectors.getDenormalizedById(
    state,
    { id: contentItemTreeRootItemId },
  );

  if (contentItemTreeRootItem == null) {
    throw new Error(`ContentItem with id "${contentItemTreeRootItemId}" could not be found.`);
  }
  else if (contentItemTreeRootItem.type !== contentItemTypes.ROOT) {
    throw new Error('Not a ROOT contentItem.');
  }

  return {
    contentItemTreeRootItem,
  };
};

const PureTempSlideTestPage = (props: Props): React.Node => {
  const { contentItemTreeRootItem } = props;

  return (
    <Page>
      <Slide contentItemTreeRootItem={contentItemTreeRootItem} />
    </Page>
  );
};

const TempSlideTestPage = connect(mapStateToProps)(translate()(PureTempSlideTestPage));

export { PureTempSlideTestPage };
export default TempSlideTestPage;
