// @flow

import CardCollection from './CardCollection';
import Editor from './Editor';
import NewTopicCard from './NewTopicCard';
import SlidesList from './SlidesList';

const index = {
  CardCollection,
  Editor,
  NewTopicCard,
  SlidesList,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default index;
