// @flow

import * as React from 'react';

import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';

import Sidebar from './Sidebar';

type Props = CustomTranslatorProps;

const PureInfoSidebar = (props: Props): React.Node => {
  /*
  const {
    t,
  } = props;
  */

  return (
    <Sidebar>
      <h1>This is some general info of this topic!</h1>
    </Sidebar>
  );
};

const InfoSidebar = translate()(PureInfoSidebar);

export { PureInfoSidebar };
export default InfoSidebar;
