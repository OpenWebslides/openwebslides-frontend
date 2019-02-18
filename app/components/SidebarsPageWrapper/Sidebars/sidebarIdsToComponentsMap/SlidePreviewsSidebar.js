// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';

import topics from 'modules/topics';

import Sidebar from './Sidebar';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...PassedProps |};

const { SlidesList } = topics.components;

const PureSlidePreviewsSidebar = (props: Props): React.Node => {
  const { topic } = props;
  const [t] = useTranslation();

  return (
    <Sidebar
      className="sidebar--slide-previews"
      header={t('topics:sidebars.slidePreviews.header')}
      icon="image"
    >
      <SlidesList topicId={topic.id} />
    </Sidebar>
  );
};

const SlidePreviewsSidebar = PureSlidePreviewsSidebar;

export { PureSlidePreviewsSidebar };
export default SlidePreviewsSidebar;
