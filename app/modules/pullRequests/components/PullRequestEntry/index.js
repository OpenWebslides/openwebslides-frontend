// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Item, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { type TFunction } from 'types/i18next';
import { PULL_REQUEST_VIEW_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  pullRequestId: string,
|};

type Props = {| ...PassedProps |};

class PurePullRequestEntry extends React.Component<Props> {
  iconForState = (state: m.PullRequestState): React.Node => {
    switch (state) {
      case m.pullRequestStates.PENDING:
      case m.pullRequestStates.READY:
      case m.pullRequestStates.WORKING:
        return (<Icon name="question circle" />);
      case m.pullRequestStates.INCOMPATIBLE:
        return (<Icon name="exclamation circle" color="orange" />);
      case m.pullRequestStates.ACCEPTED:
        return (<Icon name="check" color="green" />);
      case m.pullRequestStates.REJECTED:
        return (<Icon name="close" color="red" />);
      default:
        return null;
    }
  };

  renderPullRequestEntry = (pullRequest: m.PullRequest): React.Node => {
    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Item data-test-id="pull-request">
            <Item.Content>
              <Item.Header
                as={Link}
                to={makeRoute(PULL_REQUEST_VIEW_ROUTE, { pullRequestId: pullRequest.id })}
                data-test-id="pull-request-message"
              >
                <strong>{pullRequest.message}</strong>
              </Item.Header>
              <Item.Meta>
                {this.iconForState(pullRequest.state)} {t(`pullRequests:titleForState.${pullRequest.state}`)}
              </Item.Meta>
              <Item.Extra title={moment(pullRequest.timestamp).format('LLLL')}>
                {moment(pullRequest.timestamp).fromNow()}
              </Item.Extra>
            </Item.Content>
          </Item>
        )}
      </Translation>
    );
  };

  render(): React.Node {
    const { pullRequestId } = this.props;

    return (
      <FetchWrapper
        render={this.renderPullRequestEntry}
        renderPropsAndState={this.props}
        fetchId={pullRequestId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const PullRequestEntry = PurePullRequestEntry;

export { PurePullRequestEntry };
export default PullRequestEntry;
