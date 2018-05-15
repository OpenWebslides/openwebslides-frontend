// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import Slide from 'core-components/slides/Slide';

import contentItems, { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';

type StateProps = {
  // Slide takes a denormalized root contentItem instead of a root contentItem id, because in a
  // later stage the contentItem tree passed to the slide needs to be transformed further
  // (for example, by splitting up sections and inserting repeated headers if a section is longer
  // than a single slide) and the contentItem tree can't just be extracted from the state directly.
  contentItemTreeRootItem: DenormalizedRootContentItem,
};

type PassedProps = {
  contentItemTreeRootItemId: Identifier,
};

type Props = StateProps & PassedProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { contentItemTreeRootItemId } = props;
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

const PureSlideSidebar = (props: Props): React.Node => {
  const {
    contentItemTreeRootItem,
  } = props;

  return (
    <React.Fragment>
      <Slide contentItemTreeRootItem={contentItemTreeRootItem} />
    </React.Fragment>
  );
};

const SlideSidebar = connect(mapStateToProps)(PureSlideSidebar);

export { PureSlideSidebar };
export default SlideSidebar;
