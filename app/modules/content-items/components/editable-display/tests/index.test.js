// @flow

import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18nextConfig from 'config/i18next';
import { mount, shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import EditableDisplay, {
  PureEditableDisplay,
  mapDispatchToProps,
  DummyDisplayComponent,
} from '..';

import { edit } from '../../../actions';
import { contentItemTypes } from '../../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
  ContentItemsState,
} from '../../../model';

import * as dummyContentItemData from '../../../lib/test-resources/dummyContentItemData';

describe(`EditableDisplay`, (): void => {

  const dummyOnEditPlainText = (): void => {};
  const dummyBaseClassName = 'EditableDisplayBaseClassName';
  const dummySubItemsClassNameSuffix = 'EditableDisplaySubItemsClassNameSuffix';
  // const baseSelector = `.${dummyBaseClassName}`;
  const subItemsSelector = `.${dummyBaseClassName}${dummySubItemsClassNameSuffix}`;

  const dummyRoot2: $Exact<RootContentItem> = {
    id: 'ua32xchh7q',
    type: contentItemTypes.ROOT,
    childItemIds: [],
  };
  const dummyNestedParagraph2: $Exact<ParagraphContentItem> = {
    id: 'cpi389s1e3',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed ut neque tristique, venenatis purus a, consequat orci. Aenean sed lectus et ante aliquet maximus.',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [],
  };
  const dummyNestedParagraph1: $Exact<ParagraphContentItem> = {
    id: 'vrci6v35s7',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed hendrerit eget metus nec elementum. Aenean commodo semper sapien, nec porta leo.',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [],
  };
  const dummyLevel2Heading: $Exact<HeadingContentItem> = {
    id: 'qbpm9mgn6b',
    type: contentItemTypes.HEADING,
    text: 'Level 2 heading',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [dummyNestedParagraph1.id, dummyNestedParagraph2.id],
  };
  const dummyLevel1Heading: $Exact<HeadingContentItem> = {
    id: '6o6qy5dz0a',
    type: contentItemTypes.HEADING,
    text: 'Level 1 heading',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [dummyLevel2Heading.id],
  };
  const dummyRoot1: $Exact<RootContentItem> = {
    id: 'jptgampe2x',
    type: contentItemTypes.ROOT,
    childItemIds: [dummyLevel1Heading.id],
  };
  const dummyContentItemsById: ContentItemsById = {
    [dummyRoot1.id]: dummyRoot1,
    [dummyLevel1Heading.id]: dummyLevel1Heading,
    [dummyLevel2Heading.id]: dummyLevel2Heading,
    [dummyNestedParagraph1.id]: dummyNestedParagraph1,
    [dummyNestedParagraph2.id]: dummyNestedParagraph2,
    [dummyRoot2.id]: dummyRoot2,
  };
  const dummyContentItemsState: ContentItemsState = {
    byId: dummyContentItemsById,
  };
  const dummyState: any = {
    modules: {
      contentItems: dummyContentItemsState,
    },
  };

  // eslint-disable-next-line no-unused-vars
  const dummyReducer = (state: any = {}, action: any): any => state;
  const dummyStore = createStore(dummyReducer, dummyState);

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId="abcdefghij"
        contentItem={{ id: 'abcdefghij', type: contentItemTypes.ROOT, childItemIds: [] }}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders a the correct type component for the type of the passed contentItem`, (): void => {
    let enzymeWrapper: any;

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.rootContentItem.id}
        contentItem={dummyContentItemData.rootContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('PureRoot')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.headingContentItem.id}
        contentItem={dummyContentItemData.headingContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('PureHeading')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.paragraphContentItem.id}
        contentItem={dummyContentItemData.paragraphContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('PureParagraph')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.listContentItem.id}
        contentItem={dummyContentItemData.listContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.listItemContentItem.id}
        contentItem={dummyContentItemData.listItemContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.blockquoteContentItem.id}
        contentItem={dummyContentItemData.blockquoteContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.codeContentItem.id}
        contentItem={dummyContentItemData.codeContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.imageContentItem.id}
        contentItem={dummyContentItemData.imageContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.videoContentItem.id}
        contentItem={dummyContentItemData.videoContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.audioContentItem.id}
        contentItem={dummyContentItemData.audioContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.iframeContentItem.id}
        contentItem={dummyContentItemData.iframeContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.slideBreakContentItem.id}
        contentItem={dummyContentItemData.slideBreakContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);

    enzymeWrapper = shallow(
      <PureEditableDisplay
        {...dummyTranslatorProps}
        contentItemId={dummyContentItemData.courseBreakContentItem.id}
        contentItem={dummyContentItemData.courseBreakContentItem}
        onEditPlainText={dummyOnEditPlainText}
      />,
    );
    expect(enzymeWrapper.find('DummyDisplayComponent')).toHaveLength(1);
  });

  it(`throws an ObjectNotFoundError, when the passed contentItemId is invalid`, (): void => {
    const dummyInvalidId = 'abcdefghij';
    expect((): void => {
      shallow(
        <EditableDisplay
          store={dummyStore}
          contentItemId={dummyInvalidId}
          baseClassName={dummyBaseClassName}
          subItemsClassNameSuffix={dummySubItemsClassNameSuffix}
        />,
      );
    }).toThrow(ObjectNotFoundError);
  });

  it(`renders all of the contentItem's sub items, when the contentItem is subable and has sub items`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <EditableDisplay
            contentItemId={dummyRoot1.id}
            baseClassName={dummyBaseClassName}
            subItemsClassNameSuffix={dummySubItemsClassNameSuffix}
          />
        </I18nextProvider>
      </Provider>,
    );

    const subItemsTags = enzymeWrapper.find(subItemsSelector).hostNodes();
    expect(subItemsTags).toHaveLength(2);

    const level1SubItemsTag = subItemsTags.first();
    expect(level1SubItemsTag.text()).toContain(dummyLevel2Heading.text);
    expect(level1SubItemsTag.text()).toContain(dummyNestedParagraph1.text);
    expect(level1SubItemsTag.text()).toContain(dummyNestedParagraph2.text);

    const level2SubItemsTags = level1SubItemsTag.children().find(subItemsSelector).hostNodes();
    expect(level2SubItemsTags).toHaveLength(1);

    const level2SubItemsTag = level2SubItemsTags.first();
    expect(level2SubItemsTag.text()).not.toContain(dummyLevel2Heading.text);
    expect(level2SubItemsTag.text()).toContain(dummyNestedParagraph1.text);
    expect(level2SubItemsTag.text()).toContain(dummyNestedParagraph2.text);
  });

  it(`does not render an empty sub items container, when the contentItem is not subable`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <EditableDisplay
            contentItemId={dummyRoot2.id}
            baseClassName={dummyBaseClassName}
            subItemsClassNameSuffix={dummySubItemsClassNameSuffix}
          />
        </I18nextProvider>
      </Provider>,
    );
    const subItemsTags = enzymeWrapper.find(subItemsSelector).hostNodes();
    expect(subItemsTags).toHaveLength(0);
  });

  it(`does not render an empty sub items container, when the contentItem is subable but does not contain any sub items`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <EditableDisplay
            contentItemId={dummyNestedParagraph1.id}
            baseClassName={dummyBaseClassName}
            subItemsClassNameSuffix={dummySubItemsClassNameSuffix}
          />
        </I18nextProvider>
      </Provider>,
    );
    const subItemsTags = enzymeWrapper.find(subItemsSelector).hostNodes();
    expect(subItemsTags).toHaveLength(0);
  });

  describe(`mapDispatchToProps`, (): void => {

    it(`dispatches the correct EDIT action, when onEditPlainText is called`, (): void => {
      const dummyId = 'abcdefghijklmnopqrst';
      const dummyText = 'Lorem ipsum';
      const dummyDispatch = jest.fn();
      mapDispatchToProps(dummyDispatch, ({}: any)).onEditPlainText(dummyId, dummyText);
      expect(dummyDispatch).toHaveBeenCalledWith(edit(dummyId, { text: dummyText }));
    });

  });

  describe(`DummyDisplayComponent`, (): void => {

    it(`renders without errors`, (): void => {
      const enzymeWrapper = shallow(
        <DummyDisplayComponent />,
      );
      expect(enzymeWrapper.isEmptyRender()).toEqual(false);
    });

  });

});
