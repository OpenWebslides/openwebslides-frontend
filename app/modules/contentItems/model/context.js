// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */
/**
 * Describes a contentItem in relation to its superItem / siblingItems;
 * this can be used to traverse the contentItem tree, add/remove/move contentItems, etc.
 */


// ContextTypes ------------------------------------------------------------------------------------

const SUPER: 'contentItems/contextTypes/SUPER' = 'contentItems/contextTypes/SUPER';
const SIBLING: 'contentItems/contextTypes/SIBLING' = 'contentItems/contextTypes/SIBLING';

const contextTypes = {
  SUPER,
  SIBLING,
};
type ContextType = $Values<typeof contextTypes>;


// Base context ------------------------------------------------------------------------------------

// Base for all contextTypes.

type BaseContext = {|
  // SUPER when defining a context for a subItem
  // SIBLING when defining a context for a siblingItem
  +contextType: ContextType,
  // The id of the contentItem in relation to which the context is defined;
  // i.e. the superItem if the contextType is SUPER, etc.
  +contextItemId: string,
|};


// Super context -----------------------------------------------------------------------------------

// Describes a contentItem in relation to its superItem.

// Can be used for specifying a position in the contentItems structure,
// for example when adding a new contentItem at that position.
type SimpleSuperContext = {|
  ...BaseContext,
  // Limit the contextType to SUPER.
  +contextType: typeof contextTypes.SUPER,
  // The position of the contentItem for which this context is defined in its list of siblings.
  // Should default to 0 if not set.
  +indexInSiblingItems?: number,
|};

// Can be used to specify the position of an existing contentItem in the contentItems structure,
// for example when traversing the contentItems structure.
type ExtendedSuperContext = {|
  ...SimpleSuperContext,
  // Make this prop required.
  +indexInSiblingItems: number,
  // Array containing the ids of all of the siblings of the contentItem for which this context
  // is defined. Can be either the contextItem's childItemIds or its subItemIds, depending on the
  // contextType.
  +siblingItemIds: $ReadOnlyArray<string>,
|};

type SuperContext = SimpleSuperContext | ExtendedSuperContext;


// Sibling context ---------------------------------------------------------------------------------

// Describes a contentItem in relation to one of its siblings.

type SiblingContext = {|
  ...BaseContext,
  // Limit the contextType to SIBLING.
  +contextType: typeof contextTypes.SIBLING,
  // The shift in position of the contentItem for which this context is defined relative to the
  // sibling with id contextItemId. A value of 0 or more indicates that this contentItem is
  // positioned the given number of positions after the siblingItem. A value of -1 or less indicates
  // that it is positioned before the siblingItem by the given number of positions.
  // Should default to 0 if not set.
  +indexInSiblingItemsShift?: number,
|};


// ContentItemContext ------------------------------------------------------------------------------

type ContentItemContext =
  | SuperContext
  | SiblingContext;


// Exports -----------------------------------------------------------------------------------------

export { contextTypes };
export type {
  ContextType,
  SimpleSuperContext,
  ExtendedSuperContext,
  SuperContext,
  SiblingContext,
  ContentItemContext,
};
