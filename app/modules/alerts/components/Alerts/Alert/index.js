// @flow

import * as React from 'react';

import * as m from '../../../model';

import UpdateAlert from './UpdateAlert';

type PassedProps = {|
  alert: m.Alert,
|};

type Props = {| ...PassedProps |};

const Alert = (props: Props): React.Node => {
  const { alert } = props;

  switch (alert.type) {
    case m.alertTypes.TOPIC_UPDATED:
      return <UpdateAlert alert={(alert: UpdateAlert)} />;
    default:
      return null;
  }
};

export default Alert;
