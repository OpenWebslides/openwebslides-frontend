// @flow
/* eslint-disable no-multiple-empty-lines */
/**
 * Describes a contentItem in relation to its parent / siblings; this can be used to traverse the
 * contentItem tree, add/remove/move contentItems, etc.
 */


// ContextTypes ------------------------------------------------------------------------------------

const PARENT: 'contentItems/contextTypes/PARENT' = 'contentItems/contextTypes/PARENT';
const SUPER: 'contentItems/contextTypes/SUPER' = 'contentItems/contextTypes/SUPER';
const SIBLING: 'contentItems/contextTypes/SIBLING' = 'contentItems/contextTypes/SIBLING';

const contextTypes = {
  PARENT,
  SUPER,
  SIBLING,
};
type ContextType = $Values<typeof contextTypes>;


// Base context ------------------------------------------------------------------------------------

// Base for all contextTypes.

type BaseContext = {|
  // PARENT when defining a context for a childItem
  // SUPER when defining a context for a subItem
  // SIBLING when defining a context for a siblingItem
  +contextType: ContextType,
  // The id of the contentItem in relation to which the context is defined;
  // i.e. the parentItem if the contextType is SUPER, etc.
  +contextItemId: string,
|};


// Vertical context --------------------------------------------------------------------------------

// Refers to the 'vertical' parent/child or super/sub relationship when visualizing the contentItems
// structure as a tree.

const verticalContextTypes = {
  PARENT,
  SUPER,
};
type VerticalContextType = $Values<typeof verticalContextTypes>;

// Can be used for specifying a position in the contentItems structure,
// for example when adding a new contentItem at that position.
type SimpleVerticalContext = {|
  ...BaseContext,
  // Limit the contextType to verticalContextTypes.
  +contextType: VerticalContextType,
  // The position of the contentItem for which this context is defined in its list of siblings,
  // which can be either the contextItem's childItemIds or its subItemIds, depending on the
  // contextType.
  // Should default to 0 if not set.
  +indexInSiblingItems?: number,
|};

// Can be used to specify the position of an existing contentItem in the contentItems structure,
// for example when traversing the contentItems structure.
type ExtendedVerticalContext = {|
  ...SimpleVerticalContext,
  // Make this prop required.
  +indexInSiblingItems: number,
  // Array containing the ids of all of the siblings of the contentItem for which this context
  // is defined. Can be either the contextItem's childItemIds or its subItemIds, depending on the
  // contextType.
  +siblingItemIds: Array<string>,
|};

type VerticalContext = SimpleVerticalContext | ExtendedVerticalContext;


// Horizontal context ------------------------------------------------------------------------------

// Refers to the 'horizontal' sibling relationship when visualizing the contentItems structure as a
// tree.

const horizontalContextTypes = {
  SIBLING,
};
type HorizontalContextType = $Values<typeof horizontalContextTypes>;

type HorizontalContext = {|
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


// Context -----------------------------------------------------------------------------------------

type Context =
  | VerticalContext
  | ExtendedVerticalContext
  | HorizontalContext;


// Exports -----------------------------------------------------------------------------------------

export {
  contextTypes,
  verticalContextTypes,
  horizontalContextTypes,
};

export type {
  ContextType,
  VerticalContextType,
  SimpleVerticalContext,
  ExtendedVerticalContext,
  VerticalContext,
  HorizontalContextType,
  HorizontalContext,
  Context,
};
