// @flow

import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { type AppState } from 'types/redux';

import * as m from '../../model';
import selectors from '../../selectors';
import { passThroughProps } from '../RootEditableDisplay';

import typesToComponentsMap from './typesToComponentsMap';
import Draggable from './Draggable';
import Droppable from './Droppable';

type PassedProps = {|
  contentItemId: string,
  setTopicDirty: (dirty: boolean) => void,
|};

type StateProps = {|
  contentItem: ?m.ContentItem,
  isSelected: boolean,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { contentItemId } = props;
  return {
    contentItem: selectors.getById(state, { id: contentItemId }),
    isSelected: (selectors.getCurrentlySelectedId(state) === contentItemId),
  };
};

class PureEditableDisplay extends React.Component<Props> {
  renderSubItemsEditableDisplay = (contentItem: m.ContentItem): React.Node => {
    if (
      contentItem == null
      || contentItem.type === m.contentItemTypes.ROOT
      || contentItem.subItemIds == null
      || contentItem.subItemIds.length === 0
    ) return null;

    return (
      <div
        className="content-item-editable-display__sub-items"
        data-test-id="content-item-editable-display__sub-items"
      >
        {contentItem.subItemIds.map((subItemId: string): React.Node => (
          <EditableDisplay
            {..._.pick(this.props, passThroughProps)}
            key={subItemId}
            contentItemId={subItemId}
          />
        ))}
      </div>
    );
  };

  renderDisplayComponent = (contentItem: m.ContentItem): React.Node => {
    const { isSelected } = this.props;

    const DisplayComponent = typesToComponentsMap[contentItem.type];

    return (
      <DisplayComponent
        {..._.pick(this.props, passThroughProps)}
        contentItem={contentItem}
        isSelected={isSelected}
      />
    );
  };

  renderEditableDisplay = (contentItem: m.ContentItem): React.Node => {
    return (
      <div
        className="content-item-editable-display"
        data-test-id="content-item-editable-display"
      >
        <div className="content-item-editable-display-component">
          {/* Render moveable source/target only for non-root content items */}
          {(contentItem.type === m.contentItemTypes.ROOT
            ? this.renderDisplayComponent(contentItem)
            : (
              <Draggable contentItem={contentItem} data-test-id="content-item-editable-display-draggable">
                <Droppable contentItem={contentItem} data-test-id="content-item-editable-display-droppable">
                  {this.renderDisplayComponent(contentItem)}
                </Droppable>
              </Draggable>
            )
          )}
        </div>
        {this.renderSubItemsEditableDisplay(contentItem)}
      </div>
    );
  };

  render(): React.Node {
    const { contentItem } = this.props;
    return (contentItem == null) ? null : this.renderEditableDisplay(contentItem);
  }
}

const EditableDisplay = connect(mapStateToProps)(PureEditableDisplay);

export { PureEditableDisplay, passThroughProps };
export default EditableDisplay;
