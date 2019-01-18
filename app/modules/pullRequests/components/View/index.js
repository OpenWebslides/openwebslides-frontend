// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Header, Icon, Segment, Label, Divider, Comment } from 'semantic-ui-react';

import FetchWrapper from 'components/FetchWrapper';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

import SubmitComment from './SubmitComment';
import StateComment from './StateComment';

type PassedProps = {|
  pullRequestId: string,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureView extends React.Component<Props> {
  ribbonForState = (state: m.PullRequestState): React.Node => {
    const { t } = this.props;

    let icon: string = 'send';
    let color: string = 'yellow';

    switch (state) {
      case m.pullRequestStates.PENDING:
      case m.pullRequestStates.READY:
      case m.pullRequestStates.WORKING:
        icon = 'question circle';
        color = 'yellow';
        break;
      case m.pullRequestStates.INCOMPATIBLE:
        icon = 'exclamation circle';
        color = 'red';
        break;
      case m.pullRequestStates.ACCEPTED:
        icon = 'check';
        color = 'green';
        break;
      case m.pullRequestStates.REJECTED:
        icon = 'times';
        color = 'red';
        break;
      default:
        break;
    }

    // TODO: find out why the ribbon does not attach to the segment
    return (
      <Label ribbon={true} color={color} style={{ left: '-2.1rem' }}>
        <Icon name={icon} /> {t(`pullRequests:titleForState.${state}`)}
      </Label>
    );
  };

  renderView = (pullRequest: m.PullRequest): React.Node => {
    return (
      <div data-test-id="pull-request-view">
        <Segment raised={true}>
          {this.ribbonForState(pullRequest.state)}

          <Header as="span" data-test-id="pull-request-view-message">
            {pullRequest.message}
          </Header>

          <Divider hidden={true} />

          <Comment.Group>
            <SubmitComment pullRequest={pullRequest} />

            <StateComment pullRequest={pullRequest} />
          </Comment.Group>
        </Segment>

      </div>
    );
  };

  render(): React.Node {
    const { pullRequestId } = this.props;

    return (
      <FetchWrapper
        render={this.renderView}
        renderPropsAndState={this.props}
        fetchId={pullRequestId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const View = withNamespaces()(PureView);

export { PureView };
export default View;
