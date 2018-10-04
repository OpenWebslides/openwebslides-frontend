// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { type AppState } from 'types/redux';
import FetchWrapper from 'components/FetchWrapper';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  topicId: string,
|};

type StateProps = {|
  // Denormalized topic root content item
  rootContentItem: ?contentItems.model.DenormalizedRootContentItem,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps |};

const { HtmlDisplay: ContentItemHtmlDisplay } = contentItems.components;

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { topicId } = props;

  const topic = selectors.getById(state, { id: topicId });
  const rootContentItem = (topic != null)
    ? contentItems.selectors.getDenormalizedById(state, { id: topic.rootContentItemId })
    : null;

  return {
    rootContentItem,
  };
};

class PureCourse extends React.Component<Props> {
  fetchCondition = (topic: ?m.Topic): boolean => {
    return (topic == null || !topic.isContentFetched);
  };

  renderCourse = (topic: m.Topic): React.Node => {
    const { rootContentItem } = this.props;

    return (
      <div data-test-id="topic-course">
        <Header as="h1">{topic.title}</Header>

        <ContentItemHtmlDisplay
          contentItem={rootContentItem}
          headingLevel={2}
        />
      </div>
    );
  };

  render(): React.Node {
    const { topicId } = this.props;

    return (
      <FetchWrapper
        render={this.renderCourse}
        renderPropsAndState={this.props}
        fetchId={topicId}
        fetchAction={actions.fetchWithContent}
        fetchedPropSelector={selectors.getById}
        fetchCondition={this.fetchCondition}
      />
    );
  }
}

const Course = connect(mapStateToProps)(translate()(PureCourse));

export { PureCourse };
export default Course;
