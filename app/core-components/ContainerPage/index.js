// @flow

import * as React from 'react';
import { Container } from 'semantic-ui-react';

import Page from '../Page';

type PassedProps = {|
  children: React.Node,
  className?: string,
|};

type Props = {| ...PassedProps |};

const PureContainerPage = (props: Props): React.Node => {
  const { children, className } = props;

  return (
    <Page className={`page--container ${className || ''}`}>
      <Container className="page__main-content">
        {children}
      </Container>
    </Page>
  );
};

const ContainerPage = PureContainerPage;

export { PureContainerPage };
export default ContainerPage;
