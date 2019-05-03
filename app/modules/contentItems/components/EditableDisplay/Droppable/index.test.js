// @flow

import * as React from 'react';
import { mount } from 'enzyme';

import { DummyProviders, dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import Droppable, { PureDroppable } from '.';

describe(`EditableDisplay`, (): void => {

  let dummyConnectDropTarget: any;
  let dummyContentItem: m.ContentItem;

  beforeEach((): void => {
    dummyConnectDropTarget = (body) => body;
    dummyContentItem = dummyData.paragraphContentItem;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <Droppable contentItem={dummyContentItem} />
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
