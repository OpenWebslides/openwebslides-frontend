// @flow

import * as React from 'react';

import * as m from '../../../model';

import UpdateAlert from './UpdateAlert';
import PullRequestAlert from './PullRequestAlert';
import ForkedAlert from './ForkedAlert';

type PassedProps = {|
  alert: m.Alert,
|};

type Props = {| ...PassedProps |};

const Alert = (props: Props): React.Node => {
  const { alert } = props;

  switch (alert.type) {
    case m.alertTypes.TOPIC_UPDATED:
      return <UpdateAlert alert={(alert: UpdateAlert)} />;
    case m.alertTypes.PR_SUBMITTED:
    case m.alertTypes.PR_ACCEPTED:
    case m.alertTypes.PR_REJECTED:
      return <PullRequestAlert alert={(alert: PullRequestAlert)} />;
    case m.alertTypes.TOPIC_FORKED:
      return <ForkedAlert alert={(alert: ForkedAlert)} />;
    default:
      return null;
  }
};

export default Alert;
