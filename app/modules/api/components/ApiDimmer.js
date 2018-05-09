// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import type { State } from 'types/state';

import { isPending } from '../selectors';

type PassedProps = {
  children: React.Node,
  request: string,
};

type StateProps = {
  active: boolean,
};

type Props = PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    active: isPending(state, props.request),
  };
};
const PureApiDimmer = (props: Props): React.Node => {
  const {
    children,
    active,
  } = props;

  return (
    <Dimmer active={active} inverted={true}>
      <Loader inverted={true}>
        {children}
      </Loader>
    </Dimmer>
  );
};

const ApiDimmer = connect(mapStateToProps)(PureApiDimmer);

export { PureApiDimmer };
export default ApiDimmer;
