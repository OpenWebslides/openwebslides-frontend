// @flow

import SimpleList from './SimpleList';
import Editor from './Editor';
import CardCollection from './CardCollection';
import NewTopicCard from './NewTopicCard';
import Slides from './Slides';

const index = {
  SimpleList,
  Editor,
  CardCollection,
  NewTopicCard,
  Slides,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default index;
