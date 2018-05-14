// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Dimmer, Loader } from 'semantic-ui-react';
import type { State } from 'types/state';

import { isPending } from '../selectors';

type PassedProps = {
  children?: React.Node,
  request: string,
};

type StateProps = {
  active: boolean,
};

type Props = CustomTranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    active: isPending(state, { request: props.request }),
  };
};

const PureApiDimmer = (props: Props): React.Node => {
  const {
    children,
    active,
    t,
  } = props;

  return (
    <Dimmer active={active} inverted={true}>
      <Loader inverted={true}>
        {children || t('common:loading')}
      </Loader>
    </Dimmer>
  );
};

const ApiDimmer = connect(mapStateToProps)(translate()(PureApiDimmer));

export { PureApiDimmer };
export default ApiDimmer;
