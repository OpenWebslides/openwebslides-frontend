// @flow

import * as React from 'react';
import type { Match } from 'react-router-dom';

import Page from 'core-components/Page';
import generateRandomString from 'lib/generate-random-string';

type RouteProps = {
  match: Match,
};

type Props = RouteProps & {};

const PureGenerateRandomStringPage = (props: Props): React.Node => {
  const { match } = props;
  const lengthParam = parseInt(match.params.length, 10);
  const randomStringLength = lengthParam || 20;
  return (
    // $FlowFixMe Can't figure out cause; Page component needs rewriting anyway #TODO
    <Page>
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
    </Page>
  );
};

const GenerateRandomStringPage = PureGenerateRandomStringPage;

export { PureGenerateRandomStringPage };
export default GenerateRandomStringPage;
