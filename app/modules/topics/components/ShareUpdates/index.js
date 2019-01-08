// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps, Interpolate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Item, Icon, Button, Message, Divider, Header } from 'semantic-ui-react';

import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  topic: m.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureShareUpdates extends React.Component<Props> {
  renderShareUpdates = (upstreamTopic: m.Topic): React.Node => {
    const { t, topic } = this.props;

    return (
      <div data-test-id="share-updates">
        <Item.Group>
          <Item>
            <Item.Content>
              <p>
                <Interpolate
                  i18nKey="topics:sidebars.shareUpdates.info"
                  upstreamTopicTitle={(
                    <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: upstreamTopic.id })}>
                      {upstreamTopic.title}
                    </Link>
                  )}
                />
              </p>
              {/* TODO: commit count */}
              <p><strong>{t('topics:sidebars.shareUpdates.count', { count: 0 })}</strong></p>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              {(topic.isDirty ? (
                <Message
                  warning={true}
                  icon="exclamation"
                  content={t('topics:sidebars.shareUpdates.saveChanges')}
                  data-test-id="share-updates-dirty-message"
                />
              ) : null)}
              <Button
                disabled={topic.isDirty}
                secondary={true}
                fluid={true}
                data-test-id="share-updates-pull-request-button"
              >
                <Icon name="tasks" />
                {t('common:button.pr')}
              </Button>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>

            </Item.Content>
          </Item>
        </Item.Group>
        <Header as="h3" fluid={true}>
          <Icon name="refresh" />
          {t('topics:sidebars.shareUpdates.pendingRequests.title')}
        </Header>
        <Item.Group>
          <Item>
            <Item.Content>
              <em>{t('topics:sidebars.shareUpdates.pendingRequests.empty')}</em>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  };

  render(): React.Node {
    const { topic } = this.props;

    return (
      <FetchWrapper
        render={this.renderShareUpdates}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={topic.upstreamTopicId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const ShareUpdates = withNamespaces()(PureShareUpdates);

export { PureShareUpdates };
export default ShareUpdates;
