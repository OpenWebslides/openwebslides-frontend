// @flow

import * as React from 'react';
import type { TranslatorProps } from 'react-i18next';
import { translate } from 'react-i18next';

import NavigationBar from 'core-components/navigation/NavigationBar';

type ChildrenProps = {
  children: React.Node,
};

type Props = TranslatorProps & ChildrenProps;

const Page = (props: Props): React.Node => {
  return (
    <div>
      <NavigationBar />
      {props.children}
    </div>
  );
};


export { Page as PurePage };
export default translate()(Page);
