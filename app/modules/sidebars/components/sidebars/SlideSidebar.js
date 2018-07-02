// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { State } from 'types/state';

import Slides from 'core-components/slides/Slides';

import topics from 'modules/topics';

import contentItems, { contentItemTypes } from 'modules/contentItems';
import type { DenormalizedRootContentItem } from 'modules/contentItems';

type Topic = topics.model.Topic;

type StateProps = {
  // Slide takes a denormalized root contentItem instead of a root contentItem id, because in a
  // later stage the contentItem tree passed to the slide needs to be transformed further
  // (for example, by splitting up sections and inserting repeated headers if a section is longer
  // than a single slide) and the contentItem tree can't just be extracted from the state directly.
  contentItemTreeRootItem: DenormalizedRootContentItem,
};

type PassedProps = {
  topic: Topic,
};

type Props = StateProps & PassedProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { topic } = props;

  const contentItemTreeRootItemId = topic.rootContentItemId;

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
    <div className="sidebar__slide">
      <Slides contentItemTreeRootItem={contentItemTreeRootItem} />
    </div>
  );
};

const SlideSidebar = connect(mapStateToProps)(PureSlideSidebar);

export { PureSlideSidebar };
export default SlideSidebar;
