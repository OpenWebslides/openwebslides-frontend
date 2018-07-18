// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Dimmer, Loader } from 'semantic-ui-react';

import type { State } from 'types/state';

import * as m from '../model';
import selectors from '../selectors';

type PassedProps = {|
  requestIds: Array<string>,
  children?: React.Node,
|};

type StateProps = {|
  isActive: boolean,
|};

type Props = {|
  ...TranslatorProps,
  ...PassedProps,
  ...StateProps,
|};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { requestIds } = props;
  let isActive: boolean = false;

  // Dimmer should be active as long as any of the passed requestIds are still PENDING
  requestIds.forEach((requestId: string): void => {
    const requestStatus = selectors.getRequestStatusById(state, { requestId });
    if (requestStatus != null) {
      isActive = isActive || requestStatus.status === m.statusTypes.PENDING;
    }
  });

  return {
    isActive,
  };
};

const PureApiDimmer = (props: Props): React.Node => {
  const { children, isActive, t } = props;

  if (isActive) {
    return (
      <Dimmer active={isActive} inverted={true}>
        <Loader inverted={true}>
          {children || t('common:loading')}
        </Loader>
      </Dimmer>
    );
  }
  else {
    return null;
  }
};

const ApiDimmer = connect(mapStateToProps)(translate()(PureApiDimmer));

export { PureApiDimmer };
export default ApiDimmer;
