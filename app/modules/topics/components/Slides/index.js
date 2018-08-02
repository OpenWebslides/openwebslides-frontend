// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';

import { type State } from 'types/state';
import { ObjectNotFoundError, CorruptedInternalStateError } from 'errors';
import contentItems from 'modules/contentItems';
import split from 'lib/contentItemSplit';
import Slide from 'components/Slide';

import selectors from '../../selectors';

type PassedProps = {|
  topicId: string,
|};

type StateProps = {|
  // A denormalized ROOT item containing the content to be displayed on this slide.
  contentItemTreeRootItem: ?contentItems.model.DenormalizedRootContentItem,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps |};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { topicId } = props;

  const topic = selectors.getById(state, { id: topicId });
  if (topic == null) throw new ObjectNotFoundError('topics:topic', topicId);

  if (topic.rootContentItemId == null) {
    return {
      contentItemTreeRootItem: null,
    };
  }
  else {
    const contentItemTreeRootItemId = topic.rootContentItemId;
    const contentItemTreeRootItem = contentItems.selectors.getDenormalizedById(
      state, { id: contentItemTreeRootItemId },
    );

    if (contentItemTreeRootItem == null) {
      throw new CorruptedInternalStateError(`Topic rootContentItem not found.`);
    }
    else if (contentItemTreeRootItem.type !== contentItems.model.contentItemTypes.ROOT) {
      throw new CorruptedInternalStateError('Topic rootContentItem not a ROOT contentItem.');
    }

    return {
      contentItemTreeRootItem,
    };
  }
};

const PureSlides = (props: Props): React.Node => {
  const { contentItemTreeRootItem } = props;

  return (contentItemTreeRootItem == null) ? null : (
    <div className="ows_slides_container">
      {
        split(contentItemTreeRootItem).map((contentItem) => (
          <Slide key={contentItem.id} contentItem={contentItem} />
        ))
      }
    </div>
  );
};

const Slides = connect(mapStateToProps)(translate()(PureSlides));

export { PureSlides };
export default Slides;
