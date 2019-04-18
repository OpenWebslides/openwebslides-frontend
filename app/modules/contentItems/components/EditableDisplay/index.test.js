// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyContentItemData as dummyData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import EditableDisplay, { PureEditableDisplay, mapDispatchToProps, type DispatchProps } from '.';

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

  let dummyDispatchProps: DispatchProps;
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
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a the correct type component for the type of the passed contentItem`, (): void => {
    let enzymeWrapper: any;

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.rootContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('PureRoot')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.headingContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('PureHeading')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.paragraphContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('PureParagraph')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.listContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.blockquoteContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.codeContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.imageContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.videoContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.audioContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.iframeContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.slideBreakContentItem} setTopicDirty={dummySetTopicDirty} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.courseBreakContentItem} setTopicDirty={dummySetTopicDirty} />);
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

  describe(`mapDispatchToProps`, (): void => {

    it(`dispatches the correct TOGGLE_EDITING action, when onStartEditing is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({}: any)).onStartEditing(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.toggleEditing(dummyId, true));
    });

    it(`dispatches the correct TOGGLE_EDITING action, when onEndEditing is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({}: any)).onEndEditing(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.toggleEditing(dummyId, false));
    });

    it(`dispatches the correct EDIT action and calls setTopicDirty, when onEditPlainText is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyText = 'Lorem ipsum';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onEditPlainText(dummyId, dummyText);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.edit(dummyId, { text: dummyText }));
    });

    it(`dispatches the correct ADD action and calls setTopicDirty, when onAddEmptySubItem is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onAddEmptySubItem(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.add(
        m.contentItemTypes.PARAGRAPH,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyId,
          indexInSiblingItems: 0,
        },
        { text: '' },
      ));
    });

    it(`dispatches the correct ADD action and calls setTopicDirty, when onAddEmptySiblingItemBelow is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onAddEmptySiblingItemBelow(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.add(
        m.contentItemTypes.PARAGRAPH,
        {
          contextType: m.contextTypes.SIBLING,
          contextItemId: dummyId,
          indexInSiblingItemsShift: 0,
        },
        { text: '' },
      ));
    });

    it(`dispatches the correct REMOVE_AND_TOGGLE_PREVIOUS_ITEM action and calls setTopicDirty, when onRemove is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onRemove(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.removeAndTogglePreviousItem(dummyId));
    });

    it(`dispatches the correct INDENT action and calls setTopicDirty, when onIndent is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onIndent(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.indent(dummyId));
    });

    it(`dispatches the correct REVERSE_INDENT action and calls setTopicDirty, when onReverseIndent is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({ setTopicDirty: dummySetTopicDirty }: any)).onReverseIndent(dummyId);
      expect(dummySetTopicDirty).toHaveBeenCalledWith(true);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.reverseIndent(dummyId));
    });

  });

});
