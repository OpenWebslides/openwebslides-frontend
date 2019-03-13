// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dimmer, Loader } from 'semantic-ui-react';

import { type AppState } from 'types/redux';

import selectors from '../selectors';

type PassedProps = {| |};

type StateProps = {|
  isActive: boolean,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const pendingRequests = selectors.getAllPending(state);
  return {
    isActive: (pendingRequests.length !== 0),
  };
};

const PureApiDimmer = (props: Props): React.Node => {
  const { isActive } = props;
  const [t] = useTranslation();

  if (isActive) {
    return (
      <Dimmer active={isActive} inverted={true}>
        <Loader inverted={true}>
          {t('common:loading')}
        </Loader>
      </Dimmer>
    );
  }
  else {
    return null;
  }
};

const ApiDimmer = connect(mapStateToProps)(PureApiDimmer);

export { PureApiDimmer };
export default ApiDimmer;
