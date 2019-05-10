// @flow

import _ from 'lodash';
import * as React from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

import { type AppState } from 'types/redux';
import { type TFunction } from 'types/i18next';

import * as m from '../../model';
import selectors from '../../selectors';
import { passThroughProps } from '../RootEditableDisplay';

import typesToComponentsMap from './typesToComponentsMap';

type PassedProps = {|
  contentItemId: string,
  setTopicDirty: (dirty: boolean) => void,
|};

type StateProps = {|
  contentItem: ?m.ContentItem,
  isSelected: boolean,
|};

type Props = {| ...PassedProps, ...StateProps |};

type ComponentState = {|
  isCollapsed: boolean,
|};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { contentItemId } = props;
  return {
    contentItem: selectors.getById(state, { id: contentItemId }),
    isSelected: (selectors.getCurrentlySelectedId(state) === contentItemId),
  };
};

class PureEditableDisplay extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    isCollapsed: false,
  };

  toggleCollapse = (): void => {
    const { isCollapsed } = this.state;

    this.setState({ isCollapsed: !isCollapsed });
  };

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

  renderEditableDisplay = (contentItem: m.ContentItem): React.Node => {
    const { isCollapsed } = this.state;
    const { isSelected } = this.props;

    const DisplayComponent = typesToComponentsMap[contentItem.type];

    return (
      <div
        className="content-item-editable-display"
        data-test-id="content-item-editable-display"
      >
        {isCollapsed ? (
          <Translation>
            {(t: TFunction): React.Node => (
              <Button
                type="button"
                className="link"
                size="mini"
                compact={true}
                onClick={this.toggleCollapse}
                data-test-id="content-item-editable-display__expand-button"
              >
                <Icon name="plus square" />
                {t(`contentItems:hiddenForType.${contentItem.type}`)}
              </Button>
            )}
          </Translation>
        ) : (
          <>
            {(contentItem.type !== m.contentItemTypes.ROOT) && (
              <Button
                onClick={this.toggleCollapse}
                className="content-item-editable-display__collapse-button"
                data-test-id="content-item-editable-display__collapse-button"
              />
            )}
            <DisplayComponent
              {..._.pick(this.props, passThroughProps)}
              contentItem={contentItem}
              isSelected={isSelected}
              data-test-id="content-item-editable-display__display-component"
            />
            {this.renderSubItemsEditableDisplay(contentItem)}
          </>
        )}
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
