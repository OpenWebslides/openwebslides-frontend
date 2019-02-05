// @flow

import add from './add';
import edit from './edit';
import generateContent from './generateContent';
import generatePlaceholder from './generatePlaceholder';
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
  generateContent,
  generatePlaceholder,
  generateRoot,
  indent,
  move,
  remove,
  removeAndTogglePreviousItem,
  reverseIndent,
  toggleEditing,
};

export default taskSagaActions;
