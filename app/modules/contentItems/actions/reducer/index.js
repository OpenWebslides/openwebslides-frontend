// @flow

import addToState from './addToState';
import convertInState from './convertInState';
import editPropsForTypeInState from './editPropsForTypeInState';
import moveInState from './moveInState';
import removeFromState from './removeFromState';
import selectInState from './selectInState';
import setCurrentlySelectedInState from './setCurrentlySelectedInState';
import setMultipleInState from './setMultipleInState';
import switchEditingInState from './switchEditingInState';

const reducerActions = {
  addToState,
  convertInState,
  editPropsForTypeInState,
  moveInState,
  removeFromState,
  selectInState,
  setCurrentlySelectedInState,
  setMultipleInState,
  switchEditingInState,
};

export default reducerActions;
