// @flow
/**
 * Defines an object that can be passed in a contentItem action payload, which describes the
 * position of a contentItem in relation to an existing tree of contentItems. This can be used to
 * add a contentItem at a specific position, move it somewhere, etc.
 */

import type { Identifier } from 'types/model';

const PARENT: 'contentItems/actionPayloadContextType/PARENT' = 'contentItems/actionPayloadContextType/PARENT';
const SUPER: 'contentItems/actionPayloadContextType/SUPER' = 'contentItems/actionPayloadContextType/SUPER';
const SIBLING: 'contentItems/actionPayloadContextType/SIBLING' = 'contentItems/actionPayloadContextType/SIBLING';

export const actionPayloadReducerContextTypes = {
  PARENT,
  SUPER,
};
export type ActionPayloadReducerContextType = $Values<typeof actionPayloadReducerContextTypes>;

export const actionPayloadSagaContextTypes = {
  ...actionPayloadReducerContextTypes,
  SIBLING,
};
export type ActionPayloadSagaContextType = $Values<typeof actionPayloadSagaContextTypes>;

export type ActionPayloadReducerContext = {
  // PARENT if this contentItem is a childItem of the item with id contextItemId,
  // SUPER if this contentItem is a subItem of the item with id contextItemId.
  contextType: ActionPayloadReducerContextType,
  // The id of either the parentItem or the superItem.
  contextItemId: Identifier,
  // Position of this contentItem in its list of siblings, which can be either childItemIds or
  // subItemIds. Should default to 0 if not set.
  positionInSiblings?: number,
};

export type ActionPayloadSagaContext = {
  // PARENT if this contentItem is a childItem of the item with id contextItemId,
  // SUPER if this contentItem is a subItem of the item with id contextItemId,
  // SIBLING if this contentItem is a sibling of the item with id contextItemId.
  contextType: ActionPayloadSagaContextType,
  // The id of either the parentItem or the superItem or the siblingItem.
  contextItemId: Identifier,
  // Position of this contentItem in its list of siblings, which can be either childItemIds or
  // subItemIds. Should default to 0 if not set.
  // If contextItemType is SIBLING, a value of 0 or more indicates that this contentItem should be
  // positioned the given number of positions after the item with id contextItemId. A value of -1 or
  // less indicates it should be positioned before it by the given number of positions.
  positionInSiblings?: number,
};
