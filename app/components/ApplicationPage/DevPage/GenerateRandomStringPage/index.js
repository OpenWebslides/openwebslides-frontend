// @flow

import * as React from 'react';
import type { ContextRouter as RouterProps } from 'react-router-dom';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import generateRandomString from 'lib/generate-random-string';

type Props = RouterProps;

const PureGenerateRandomStringPage = (props: Props): React.Node => {
  const { match } = props;
  const lengthParam = parseInt(match.params.length, 10);
  const randomStringLength = lengthParam || 20;
  return (
    <ContainerPageWrapper>
      <div>
        <h1>
          Randomly generated strings of length { randomStringLength }:
        </h1>
        <div style={{ fontFamily: 'monospace' }}>
          <p>{ generateRandomString(randomStringLength) }</p>
          <p>{ generateRandomString(randomStringLength) }</p>
          <p>{ generateRandomString(randomStringLength) }</p>
          <p>{ generateRandomString(randomStringLength) }</p>
          <p>{ generateRandomString(randomStringLength) }</p>
          <p>{ generateRandomString(randomStringLength) }</p>
          <p>{ generateRandomString(randomStringLength) }</p>
          <p>{ generateRandomString(randomStringLength) }</p>
          <p>{ generateRandomString(randomStringLength) }</p>
          <p>{ generateRandomString(randomStringLength) }</p>
        </div>
      </div>
    </ContainerPageWrapper>
  );
};

const GenerateRandomStringPage = PureGenerateRandomStringPage;

export { PureGenerateRandomStringPage };
export default GenerateRandomStringPage;
