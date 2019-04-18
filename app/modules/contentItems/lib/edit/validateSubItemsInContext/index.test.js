// @flow

import { CorruptedInternalStateError, InvalidArgumentError, ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import lib from '../..';
import * as m from '../../../model';

describe(`validateSubItemsInContext`, (): void => {

  let dummySlideBreak23: m.SlideBreakContentItem;
  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;

  beforeEach((): void => {
    dummySlideBreak23 = { ...dummyData.slideBreakContentItem };
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem2 };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = { ...dummyData.headingContentItem };
    dummyRoot = { ...dummyData.rootContentItem };
  });

  it(`doesn't throw any error, when the subItems don't contain any irregularities`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, subItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
      [dummyParagraph11.id]: { ...dummyParagraph11 },
      [dummyParagraph12.id]: { ...dummyParagraph12 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummySlideBreak23.id] },
      [dummyParagraph21.id]: { ...dummyParagraph21 },
      [dummyParagraph22.id]: { ...dummyParagraph22 },
      [dummySlideBreak23.id]: { ...dummySlideBreak23 },
    };

    expect((): void => {
      lib.edit.validateSubItemsInContext(dummyContext, dummyContentItemsById);
    }).not.toThrow();
  });

  it(`throws an CorruptedInternalStateError, when the list of subItems contains a HEADING followed by a non-HEADING`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, subItemIds: [dummyHeading1.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyHeading2.id, dummyParagraph12.id] },
      [dummyParagraph11.id]: { ...dummyParagraph11 },
      [dummyParagraph12.id]: { ...dummyParagraph12 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummySlideBreak23.id] },
      [dummyParagraph21.id]: { ...dummyParagraph21 },
      [dummyParagraph22.id]: { ...dummyParagraph22 },
      [dummySlideBreak23.id]: { ...dummySlideBreak23 },
    };

    expect((): void => {
      lib.edit.validateSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById object contains inconsistencies`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, subItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
      // [dummyParagraph11.id]: { ...dummyParagraph11 },
      [dummyParagraph12.id]: { ...dummyParagraph12 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummySlideBreak23.id] },
      [dummyParagraph21.id]: { ...dummyParagraph21 },
      [dummyParagraph22.id]: { ...dummyParagraph22 },
      [dummySlideBreak23.id]: { ...dummySlideBreak23 },
    };

    expect((): void => {
      lib.edit.validateSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed contextItemId could not be found`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: 'DefinitelyNotValidId',
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, subItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
      [dummyParagraph11.id]: { ...dummyParagraph11 },
      [dummyParagraph12.id]: { ...dummyParagraph12 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummySlideBreak23.id] },
      [dummyParagraph21.id]: { ...dummyParagraph21 },
      [dummyParagraph22.id]: { ...dummyParagraph22 },
      [dummySlideBreak23.id]: { ...dummySlideBreak23 },
    };

    expect((): void => {
      lib.edit.validateSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the passed contentItem is not a subableContentItem`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummySlideBreak23.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, subItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
      [dummyParagraph11.id]: { ...dummyParagraph11 },
      [dummyParagraph12.id]: { ...dummyParagraph12 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummySlideBreak23.id] },
      [dummyParagraph21.id]: { ...dummyParagraph21 },
      [dummyParagraph22.id]: { ...dummyParagraph22 },
      [dummySlideBreak23.id]: { ...dummySlideBreak23 },
    };

    expect((): void => {
      lib.edit.validateSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

});
