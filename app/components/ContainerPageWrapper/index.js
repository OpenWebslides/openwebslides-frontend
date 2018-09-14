// @flow

import * as React from 'react';
import { Container } from 'semantic-ui-react';

import FlashMessages from 'components/FlashMessages';
import asyncRequests from 'modules/asyncRequests';

import PageWrapper from '../PageWrapper';

type PassedProps = {|
  children: React.Node,
  className?: string,
|};

type Props = {| ...PassedProps |};

const { ApiDimmer } = asyncRequests.components;

const PureContainerPageWrapper = (props: Props): React.Node => {
  const { children, className } = props;

  return (
    <PageWrapper className={`page--container ${className || ''}`}>
      <Container className="page__main-content">
        <ApiDimmer />
        <FlashMessages />
        {children}
      </Container>
    </PageWrapper>
  );
};

const ContainerPageWrapper = PureContainerPageWrapper;

export { PureContainerPageWrapper };
export default ContainerPageWrapper;
