// @flow
/**
 * Describes a contentItem in relation to its parent / siblings; this can be used to traverse the
 * contentItem tree, add/remove/move contentItems, etc.
 */

import type { Identifier } from 'types/model';

const PARENT: 'contentItems/contextTypes/PARENT' = 'contentItems/contextTypes/PARENT';
const SUPER: 'contentItems/contextTypes/SUPER' = 'contentItems/contextTypes/SUPER';
const SIBLING: 'contentItems/contextTypes/SIBLING' = 'contentItems/contextTypes/SIBLING';

export const contextTypes = {
  PARENT,
  SUPER,
  SIBLING,
};
export type ContextType = $Values<typeof contextTypes>;

export const ancestorContextTypes = {
  PARENT,
  SUPER,
};
export type AncestorContextType = $Values<typeof ancestorContextTypes>;

export type Context = {
  // PARENT if this contentItem is a childItem of the item with id contextItemId,
  // SUPER if this contentItem is a subItem of the item with id contextItemId,
  // SIBLING if this contentItem is a sibling of the item with id contextItemId.
  contextType: ContextType,
  // The id of either the parentItem or the superItem or the siblingItem.
  // #TODO rename this to ancestorItemId
  contextItemId: Identifier,
  // Position of this contentItem in its list of siblings, which can be either childItemIds or
  // subItemIds. Should default to 0 if not set.
  // If contextItemType is SIBLING, a value of 0 or more indicates that this contentItem should be
  // positioned the given number of positions after the item with id contextItemId. A value of -1 or
  // less indicates it should be positioned before it by the given number of positions.
  // #TODO rename this to positionInSiblingItems
  positionInSiblings?: number,
};

export type AncestorContext = {
  ...$Exact<Context>,
  // Limit contextType posibilities to the two ancestor types for easier processing;
  // other contextTypes can always be converted to this.
  contextType: AncestorContextType,
};

export type ExtendedAncestorContext = {
  ...$Exact<AncestorContext>,
  // This aren't needed when adding / moving / etc. contentItems,
  // but can be useful when traversing.
  siblingItemIds: Array<Identifier>,
  // Make this prop required.
  positionInSiblings: number,
};
