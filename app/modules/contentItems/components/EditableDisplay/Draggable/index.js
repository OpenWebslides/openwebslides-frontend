// @flow

import * as React from 'react';
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
    isDragging: monitor.isDragging(),
  };
};

const PureDraggable = (props: Props): React.Node => {
  const { connectDragSource, isDragging, children } = props;

  return (
    connectDragSource(
      <div className={`draggable ${isDragging ? 'draggable--active' : ''}`}>
        {children}
      </div>,
    )
  );
};

const Draggable = DragSource(
  m.contentItemTypes.ROOT, // TODO: replace with content item-specific type
  source,
  collect,
)(PureDraggable);

export { PureDraggable, source, collect };
export default Draggable;
