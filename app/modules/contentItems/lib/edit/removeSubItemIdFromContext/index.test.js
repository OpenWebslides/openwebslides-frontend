// @flow

import { InvalidArgumentError, ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import lib from '../..';
import * as m from '../../../model';

describe(`removeSubItemIdFromContext`, (): void => {

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
      subItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
      [dummyHeading2.id]: dummyHeading2,
    };
  });

  it(`returns a copy of the contextItem with the passed subItemId removed from it`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    const actualResult = lib.edit.removeSubItemIdFromContext(dummyContext, dummyParagraph11.id, dummyContentItemsById);
    const expectedResult = { ...dummyHeading1, subItemIds: [dummyParagraph12.id] };

    expect(actualResult).toStrictEqual(expectedResult);
    expect(actualResult).not.toBe(dummyHeading1);
    expect(((actualResult: any): m.SubableContentItem).subItemIds).not.toBe(((dummyHeading1: any): m.SubableContentItem).subItemIds);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed contextItemId could not be found`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: 'DefinitelyNotValidId',
    };
    expect((): void => {
      lib.edit.removeSubItemIdFromContext(dummyContext, dummyHeading2.id, dummyContentItemsById);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the passed contentItem does not contain the passed subItemId`, (): void => {
    dummyHeading1.subItemIds = [dummyParagraph12.id];

    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    expect((): void => {
      lib.edit.removeSubItemIdFromContext(dummyContext, dummyParagraph11.id, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

});
