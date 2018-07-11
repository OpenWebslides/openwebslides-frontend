// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as model from '../../model';
import * as dummyData from '../testResources/dummyContentItemData';

import convertContextToVerticalContext from '.';

const {
  contextTypes,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
  VerticalContext,
  ExtendedVerticalContext,
  HorizontalContext,
} = model;

describe(`convertContextToVerticalContext`, (): void => {

  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id],
    };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
    };
  });

  it(`returns the correct VerticalContext, when the passed context is a HorizontalContext and the contextItem is a subItem`, (): void => {
    const dummyContext: HorizontalContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: dummyParagraph11.id,
    };
    const actualResult = convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    const expectedResult: ExtendedVerticalContext = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
      indexInSiblingItems: 1,
      siblingItemIds: dummyHeading1.subItemIds,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the correct VerticalContext, when the passed context is a HorizontalContext and the contextItem is a childItem`, (): void => {
    const dummyContext: HorizontalContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: dummyHeading2.id,
    };
    const actualResult = convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    const expectedResult: ExtendedVerticalContext = {
      contextType: contextTypes.PARENT,
      contextItemId: dummyRoot.id,
      indexInSiblingItems: 2,
      siblingItemIds: dummyRoot.childItemIds,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the correct VerticalContext, when the passed context is a HorizontalContext and indexInSiblingItemsShift is 0`, (): void => {
    const dummyContext: HorizontalContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: dummyParagraph12.id,
      indexInSiblingItemsShift: 0,
    };
    const actualResult = convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    const expectedResult: ExtendedVerticalContext = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
      indexInSiblingItems: 2,
      siblingItemIds: dummyHeading1.subItemIds,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the correct VerticalContext, when the passed context is a HorizontalContext and indexInSiblingItemsShift is a positive number different from 0`, (): void => {
    const dummyContext: HorizontalContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: dummyParagraph11.id,
      indexInSiblingItemsShift: 1,
    };
    const actualResult = convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    const expectedResult: ExtendedVerticalContext = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
      indexInSiblingItems: 2,
      siblingItemIds: dummyHeading1.subItemIds,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the correct VerticalContext, when the passed context is a HorizontalContext and indexInSiblingItemsShift is a negative number`, (): void => {
    const dummyContext: HorizontalContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: dummyParagraph12.id,
      indexInSiblingItemsShift: -2,
    };
    const actualResult = convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    const expectedResult: ExtendedVerticalContext = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
      indexInSiblingItems: 0,
      siblingItemIds: dummyHeading1.subItemIds,
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it(`returns the passed context unchanged, when the passed context already is a VerticalContext`, (): void => {
    const dummyContext: VerticalContext = {
      contextType: contextTypes.PARENT,
      contextItemId: dummyRoot.id,
    };
    const actualResult = convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    expect(actualResult).toBe(dummyContext);
  });

  it(`returns NULL, when the passed context is NULL`, (): void => {
    const actualResult = convertContextToVerticalContext(null, dummyContentItemsById);
    expect(actualResult).toBeNull();
  });

  it(`throws an ObjectNotFoundError, when the contentItem with id contextItemId could not be found`, (): void => {
    const dummyContext: HorizontalContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: 'DefinitelyNotValidId',
    };
    expect((): void => {
      convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the calculated indexInSiblingItems is less than 0`, (): void => {
    const dummyContext: HorizontalContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: dummyParagraph12.id,
      indexInSiblingItemsShift: -3,
    };
    expect((): void => {
      convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the calculated indexInSiblingItems i greater than the length of the siblingItemIds array`, (): void => {
    const dummyContext: HorizontalContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: dummyParagraph12.id,
      indexInSiblingItemsShift: 1,
    };
    expect((): void => {
      convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the passed context is a HorizontalContext and the contextItem does not have a parentOrSuperItem`, (): void => {
    const dummyContext: HorizontalContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: dummyRoot.id,
    };
    expect((): void => {
      convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is invalid`, (): void => {
    const dummyContext: any = {
      contextType: 'INVALID_CONTEXT_TYPE',
      contextItemId: dummyParagraph12.id,
    };
    expect((): void => {
      convertContextToVerticalContext(dummyContext, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

});
