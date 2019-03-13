// @flow

import * as React from 'react';

export type DropdownValue = {|
  // Unique key for the dropdown item
  key: string,
  // Value to be returned from the forms
  value: string,
  // Text to be displayed
  text: string,
  // Item content
  content?: React.Node,
|};
