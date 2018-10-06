// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  upstreamTopicId: string,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureForkInfo extends React.Component<Props> {
  renderForkInfo = (topic: m.Topic): React.Node => {
    const { t } = this.props;

    return (
      <div data-test-id="topic-fork-info">
        <Icon name="copy outline" size="small" />
        {t('topics:sidebars.topicInfo.forkedFrom')}
        <Link to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: topic.id })}>
          <small>
            { topic.title }
          </small>
        </Link>
      </div>
    );
  };

  render(): React.Node {
    const { upstreamTopicId } = this.props;

    return (
      <FetchWrapper
        render={this.renderForkInfo}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={upstreamTopicId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const ForkInfo = translate()(PureForkInfo);

export { PureForkInfo };
export default ForkInfo;
