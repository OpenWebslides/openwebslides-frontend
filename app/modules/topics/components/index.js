// @flow

import Course from './Course';
import Editor from './Editor';
import ForkInfo from './ForkInfo';
import NewTopicCard from './NewTopicCard';
import SlidesList from './SlidesList';
import TopicsList from './TopicsList';
import Viewer from './Viewer';

const index = {
  Course,
  Editor,
  ForkInfo,
  NewTopicCard,
  SlidesList,
  TopicsList,
  Viewer,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default index;
