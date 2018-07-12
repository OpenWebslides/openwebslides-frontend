// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { Identifier } from 'types/model';

import * as m from '../../../model';
import { dummyContentItemData as dummyData } from '../../testResources';

import edit from '..';

describe(`addChildOrSubItemIdToContext`, (): void => {

  let dummyId: Identifier;
  let dummyHeading2: $Exact<m.HeadingContentItem>;
  let dummyParagraph12: $Exact<m.ParagraphContentItem>;
  let dummyParagraph11: $Exact<m.ParagraphContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: m.ContentItemsById;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
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

  it(`returns a copy of the contextItem with the passed childOrSubItemId added to it at the correct index, when the contextType is SUPER`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
      indexInSiblingItems: 1,
    };
    const actualResult = edit.addChildOrSubItemIdToContext(dummyContext, dummyId, dummyContentItemsById);
    const expectedResult = { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyId, dummyParagraph12.id] };

    expect(actualResult).toEqual(expectedResult);
    expect(actualResult).not.toBe(dummyHeading1);
    expect(((actualResult: any): m.SubableContentItem).subItemIds).not.toBe(((dummyHeading1: any): m.SubableContentItem).subItemIds);
  });

  it(`returns a copy of the passed contentItem with the passed childOrSubItem added to it at the correct index, when the contextType is PARENT`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: dummyRoot.id,
      indexInSiblingItems: 2,
    };
    const actualResult = edit.addChildOrSubItemIdToContext(dummyContext, dummyId, dummyContentItemsById);
    const expectedResult = { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id, dummyId] };

    expect(actualResult).toEqual(expectedResult);
    expect(actualResult).not.toBe(dummyHeading1);
    expect(((actualResult: any): m.ContainerContentItem).childItemIds).not.toBe(((dummyHeading1: any): m.ContainerContentItem).childItemIds);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed contextItemId could not be found`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: 'DefinitelyNotValidId',
    };
    expect((): void => {
      edit.addChildOrSubItemIdToContext(dummyContext, dummyId, dummyContentItemsById);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the contextType is SUPER and the passed contentItem is not a subableContentItem`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyRoot.id,
    };
    expect((): void => {
      edit.addChildOrSubItemIdToContext(dummyContext, dummyId, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is PARENT and the passed contentItem is not a containerContentItem`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: dummyHeading1.id,
    };
    expect((): void => {
      edit.addChildOrSubItemIdToContext(dummyContext, dummyId, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is invalid`, (): void => {
    const dummyContext: any = {
      contextType: 'INVALID_CONTEXT_TYPE',
      contextItemId: dummyRoot.id,
    };
    expect((): void => {
      edit.addChildOrSubItemIdToContext(dummyContext, dummyId, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

});
