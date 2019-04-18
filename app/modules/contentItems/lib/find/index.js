// @flow

/**
 * Index for all find functions; import this to avoid having to import the separate find functions.
 */

// Context
import extendedSuperContext from './extendedSuperContext';
// Super/sub item traversing
import superItem from './superItem';
import allAncestorItems from './allAncestorItems';
import allSubItems from './allSubItems';
import allDescendantItems from './allDescendantItems';
// Sibling traversing
import previousSiblingItem from './previousSiblingItem';
import nextSiblingItem from './nextSiblingItem';
import allSiblingItems from './allSiblingItems';
// Editor traversing
import previousEditorItem from './previousEditorItem';
import nextEditorItem from './nextEditorItem';
// Recursive traversing
import closest from './closest';
import furthest from './furthest';

const find = {
  extendedSuperContext,
  superItem,
  allAncestorItems,
  allSubItems,
  allDescendantItems,
  previousSiblingItem,
  nextSiblingItem,
  allSiblingItems,
  previousEditorItem,
  nextEditorItem,
  closest,
  furthest,
};

export default find;
export * from './types';
