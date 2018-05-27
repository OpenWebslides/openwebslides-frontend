// @flow

import { put } from 'redux-saga/effects';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import generateId from '../../lib/generate-id';
import * as t from '../../actionTypes';
import { addToState } from '../../actions';

const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  const { type, context, propsForType, isEditing } = action.payload;
  const newId = generateId();
  let newContext: ?t.ActionPayloadReducerContext;

  // #TODO move cursor to newly added contentItem
  // #TODO convert SIBLING to PARENT or SUPER

  if (context == null) {
    newContext = null;
  }
  else if (context.contextType === t.actionPayloadSagaContextTypes.SIBLING) {
    throw new NotYetImplementedError(`SIBLING context not yet implemented.`);
  }
  else {
    // eslint-disable-next-line flowtype/no-weak-types
    newContext = ((context: any): t.ActionPayloadReducerContext);
  }

  yield put(addToState(newId, type, propsForType, newContext, isEditing));
};

export default addSaga;
