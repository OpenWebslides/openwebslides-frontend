// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as model from '../../../model';
import * as dummyData from '../../../lib/testResources/dummyContentItemData';

import edit from '..';

const {
  contextTypes,
  SubableContentItem,
  ContainerContentItem,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} = model;

describe(`removeChildOrSubItemIdFromContext`, (): void => {

  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: ContentItemsById;

  beforeEach((): void => {
    dummyHeading2 = { ...dummyData.headingContentItem4 };
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
    };
  });

  it(`returns a copy of the contextItem with the passed childOrSubItemId removed from it, when the contextType is SUPER`, (): void => {
    const dummyContext = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    const actualResult = edit.removeChildOrSubItemIdFromContext(dummyContext, dummyParagraph11.id, dummyContentItemsById);
    const expectedResult = { ...dummyHeading1, subItemIds: [dummyParagraph12.id] };

    expect(actualResult).toEqual(expectedResult);
    expect(actualResult).not.toBe(dummyHeading1);
    expect(((actualResult: any): SubableContentItem).subItemIds).not.toBe(((dummyHeading1: any): SubableContentItem).subItemIds);
  });

  it(`returns a copy of the passed contentItem with the passed childOrSubItem removed from it, when the contextType is PARENT`, (): void => {
    const dummyContext = {
      contextType: contextTypes.PARENT,
      contextItemId: dummyRoot.id,
    };
    const actualResult = edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    const expectedResult = { ...dummyRoot, childItemIds: [dummyHeading1.id] };

    expect(actualResult).toEqual(expectedResult);
    expect(actualResult).not.toBe(dummyHeading1);
    expect(((actualResult: any): ContainerContentItem).childItemIds).not.toBe(((dummyHeading1: any): ContainerContentItem).childItemIds);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed contextItemId could not be found`, (): void => {
    const dummyContext = {
      contextType: contextTypes.PARENT,
      contextItemId: 'DefinitelyNotValidId',
    };
    expect((): void => {
      edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the contextType is SUPER and the passed contentItem is not a subableContentItem`, (): void => {
    const dummyContext = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyRoot.id,
    };
    expect((): void => {
      edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is PARENT and the passed contentItem is not a containerContentItem`, (): void => {
    const dummyContext = {
      contextType: contextTypes.PARENT,
      contextItemId: dummyHeading1.id,
    };
    expect((): void => {
      edit.removeChildOrSubItemIdFromContext(dummyContext, dummyParagraph11.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is SUPER and the passed contentItem does not contain the passed childOrSubItem as a subItem`, (): void => {
    dummyHeading1.subItemIds = [dummyParagraph12.id];

    const dummyContext = {
      contextType: contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    expect((): void => {
      edit.removeChildOrSubItemIdFromContext(dummyContext, dummyParagraph11.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is PARENT and the passed contentItem does not contain the passed childOrSubItem as a childItem`, (): void => {
    dummyRoot.childItemIds = [dummyHeading1.id];

    const dummyContext = {
      contextType: contextTypes.PARENT,
      contextItemId: dummyRoot.id,
    };
    expect((): void => {
      edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is invalid`, (): void => {
    const dummyContext: any = {
      contextType: 'INVALID_CONTEXT_TYPE',
      contextItemId: dummyRoot.id,
    };
    expect((): void => {
      edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

});
