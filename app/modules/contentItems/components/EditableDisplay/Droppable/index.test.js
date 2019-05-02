// @flow

import * as React from 'react';
import { mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import Droppable, { PureDroppable } from '.';

describe(`EditableDisplay`, (): void => {

  let dummyConnectDropTarget: any;
  let dummyContentItemId: string;

  beforeEach((): void => {
    dummyConnectDropTarget = (body) => body;
    dummyContentItemId = 'dummyContentItemId';
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <Droppable contentItemId={dummyContentItemId} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the component without .droppable--active class when it is not over`, (): void => {
    const enzymeWrapper = mount(
      <PureDroppable
        connectDropTarget={dummyConnectDropTarget}
        isOver={false}
      />,
    );

    expect(enzymeWrapper.find('.droppable').hasClass('droppable--active')).toBe(false);
  });

  it(`renders the component with .droppable--active class when it is over`, (): void => {
    const enzymeWrapper = mount(
      <PureDroppable
        connectDropTarget={dummyConnectDropTarget}
        isOver={true}
      />,
    );

    expect(enzymeWrapper.find('.droppable').hasClass('droppable--active')).toBe(true);
  });

  it(`renders the passed children`, (): void => {
    const enzymeWrapper = mount(
      <PureDroppable
        connectDropTarget={dummyConnectDropTarget}
        isDragging={true}
      >
        <div data-test-id="test-children">test children</div>
      </PureDroppable>,
    );

    expect(enzymeWrapper.find('[data-test-id="test-children"]').hostNodes()).toHaveLength(1);
  });

});
