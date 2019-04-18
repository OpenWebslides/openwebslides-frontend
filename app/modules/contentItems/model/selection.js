// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

// SelectionTypes ----------------------------------------------------------------------------------

const SUPER: 'contentItems/selectionTypes/SUPER' = 'contentItems/selectionTypes/SUPER';
const SUB: 'contentItems/selectionTypes/SUB' = 'contentItems/selectionTypes/SUB';
const NEXT: 'contentItems/selectionTypes/NEXT' = 'contentItems/selectionTypes/NEXT';
const PREVIOUS: 'contentItems/selectionTypes/PREVIOUS' = 'contentItems/selectionTypes/PREVIOUS';

const selectionTypes = {
  SUPER,
  SUB,
  NEXT,
  PREVIOUS,
};
type SelectionType = $Values<typeof selectionTypes>;

export { selectionTypes };
export type { SelectionType };
