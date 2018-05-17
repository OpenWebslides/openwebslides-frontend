// @flow

import * as React from 'react';

import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Header } from 'semantic-ui-react';

type PassedProps = {
  topic: Topic,
};

type Props = CustomTranslatorProps & PassedProps;

const PureInfoSidebar = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (
    <React.Fragment>
      <Header>{t('sidebar:info.header')}</Header>
    </React.Fragment>
  );
};

const InfoSidebar = translate()(PureInfoSidebar);

export { PureInfoSidebar };
export default InfoSidebar;
