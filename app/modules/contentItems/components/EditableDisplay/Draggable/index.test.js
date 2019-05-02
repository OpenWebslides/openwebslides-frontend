// @flow

import * as React from 'react';
import { mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import Draggable, { PureDraggable, source } from '.';

describe(`EditableDisplay`, (): void => {

  let dummyConnectDragSource: any;
  let dummyContentItemId: string;

  beforeEach((): void => {
    dummyConnectDragSource = (body) => body;
    dummyContentItemId = 'dummyContentItemId';
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <Draggable contentItemId={dummyContentItemId} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the component without .draggable--active class when it is not dragging`, (): void => {
    const enzymeWrapper = mount(
      <PureDraggable
        connectDragSource={dummyConnectDragSource}
        isDragging={false}
      />,
    );

    expect(enzymeWrapper.find('.draggable').hasClass('draggable--active')).toBe(false);
  });

  it(`renders the component with .draggable--active class when it is dragging`, (): void => {
    const enzymeWrapper = mount(
      <PureDraggable
        connectDragSource={dummyConnectDragSource}
        isDragging={true}
      />,
    );

    expect(enzymeWrapper.find('.draggable').hasClass('draggable--active')).toBe(true);
  });

  it(`renders the passed children`, (): void => {
    const enzymeWrapper = mount(
      <PureDraggable
        connectDragSource={dummyConnectDragSource}
        isDragging={true}
      >
        <div data-test-id="test-children">test children</div>
      </PureDraggable>,
    );

    expect(enzymeWrapper.find('[data-test-id="test-children"]').hostNodes()).toHaveLength(1);
  });

  it(`returns the content item id as drag source type`, (): void => {
    expect(source.beginDrag({ contentItemId: dummyContentItemId })).toStrictEqual({ id: dummyContentItemId });
  });

});
