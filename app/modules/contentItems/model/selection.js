// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

// SelectionTypes ----------------------------------------------------------------------------------

const PARENT: 'contentItems/selectionTypes/PARENT' = 'contentItems/selectionTypes/PARENT';
const CHILD: 'contentItems/selectionTypes/CHILD' = 'contentItems/selectionTypes/CHILD';
const NEXT: 'contentItems/selectionTypes/NEXT' = 'contentItems/selectionTypes/NEXT';
const PREVIOUS: 'contentItems/selectionTypes/PREVIOUS' = 'contentItems/selectionTypes/PREVIOUS';

const selectionTypes = {
  PARENT,
  CHILD,
  NEXT,
  PREVIOUS,
};
type SelectionType = $Values<typeof selectionTypes>;

export { selectionTypes };
export type { SelectionType };
