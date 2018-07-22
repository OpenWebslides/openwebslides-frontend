// @flow

import * as React from 'react';
import { Container } from 'semantic-ui-react';

import PageWrapper from '../PageWrapper';

type PassedProps = {|
  children: React.Node,
  className?: string,
|};

type Props = {| ...PassedProps |};

const PureContainerPageWrapper = (props: Props): React.Node => {
  const { children, className } = props;

  return (
    <PageWrapper className={`page--container ${className || ''}`}>
      <Container className="page__main-content">
        {children}
      </Container>
    </PageWrapper>
  );
};

const ContainerPageWrapper = PureContainerPageWrapper;

export { PureContainerPageWrapper };
export default ContainerPageWrapper;
