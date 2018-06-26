// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import type { State } from 'types/state';

import { getLocation } from '../selectors';

type StateProps = {
  location: ?string,
};

type Props = StateProps;

const mapStateToProps = (state: State): StateProps => {
  const location = getLocation(state);

  return {
    location,
  };
};

const PureHistory = (props: Props): React.Node => {
  const { location } = props;

  if (location === null) {
    return null;
  }

  return (
    <Redirect to={location || ''} />
  );
};

const History = connect(mapStateToProps)(translate()(PureHistory));

export default History;
