// @flow

import * as React from 'react';
import { mount } from 'enzyme';
import { wrapInTestContext } from 'react-dnd-test-utils';

import { DummyProviders, dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import Droppable, { PureDroppable } from '.';

describe(`EditableDisplay`, (): void => {

  let dummyConnectDropTarget: any;
  let dummyContentItem: m.ContentItem;

  let TestDroppable: any;

  beforeEach((): void => {
    dummyConnectDropTarget = (body) => body;
    dummyContentItem = dummyData.paragraphContentItem;

    TestDroppable = wrapInTestContext(Droppable);
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

  describe(`draggable types`, (): void => {

    it(`returns the appropriate content item types as draggable types when the content item is a ROOT content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.rootContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForRootContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a HEADING content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.headingContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForHeadingContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a PARAGRAPH content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.paragraphContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForParagraphContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a LIST content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.listContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForListContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a BLOCKQUOTE content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.blockquoteContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForBlockquoteContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a CODE content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.codeContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForCodeContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a IMAGE content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.imageContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForImageContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a VIDEO content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.videoContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForVideoContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a IFRAME content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.iframeContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForIframeContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a SLIDE_BREAK content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.slideBreakContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForSlideBreakContentItem);
    });

    it(`returns the appropriate content item types as draggable types when the content item is a COURSE_BREAK content item`, (): void => {
      const enzymeWrapper = mount(<TestDroppable contentItem={dummyData.courseBreakContentItem} />);

      expect([...enzymeWrapper.instance().getManager().getRegistry().types.values()][0]).toStrictEqual(m.subableContentItemTypesForCourseBreakContentItem);
    });

  });

});
