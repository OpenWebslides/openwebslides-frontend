// @flow

import _ from 'lodash';
import { call, put, select } from 'redux-saga/effects';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { Identifier } from 'types/model';

import generateId from '../../lib/generate-id';
import * as t from '../../actionTypes';
import { addToState, toggleEditing } from '../../actions';
import { getAncestorById } from '../../selectors';
import {
  subableContentItemTypes,
  containerContentItemTypes,
  contextTypes,
  ancestorContextTypes,
} from '../../model';
import type {
  Context,
  AncestorContext,
  AncestorContextType,
} from '../../model';

const convertContextToAncestorContext = function* (
  context: ?Context,
): Generator<*, ?AncestorContext, *> {
  let ancestorContext: ?AncestorContext;
  let ancestorContextType: AncestorContextType;
  let siblingsArray: Array<Identifier>;

  // NULL should map to NULL
  if (context == null) {
    ancestorContext = null;
  }
  // Any contextType other than SIBLING can be directly mapped to the ancestorContextType
  // #TODO whitelist instead of blacklist
  else if (context.contextType !== contextTypes.SIBLING) {
    // eslint-disable-next-line flowtype/no-weak-types
    ancestorContext = ((context: any): AncestorContext);
  }
  // If the contextType is SIBLING, convert it to either PARENT or SUPER
  else {
    // If contextType is SIBLING, positionInSiblings represents a relative value
    const relativePositionInSiblings = context.positionInSiblings || 0;
    // Get the parent or super item; throw error if not found
    const contextParentOrSuperItem = yield select(
      getAncestorById,
      { id: context.contextItemId },
    );
    if (contextParentOrSuperItem == null) throw new ObjectNotFoundError('contentItems:contentItem', context.contextItemId);

    // If contextParentOrSuperItem is a SUPER item
    if (_.includes(subableContentItemTypes, contextParentOrSuperItem.type)) {
      ancestorContextType = ancestorContextTypes.SUPER;
      siblingsArray = contextParentOrSuperItem.subItemIds;
    }
    // If contextParentOrSuperItem is a PARENT item
    else if (_.includes(containerContentItemTypes, contextParentOrSuperItem.type)) {
      ancestorContextType = ancestorContextTypes.PARENT;
      siblingsArray = contextParentOrSuperItem.childItemIds;
    }
    // Failsafe in case of major coding error...
    else throw new CorruptedInternalStateError(`This shouldn't happen.`);

    // Calculate absolute positionInSiblings from relativePositionInSiblings
    const indexOfContextItemInSiblings = _.indexOf(siblingsArray, context.contextItemId);
    const absolutePositionInSiblings = indexOfContextItemInSiblings
      + 1
      + relativePositionInSiblings;

    // Check if position isn't out of bounds
    if (absolutePositionInSiblings < 0 || absolutePositionInSiblings > siblingsArray.length) {
      throw new InvalidArgumentError(`Could not convert contextType.SIBLING to contextType.SUPER because of an invalid context.positionInSiblings value.`);
    }

    // Create converted reducerContext
    ancestorContext = {
      contextType: ancestorContextType,
      contextItemId: contextParentOrSuperItem.id,
      positionInSiblings: absolutePositionInSiblings,
    };
  }

  return ancestorContext;
};

const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  const { type, context, propsForType } = action.payload;
  const newId = generateId();
  const newContext = yield call(convertContextToAncestorContext, context);

  yield put(addToState(newId, type, newContext, propsForType));
  yield put(toggleEditing(newId, true));
};

export { convertContextToAncestorContext };
export default addSaga;
