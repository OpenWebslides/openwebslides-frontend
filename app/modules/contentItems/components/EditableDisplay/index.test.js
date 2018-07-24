// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { ObjectNotFoundError } from 'errors';
import { DummyProviders, dummyContentItemData as dummyData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import EditableDisplay, { PureEditableDisplay, mapDispatchToProps } from '.';
import type { DispatchProps } from '.';

describe(`EditableDisplay`, (): void => {

  let dummyRoot2: $Exact<m.RootContentItem>;
  let dummyParagraph1132: $Exact<m.ParagraphContentItem>;
  let dummyParagraph1131: $Exact<m.ParagraphContentItem>;
  let dummyHeading113: $Exact<m.HeadingContentItem>;
  let dummyParagraph112: $Exact<m.ParagraphContentItem>;
  let dummyParagraph111: $Exact<m.ParagraphContentItem>;
  let dummyHeading11: $Exact<m.HeadingContentItem>;
  let dummyRoot1: $Exact<m.RootContentItem>;
  let dummyContentItemsById: $Exact<m.ContentItemsById>;
  let dummyState: any;

  let dummyDispatchProps: DispatchProps;
  let subItemsSelector: string;

  beforeEach((): void => {
    dummyRoot2 = { ...dummyData.rootContentItem2 };
    dummyParagraph1132 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph1131 = { ...dummyData.paragraphContentItem3 };
    dummyHeading113 = { ...dummyData.headingContentItem2, subItemIds: [dummyParagraph1131.id, dummyParagraph1132.id] };
    dummyParagraph112 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph111 = { ...dummyData.paragraphContentItem };
    dummyHeading11 = { ...dummyData.headingContentItem, subItemIds: [dummyParagraph111.id, dummyParagraph112.id, dummyHeading113.id] };
    dummyRoot1 = { ...dummyData.rootContentItem, childItemIds: [dummyHeading11.id] };
    dummyContentItemsById = {
      [dummyRoot1.id]: dummyRoot1,
      [dummyHeading11.id]: dummyHeading11,
      [dummyParagraph111.id]: dummyParagraph111,
      [dummyParagraph112.id]: dummyParagraph112,
      [dummyHeading113.id]: dummyHeading113,
      [dummyParagraph1131.id]: dummyParagraph1131,
      [dummyParagraph1132.id]: dummyParagraph1132,
      [dummyRoot2.id]: dummyRoot2,
    };
    dummyState = {
      modules: {
        contentItems: {
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
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditableDisplay
        contentItemId="abcdefghij"
        contentItem={{ id: 'abcdefghij', type: m.contentItemTypes.ROOT, isEditing: false, childItemIds: [] }}
        {...dummyDispatchProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders a the correct type component for the type of the passed contentItem`, (): void => {
    let enzymeWrapper: *;

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.rootContentItem} />);
    expect(enzymeWrapper.find('PureRoot')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.headingContentItem} />);
    expect(enzymeWrapper.find('PureHeading')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.paragraphContentItem} />);
    expect(enzymeWrapper.find('PureParagraph')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.listContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.listItemContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.blockquoteContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.codeContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.imageContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.videoContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.audioContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.iframeContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.slideBreakContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(<PureEditableDisplay contentItemId="" {...dummyDispatchProps} contentItem={dummyData.courseBreakContentItem} />);
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);
  });

  it(`throws an ObjectNotFoundError, when the passed contentItemId is invalid`, (): void => {
    // Suppress console.error from mount $FlowFixMe
    console.error = jest.fn();
    expect((): void => {
      mount(
        <DummyProviders dummyState={dummyState}>
          <EditableDisplay
            contentItemId="DefinitelyNotValidId"
          />
        </DummyProviders>,
      );
    }).toThrow(ObjectNotFoundError);
  });

  it(`renders all of the contentItem's sub items, when the contentItem is subable and has sub items`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <EditableDisplay
          contentItemId={dummyRoot1.id}
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
          contentItemId={dummyRoot2.id}
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

    it(`dispatches the correct EDIT action, when onEditPlainText is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyText = 'Lorem ipsum';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({}: any)).onEditPlainText(dummyId, dummyText);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.edit(dummyId, { text: dummyText }));
    });

    it(`dispatches the correct TOGGLE_EDITING and ADD actions, when onAddEmptySubItem is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({}: any)).onAddEmptySubItem(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.toggleEditing(dummyId, false));
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

    it(`dispatches the correct TOGGLE_EDITING and ADD actions, when onAddEmptySiblingItemBelow is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({}: any)).onAddEmptySiblingItemBelow(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.toggleEditing(dummyId, false));
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

    it(`dispatches the correct REMOVE_AND_TOGGLE_PREVIOUS_ITEM action, when onRemove is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({}: any)).onRemove(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.removeAndTogglePreviousItem(dummyId));
    });

    it(`dispatches the correct INDENT action, when onIndent is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({}: any)).onIndent(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.indent(dummyId));
    });

    it(`dispatches the correct REVERSE_INDENT action, when onReverseIndent is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({}: any)).onReverseIndent(dummyId);
      expect(dummyDispatch).toHaveBeenCalledWith(actions.reverseIndent(dummyId));
    });

  });

});
