// @flow

import add from './add';
import edit from './edit';
import generateRoot from './generateRoot';
import indent from './indent';
import move from './move';
import remove from './remove';
import removeAndTogglePreviousItem from './removeAndTogglePreviousItem';
import reverseIndent from './reverseIndent';
import toggleEditing from './toggleEditing';

const taskSagaActions = {
  add,
  edit,
  generateRoot,
  indent,
  move,
  remove,
  removeAndTogglePreviousItem,
  reverseIndent,
  toggleEditing,
};

export default taskSagaActions;
