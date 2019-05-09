// @flow

import * as React from 'react';

import * as m from '../../../model';

type PassedProps = {|
  contentItem: m.RootContentItem,
|};

type Props = {| ...PassedProps |};

const PureRoot = (props: Props): React.Node => null;

const Root = PureRoot;

export { PureRoot };
export default Root;
