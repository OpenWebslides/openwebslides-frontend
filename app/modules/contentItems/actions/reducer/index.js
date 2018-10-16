// @flow

import addToState from './addToState';
import editPropsForTypeInState from './editPropsForTypeInState';
import moveInState from './moveInState';
import removeFromState from './removeFromState';
import setDirtyInState from './setDirtyInState';
import setMultipleInState from './setMultipleInState';
import switchEditingInState from './switchEditingInState';

const reducerActions = {
  addToState,
  editPropsForTypeInState,
  moveInState,
  removeFromState,
  setDirtyInState,
  setMultipleInState,
  switchEditingInState,
};

export default reducerActions;
