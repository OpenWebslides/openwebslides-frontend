// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../model';
import actions from '../../actions';

import EditableDisplay, { PureEditableDisplay } from '.';

describe(`EditableDisplay`, (): void => {

  let dummySlideBreak21: m.SlideBreakContentItem;
  let dummyRoot2: m.RootContentItem;
  let dummyParagraph1132: m.ParagraphContentItem;
  let dummyParagraph1131: m.ParagraphContentItem;
  let dummyHeading113: m.HeadingContentItem;
  let dummyParagraph112: m.ParagraphContentItem;
  let dummyParagraph111: m.ParagraphContentItem;
  let dummyHeading11: m.HeadingContentItem;
  let dummyRoot1: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyState: any;
  let dummyDispatch: any;

  let dummyDispatchProps: any;
  let subItemsSelector: string;

  let dummySetTopicDirty: any;

  beforeEach((): void => {
    dummySlideBreak21 = { ...dummyData.slideBreakContentItem };
    dummyRoot2 = { ...dummyData.rootContentItem2, subItemIds: [dummySlideBreak21.id] };
    dummyParagraph1132 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph1131 = { ...dummyData.paragraphContentItem3 };
    dummyHeading113 = { ...dummyData.headingContentItem2, subItemIds: [dummyParagraph1131.id, dummyParagraph1132.id] };
    dummyParagraph112 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph111 = { ...dummyData.paragraphContentItem };
    dummyHeading11 = { ...dummyData.headingContentItem, subItemIds: [dummyParagraph111.id, dummyParagraph112.id, dummyHeading113.id] };
    dummyRoot1 = { ...dummyData.rootContentItem, subItemIds: [dummyHeading11.id] };
    dummyContentItemsById = {
      [dummyRoot1.id]: dummyRoot1,
      [dummyHeading11.id]: dummyHeading11,
      [dummyParagraph111.id]: dummyParagraph111,
      [dummyParagraph112.id]: dummyParagraph112,
      [dummyHeading113.id]: dummyHeading113,
      [dummyParagraph1131.id]: dummyParagraph1131,
      [dummyParagraph1132.id]: dummyParagraph1132,
      [dummyRoot2.id]: dummyRoot2,
      [dummySlideBreak21.id]: dummySlideBreak21,
    };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        contentItems: {
          ...dummyInitialState.modules.contentItems,
          byId: dummyContentItemsById,
        },
      },
    };
    dummyDispatch = jest.fn();

    dummyDispatchProps = {
      onStartEditing: jest.fn(),
      onEndEditing: jest.fn(),
      onEditPlainText: jest.fn(),
      onAddEmptySubItem: jest.fn(),
      onAddEmptySiblingItemBelow: jest.fn(),
      onRemove: jest.fn(),
      onIndent: jest.fn(),
      onReverseIndent: jest.fn(),
    };
    subItemsSelector = `[data-test-id="content-item-editable-display__sub-items"]`;

    dummySetTopicDirty = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditableDisplay
        contentItemId="abcdefghij"
        contentItem={{ id: 'abcdefghij', type: m.contentItemTypes.ROOT, isEditing: false, subItemIds: [] }}
        {...dummyDispatchProps}
        setTopicDirty={dummySetTopicDirty}
        isSelected={false}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a the correct type component for the type of the passed contentItem`, (): void => {
    let enzymeWrapper: any;

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.rootContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('PureRoot')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.headingContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('PureHeading')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.paragraphContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('PureParagraph')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.listContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.blockquoteContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.codeContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.imageContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.videoContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.audioContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.iframeContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.slideBreakContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.courseBreakContentItem} setTopicDirty={dummySetTopicDirty} isSelected={false} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);
  });

  it(`renders NULL, when the contentItem with the passed id could not be found`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <EditableDisplay
          contentItemId="InvalidId"
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('PureEditableDisplay').isEmptyRender()).toBe(true);
  });

  it(`renders all of the contentItem's sub items, when the contentItem is subable and has sub items`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <EditableDisplay
          contentItemId={dummyRoot1.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    const subItemsTags = enzymeWrapper.find(subItemsSelector).hostNodes();
    expect(subItemsTags).toHaveLength(2);

    const dummyHeading11SubItemsTag = subItemsTags.first();
    expect(dummyHeading11SubItemsTag.text()).not.toContain(dummyHeading11.text);
    expect(dummyHeading11SubItemsTag.text()).toContain(dummyParagraph111.text);
    expect(dummyHeading11SubItemsTag.text()).toContain(dummyParagraph111.text);
    expect(dummyHeading11SubItemsTag.text()).toContain(dummyHeading113.text);

    const dummyHeading113SubItemsTags = dummyHeading11SubItemsTag.children().find(subItemsSelector).hostNodes();
    expect(dummyHeading113SubItemsTags).toHaveLength(1);

    const dummyHeading113SubItemsTag = dummyHeading113SubItemsTags.first();
    expect(dummyHeading113SubItemsTag.text()).not.toContain(dummyHeading113.text);
    expect(dummyHeading113SubItemsTag.text()).toContain(dummyParagraph1131.text);
    expect(dummyHeading113SubItemsTag.text()).toContain(dummyParagraph1132.text);
  });

  it(`does not render an empty sub items container, when the contentItem is not subable`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <EditableDisplay
          contentItemId={dummySlideBreak21.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );
    const subItemsTags = enzymeWrapper.find(subItemsSelector).hostNodes();
    expect(subItemsTags).toHaveLength(0);
  });

  it(`does not render an empty sub items container, when the contentItem is subable but does not contain any sub items`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <EditableDisplay
          contentItemId={dummyParagraph111.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );
    const subItemsTags = enzymeWrapper.find(subItemsSelector).hostNodes();
    expect(subItemsTags).toHaveLength(0);
  });

  it(`sets the content item as active when the onActivate function passed to the DisplayComponent is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <EditableDisplay
          contentItemId={dummyParagraph111.id}
        />
      </DummyProviders>,
    );

    expect((enzymeWrapper.find('PureEditableDisplay').instance(): any).state.isActive).toBe(false);
    enzymeWrapper.find('PureParagraph').props().onActivate();
    expect((enzymeWrapper.find('PureEditableDisplay').instance(): any).state.isActive).toBe(true);
  });

  it(`sets the content item as inactive when the onDeactivate function passed to the DisplayComponent is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <EditableDisplay
          contentItemId={dummyParagraph111.id}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('PureParagraph').props().onActivate();
    expect((enzymeWrapper.find('PureEditableDisplay').instance(): any).state.isActive).toBe(true);
    enzymeWrapper.find('PureParagraph').props().onDeactivate();
    expect((enzymeWrapper.find('PureEditableDisplay').instance(): any).state.isActive).toBe(false);
  });

  it(`maps isSelected to TRUE when the content item is currently selected in the state`, (): void => {
    const dummySelectedState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        contentItems: {
          ...dummyInitialState.modules.contentItems,
          currentlySelectedId: dummyHeading11.id,
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummySelectedState}>
        <EditableDisplay contentItemId={dummyHeading11.id} />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('PureEditableDisplay').props().isSelected).toBe(true);
  });

  it(`maps isSelected to FALSE when the content item is not currently selected in the state`, (): void => {
    const dummySelectedState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        contentItems: {
          ...dummyInitialState.modules.contentItems,
          currentlySelectedId: dummyHeading113.id,
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummySelectedState}>
        <EditableDisplay contentItemId={dummyHeading11.id} />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('PureEditableDisplay').props().isSelected).toBe(false);
  });

  it(`renders the collapse button when the content item is not a ROOT content item`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <EditableDisplay
          contentItemId={dummyHeading113.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    // Entire hierarchy should contain 3 collapse buttons (one heading and two paragraphs)
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__collapse-button"]').hostNodes()).toHaveLength(3);
  });

  it(`does not render the collapse button when the content item is a ROOT content item`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <EditableDisplay
          contentItemId={dummyRoot1.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    // Entire hierarchy should contain 6 collapse buttons (none for the ROOT)
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__collapse-button"]').hostNodes()).toHaveLength(6);
  });

  it(`collapses the content item, clears the selection and renders a placeholder message when the collapse button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <EditableDisplay
          contentItemId={dummyHeading11.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="content-item-editable-display__collapse-button"]').first().simulate('click');

    // Display component and subItems
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__display-component"]')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__sub-items"]').hostNodes()).toHaveLength(0);

    // Collapsed placeholder
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__expand-button"]').hostNodes()).not.toHaveLength(0);

    expect(dummyDispatch).toHaveBeenCalledWith(actions.setCurrentlySelectedInState(null));
  });

  it(`expands the content item, clears the selection and renders the display component and subItems when the expand button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <EditableDisplay
          contentItemId={dummyHeading11.id}
          setTopicDirty={dummySetTopicDirty}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="content-item-editable-display__collapse-button"]').first().simulate('click');
    enzymeWrapper.find('[data-test-id="content-item-editable-display__expand-button"]').hostNodes().simulate('click');

    // Display component and subItems
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__display-component"]')).not.toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__sub-items"]').hostNodes()).not.toHaveLength(0);

    // Collapsed placeholder
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__expand-button"]').hostNodes()).toHaveLength(0);

    expect(dummyDispatch).toHaveBeenCalledWith(actions.setCurrentlySelectedInState(null));
  });

});
