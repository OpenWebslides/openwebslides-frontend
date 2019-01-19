// @flow

import * as React from 'react';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';
import pullRequests from 'modules/pullRequests';

type Props = {| ...RouterProps |};

const { AuthWrapper } = platform.components;
const { View } = pullRequests.components;

const PureViewPage = (props: Props): React.Node => {
  const { match: { params: { pullRequestId } } } = props;

  return (pullRequestId == null) ? null : (
    <AuthWrapper>
      <ContainerPageWrapper>
        <View pullRequestId={pullRequestId} />
      </ContainerPageWrapper>
    </AuthWrapper>
  );
};

const ViewPage = PureViewPage;

export { PureViewPage };
export default ViewPage;
