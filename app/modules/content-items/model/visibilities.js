// @flow

const VISIBLE: 'visibilityTypes/VISIBLE' = 'visibilityTypes/VISIBLE';
const HIDDEN: 'visibilityTypes/HIDDEN' = 'visibilityTypes/HIDDEN';

// Group all visibilityTypes.
export const visibilityTypes = {
  VISIBLE,
  HIDDEN,
};

// Type for contentItem visibility.
export type Visibility = $Values<typeof visibilityTypes>;
