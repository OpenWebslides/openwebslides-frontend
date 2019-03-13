// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type AppState } from 'types/redux';
import contentItems from 'modules/contentItems';

import * as m from '../../model';

type PassedProps = {|
  topic: m.Topic,
|};

type StateProps = {|
  // Denormalized topic root content item
  rootContentItem: contentItems.model.DenormalizedRootContentItem,
|};

type Props = {| ...PassedProps, ...StateProps |};

const { HtmlDisplay: ContentItemHtmlDisplay } = contentItems.components;

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { topic } = props;

  const rootContentItem = contentItems.selectors.getDenormalizedById(
    state,
    { id: topic.rootContentItemId },
  );

  return {
    rootContentItem,
  };
};

const PureCourse = (props: Props): React.Node => {
  const { rootContentItem } = props;

  return (
    <div data-test-id="topic-course">
      <ContentItemHtmlDisplay
        contentItem={rootContentItem}
        headingLevel={2}
      />
    </div>
  );
};

const Course = connect(mapStateToProps)(PureCourse);

export { PureCourse };
export default Course;
