// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { State } from 'types/state';

import Slides from 'core-components/slides/Slides';

import topics from 'modules/topics';
import type { Identifier } from 'types/model';

import contentItems, { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';
import authentication from 'modules/authentication';
import type { SlideStyling } from 'modules/slide-styling';
import { getAllSlideStylingIdsByUserId, getById } from '../../../slide-styling/selectors';

const { getAccount } = authentication.selectors;

type Topic = topics.model.Topic;

type StateProps = {
  // Slide takes a denormalized root contentItem instead of a root contentItem id, because in a
  // later stage the contentItem tree passed to the slide needs to be transformed further
  // (for example, by splitting up sections and inserting repeated headers if a section is longer
  // than a single slide) and the contentItem tree can't just be extracted from the state directly.
  contentItemTreeRootItem: DenormalizedRootContentItem,

  slideStylingItem: SlideStyling,
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

  const account = getAccount(state);

  const currentUser = account != null ? account.id : 'akqmq5ds5';

  const slideStylingIds: Array<Identifier> = getAllSlideStylingIdsByUserId(state, currentUser);
  const slideStylingItem: SlideStyling = getById(state, { id: slideStylingIds[0] });

  return {
    contentItemTreeRootItem,
    slideStylingItem,
  };
};

const PureSlideSidebar = (props: Props): React.Node => {
  const {
    contentItemTreeRootItem,
    slideStylingItem,
  } = props;

  return (
    <div className="sidebar__slide">
      <Slides
        contentItemTreeRootItem={contentItemTreeRootItem}
        slideStyling={slideStylingItem}
      />
    </div>
  );
};

const SlideSidebar = connect(mapStateToProps)(PureSlideSidebar);

export { PureSlideSidebar };
export default SlideSidebar;
