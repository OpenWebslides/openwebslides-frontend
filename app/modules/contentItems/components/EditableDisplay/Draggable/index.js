// @flow

import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import {
  DragSource,
  type DragSourceConnector,
  type DragSourceMonitor,
  type DragSourceCollector,
  type DragSourceType,
} from 'react-dnd';

import * as m from '../../../model';

type PassedProps = {|
  contentItem: m.ContentItem,
  children: React.Node,
|};

type ComponentState = {|
  isHovering: boolean,
|};

type Props = {| ...PassedProps, ...DragSourceCollector |};

const source = {
  beginDrag(props: Props): DragSourceType {
    const { contentItem } = props;

    return { id: contentItem.id };
  },
};

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor): DragSourceCollector => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
};

class PureDraggable extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    isHovering: false,
  };

  handleMouseEnter = (): void => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = (): void => {
    this.setState({ isHovering: false });
  };

  render(): React.Node {
    const { connectDragPreview, connectDragSource, isDragging, children } = this.props;
    const { isHovering } = this.state;

    return (
      connectDragPreview(
        <div
          className={`draggable ${isDragging ? 'draggable--active' : ''}`}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          data-test-id="draggable"
        >
          {children}
          {connectDragSource(
            isHovering && (
              <div className="draggable__handle">
                <Icon name="bars" color="grey" />
              </div>
            ),
          )}
        </div>,
      )
    );
  }
}

const Draggable = DragSource(
  (props: Props): string => props.contentItem.type,
  source,
  collect,
)(PureDraggable);

export { PureDraggable, source, collect };
export default Draggable;
