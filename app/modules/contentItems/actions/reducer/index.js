// @flow

import addToState from './addToState';
import convertInState from './convertInState';
import editPropsForTypeInState from './editPropsForTypeInState';
import moveInState from './moveInState';
import removeFromState from './removeFromState';
import setCurrentlySelectedInState from './setCurrentlySelectedInState';
import setMultipleInState from './setMultipleInState';
import switchEditingInState from './switchEditingInState';

const reducerActions = {
  addToState,
  convertInState,
  editPropsForTypeInState,
  moveInState,
  removeFromState,
  setCurrentlySelectedInState,
  setMultipleInState,
  switchEditingInState,
};

export default reducerActions;
