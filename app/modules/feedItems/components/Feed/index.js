// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Feed as SemanticUiFeed, Header } from 'semantic-ui-react';

import { type ModulesAction, type AppState } from 'types/redux';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

import FeedItem from './FeedItem';

type StateProps = {|
  sortedFeedItems: $ReadOnlyArray<m.FeedItem>,
|};

type DispatchProps = {|
  handleFetchAll: () => void,
|};

type Props = {| ...TranslatorProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    sortedFeedItems: selectors.getAllSortedDescByTimestamp(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    handleFetchAll: (): void => {
      dispatch(actions.fetchAll());
    },
  };
};

class PureFeed extends React.Component<Props> {
  componentDidMount(): void {
    const { handleFetchAll } = this.props;
    handleFetchAll();
  }

  render(): React.Node {
    const { t, sortedFeedItems } = this.props;

    return (
      <SemanticUiFeed>
        <Header>{t('feedItems:feed.header')}</Header>
        {sortedFeedItems.map((feedItem) => (
          <FeedItem key={feedItem.id} feedItem={feedItem} />
        ))}
      </SemanticUiFeed>
    );
  }
}

const Feed = connect(mapStateToProps, mapDispatchToProps)(translate()(PureFeed));

export { PureFeed };
export default Feed;
