// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { type Action } from 'types/action';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';

type DispatchProps = {|
  signinSSO: (token: string, id: string) => void,
|};

type Props = {| ...TranslatorProps, ...RouterProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    signinSSO: (token: string, id: string): void => {
      dispatch(platform.actions.signinSSO(token, id));
    },
  };
};

class PureSSOCallbackPage extends React.Component<Props> {
  componentDidMount(): void {
    const { location, signinSSO } = this.props;
    const params = new URLSearchParams(location.search);
    const apiToken = params.get('apiToken');
    const userId = params.get('userId');

    if (!apiToken) throw new InvalidArgumentError(`Invalid token`);
    if (!userId) throw new InvalidArgumentError(`Invalid id`);

    signinSSO(apiToken, userId);
  }

  render(): React.Node {
    return null; // TODO: use ApiDimmer for GET /user?
  }
}

const SSOCallbackPage = translate()(connect(null, mapDispatchToProps)(PureSSOCallbackPage));

export { PureSSOCallbackPage };
export default SSOCallbackPage;
