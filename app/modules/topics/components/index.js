// @flow

import Course from './Course';
import Editor from './Editor';
import NewTopicCard from './NewTopicCard';
import SlidesList from './SlidesList';
import TopicsList from './TopicsList';

const index = {
  Course,
  Editor,
  NewTopicCard,
  SlidesList,
  TopicsList,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default index;
