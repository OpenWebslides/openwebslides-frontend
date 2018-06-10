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

export const verticalContextTypes = {
  PARENT,
  SUPER,
};
export type VerticalContextType = $Values<typeof verticalContextTypes>;

export const horizontalContextTypes = {
  SIBLING,
};
export type HorizontalContextType = $Values<typeof horizontalContextTypes>;

export type BaseContext = {|
  // PARENT when defining a context for a childItem
  // SUPER when defining a context for a subItem
  // SIBLING when defining a context for a siblingItem
  +contextType: ContextType,
  // The id of the contentItem in relation to which the context is defined;
  // i.e. the parentItem if the contextType is SUPER, etc.
  +contextItemId: Identifier,
|};

export type SimpleVerticalContext = {|
  ...BaseContext,
  // Limit the contextType to verticalContextTypes.
  +contextType: VerticalContextType,
  // The position of the contentItem for which this context is defined in its list of siblings,
  // which can be either the contextItem's childItemIds or its subItemIds, depending on the
  // contextType.
  // Should default to 0 if not set.
  +indexInSiblingItems?: number,
|};

export type ExtendedVerticalContext = {|
  ...SimpleVerticalContext,
  // Make this prop required.
  +indexInSiblingItems: number,
  // Array containing the ids of all of the siblings of the contentItem for which this context
  // is defined. Can be either the contextItem's childItemIds or its subItemIds, depending on the
  // contextType.
  +siblingItemIds: Array<Identifier>,
|};

export type VerticalContext = SimpleVerticalContext | ExtendedVerticalContext;

export type HorizontalContext = {|
  ...BaseContext,
  // Limit the contextType to horizontalContextTypes.
  +contextType: HorizontalContextType,
  // The shift in position of the contentItem for which this context is defined relative to the
  // sibling with id contextItemId. A value of 0 or more indicates that this contentItem is
  // positioned the given number of positions after the siblingItem. A value of -1 or less indicates
  // that it is positioned before the siblingItem by the given number of positions.
  // Should default to 0 if not set.
  +indexInSiblingItemsShift?: number,
|};

export type Context =
  | VerticalContext
  | ExtendedVerticalContext
  | HorizontalContext;
