// @flow

import addToState from './addToState';
import editPropsForTypeInState from './editPropsForTypeInState';
import moveInState from './moveInState';
import removeFromState from './removeFromState';
import setMultipleInState from './setMultipleInState';
import switchEditingInState from './switchEditingInState';

const reducerActions = {
  addToState,
  editPropsForTypeInState,
  moveInState,
  removeFromState,
  setMultipleInState,
  switchEditingInState,
};

export default reducerActions;
