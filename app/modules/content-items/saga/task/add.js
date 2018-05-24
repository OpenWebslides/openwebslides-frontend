// @flow

import _ from 'lodash';
import { call, put, select } from 'redux-saga/effects';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { Identifier } from 'types/model';

import generateId from '../../lib/generate-id';
import * as t from '../../actionTypes';
import { addToState } from '../../actions';
import { getParentOrSuperById } from '../../selectors';
import {
  subableContentItemTypes,
  containerContentItemTypes,
} from '../../model';

const convertSagaContextToReducerContext = function* (
  sagaContext: ?t.ActionPayloadSagaContext,
): Generator<*, ?t.ActionPayloadReducerContext, *> {
  let reducerContext: ?t.ActionPayloadReducerContext;
  let reducerContextType: t.ActionPayloadReducerContextType;
  let siblingsArray: Array<Identifier>;

  // NULL should map to NULL
  if (sagaContext == null) {
    reducerContext = null;
  }
  // Any contextType other than SIBLING can be directly mapped to the reducerContextType
  else if (sagaContext.contextType !== t.actionPayloadSagaContextTypes.SIBLING) {
    // eslint-disable-next-line flowtype/no-weak-types
    reducerContext = ((sagaContext: any): t.ActionPayloadReducerContext);
  }
  // If the contextType is SIBLING, convert it to either PARENT or SUPER
  else {
    // If contextType is SIBLING, positionInSiblings represents a relative value
    const relativePositionInSiblings = sagaContext.positionInSiblings;
    // Get the parent or super item; throw error if not found
    const contextParentOrSuperItem = yield select(
      getParentOrSuperById,
      { id: sagaContext.contextItemId },
    );
    if (contextParentOrSuperItem == null) throw new ObjectNotFoundError('contentItems:contentItem', sagaContext.contextItemId);

    // If contextParentOrSuperItem is a SUPER item
    if (_.includes(subableContentItemTypes, contextParentOrSuperItem.type)) {
      reducerContextType = t.actionPayloadReducerContextTypes.SUPER;
      siblingsArray = contextParentOrSuperItem.subItemIds;
    }
    // If contextParentOrSuperItem is a PARENT item
    else if (_.includes(containerContentItemTypes, contextParentOrSuperItem.type)) {
      reducerContextType = t.actionPayloadReducerContextTypes.PARENT;
      siblingsArray = contextParentOrSuperItem.childItemIds;
    }
    // Failsafe in case of major coding error...
    else throw new CorruptedInternalStateError(`This shouldn't happen.`);

    // Calculate absolute positionInSiblings from relativePositionInSiblings
    const indexOfContextItemInSiblings = _.indexOf(siblingsArray, sagaContext.contextItemId);
    const absolutePositionInSiblings = indexOfContextItemInSiblings
      + 1
      + relativePositionInSiblings;

    // Check if position isn't out of bounds
    if (absolutePositionInSiblings < 0 || absolutePositionInSiblings > siblingsArray.length) {
      throw new InvalidArgumentError(`Could not convert contextType.SIBLING to contextType.SUPER because of an invalid context.positionInSiblings value.`);
    }

    // Create converted reducerContext
    reducerContext = {
      contextType: reducerContextType,
      contextItemId: contextParentOrSuperItem.id,
      positionInSiblings: absolutePositionInSiblings,
    };
  }

  return reducerContext;
};

const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  const { type, context, propsForType, isEditing } = action.payload;
  const newId = generateId();
  const newContext = yield call(convertSagaContextToReducerContext, context);

  // #TODO move cursor to newly added contentItem

  yield put(addToState(newId, type, propsForType, newContext, isEditing));
};

export { convertSagaContextToReducerContext };
export default addSaga;
