// @flow
import { put } from 'redux-saga/effects';
import modals from 'modules/modals';
import * as t from '../../actionTypes';
import { removeFromState } from '../../actions';

const { hideModal } = modals.actions;

// eslint-disable-next-line require-yield
const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  const {
    id,
    modalType,
  } = action.payload;

  yield put(removeFromState(id));
  yield put(hideModal(modalType));
};

export default removeSaga;
