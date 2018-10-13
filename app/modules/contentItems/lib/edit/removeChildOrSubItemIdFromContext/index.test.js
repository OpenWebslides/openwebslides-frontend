// @flow

import { InvalidArgumentError, ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import lib from '../..';
import * as m from '../../../model';

describe(`removeChildOrSubItemIdFromContext`, (): void => {

  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;

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
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    const actualResult = lib.edit.removeChildOrSubItemIdFromContext(dummyContext, dummyParagraph11.id, dummyContentItemsById);
    const expectedResult = { ...dummyHeading1, subItemIds: [dummyParagraph12.id] };

    expect(actualResult).toStrictEqual(expectedResult);
    expect(actualResult).not.toBe(dummyHeading1);
    expect(((actualResult: any): m.SubableContentItem).subItemIds).not.toBe(((dummyHeading1: any): m.SubableContentItem).subItemIds);
  });

  it(`returns a copy of the passed contentItem with the passed childOrSubItem removed from it, when the contextType is PARENT`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: dummyRoot.id,
    };
    const actualResult = lib.edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    const expectedResult = { ...dummyRoot, childItemIds: [dummyHeading1.id] };

    expect(actualResult).toStrictEqual(expectedResult);
    expect(actualResult).not.toBe(dummyHeading1);
    expect(((actualResult: any): m.ContainerContentItem).childItemIds).not.toBe(((dummyHeading1: any): m.ContainerContentItem).childItemIds);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed contextItemId could not be found`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: 'DefinitelyNotValidId',
    };
    expect((): void => {
      lib.edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the contextType is SUPER and the passed contentItem is not a subableContentItem`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyRoot.id,
    };
    expect((): void => {
      lib.edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is PARENT and the passed contentItem is not a containerContentItem`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: dummyHeading1.id,
    };
    expect((): void => {
      lib.edit.removeChildOrSubItemIdFromContext(dummyContext, dummyParagraph11.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is SUPER and the passed contentItem does not contain the passed childOrSubItem as a subItem`, (): void => {
    dummyHeading1.subItemIds = [dummyParagraph12.id];

    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    expect((): void => {
      lib.edit.removeChildOrSubItemIdFromContext(dummyContext, dummyParagraph11.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is PARENT and the passed contentItem does not contain the passed childOrSubItem as a childItem`, (): void => {
    dummyRoot.childItemIds = [dummyHeading1.id];

    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: dummyRoot.id,
    };
    expect((): void => {
      lib.edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is invalid`, (): void => {
    const dummyContext: any = {
      contextType: 'INVALID_CONTEXT_TYPE',
      contextItemId: dummyRoot.id,
    };
    expect((): void => {
      lib.edit.removeChildOrSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

});
