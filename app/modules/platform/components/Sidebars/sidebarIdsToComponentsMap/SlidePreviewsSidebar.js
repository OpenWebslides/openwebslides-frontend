// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import type { State } from 'types/state';
import Slides from 'core-components/slides/Slides';
import topics from 'modules/topics';
import contentItems from 'modules/contentItems';

import Sidebar from './helpers/Sidebar';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type StateProps = {|
  contentItemTreeRootItem: contentItems.model.DenormalizedRootContentItem,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps |};

// #TODO refactor Slides into TopicSlides or similar, which should fetch its own rootContentItem
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
  else if (contentItemTreeRootItem.type !== contentItems.model.contentItemTypes.ROOT) {
    throw new Error('Not a ROOT contentItem.');
  }

  return {
    contentItemTreeRootItem,
  };
};

const PureSlidePreviewsSidebar = (props: Props): React.Node => {
  const { t, contentItemTreeRootItem } = props;

  return (
    <Sidebar
      className="sidebar--slide-previews"
      header={t('sidebar:previews.header')}
      icon="image"
    >
      <Slides contentItemTreeRootItem={contentItemTreeRootItem} />
    </Sidebar>
  );
};

const SlidePreviewsSidebar = connect(mapStateToProps)(translate()(PureSlidePreviewsSidebar));

export { PureSlidePreviewsSidebar };
export default SlidePreviewsSidebar;
