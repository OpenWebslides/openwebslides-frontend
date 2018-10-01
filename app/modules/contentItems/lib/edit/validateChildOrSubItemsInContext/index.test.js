// @flow

import { CorruptedInternalStateError, InvalidArgumentError, ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import lib from '../..';
import * as m from '../../../model';

describe(`validateChildOrSubItemsInContext`, (): void => {

  let dummyParagraph4: m.ParagraphContentItem;
  let dummyParagraph3: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph2: m.ParagraphContentItem;
  let dummyParagraph1: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;

  beforeEach((): void => {
    dummyParagraph4 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph3 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem2 };
    dummyParagraph2 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph1 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = { ...dummyData.headingContentItem };
    dummyRoot = { ...dummyData.rootContentItem };
  });

  it(`doesn't throw any error, when the contextType is SUPER and the subItems don't contain any irregularities`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
      [dummyParagraph1.id]: { ...dummyParagraph1 },
      [dummyParagraph2.id]: { ...dummyParagraph2 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph3.id, dummyParagraph4.id] },
      [dummyParagraph3.id]: { ...dummyParagraph3 },
      [dummyParagraph4.id]: { ...dummyParagraph4 },
    };

    expect((): void => {
      lib.edit.validateChildOrSubItemsInContext(dummyContext, dummyContentItemsById);
    }).not.toThrow();
  });

  it(`doesn't throw any error, when the contextType is PARENT and the childItems don't contain any irregularities`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: dummyRoot.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
      [dummyParagraph1.id]: { ...dummyParagraph1 },
      [dummyParagraph2.id]: { ...dummyParagraph2 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph3.id, dummyParagraph4.id] },
      [dummyParagraph3.id]: { ...dummyParagraph3 },
      [dummyParagraph4.id]: { ...dummyParagraph4 },
    };

    expect((): void => {
      lib.edit.validateChildOrSubItemsInContext(dummyContext, dummyContentItemsById);
    }).not.toThrow();
  });

  it(`throws an CorruptedInternalStateError, when the contextType is SUPER and the list of subItems contains a HEADING followed by a non-HEADING`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyHeading2.id, dummyParagraph2.id] },
      [dummyParagraph1.id]: { ...dummyParagraph1 },
      [dummyParagraph2.id]: { ...dummyParagraph2 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph3.id, dummyParagraph4.id] },
      [dummyParagraph3.id]: { ...dummyParagraph3 },
      [dummyParagraph4.id]: { ...dummyParagraph4 },
    };

    expect((): void => {
      lib.edit.validateChildOrSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws an CorruptedInternalStateError, when the contextType is PARENT and the list of childItems contains a HEADING followed by a non-HEADING`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: dummyRoot.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id, dummyParagraph4.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
      [dummyParagraph1.id]: { ...dummyParagraph1 },
      [dummyParagraph2.id]: { ...dummyParagraph2 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph3.id] },
      [dummyParagraph3.id]: { ...dummyParagraph3 },
      [dummyParagraph4.id]: { ...dummyParagraph4 },
    };

    expect((): void => {
      lib.edit.validateChildOrSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById object contains inconsistencies`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
      // [dummyParagraph1.id]: { ...dummyParagraph1 },
      [dummyParagraph2.id]: { ...dummyParagraph2 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph3.id, dummyParagraph4.id] },
      [dummyParagraph3.id]: { ...dummyParagraph3 },
      [dummyParagraph4.id]: { ...dummyParagraph4 },
    };

    expect((): void => {
      lib.edit.validateChildOrSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed contextItemId could not be found`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: 'DefinitelyNotValidId',
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
      [dummyParagraph1.id]: { ...dummyParagraph1 },
      [dummyParagraph2.id]: { ...dummyParagraph2 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph3.id, dummyParagraph4.id] },
      [dummyParagraph3.id]: { ...dummyParagraph3 },
      [dummyParagraph4.id]: { ...dummyParagraph4 },
    };

    expect((): void => {
      lib.edit.validateChildOrSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the contextType is SUPER and the passed contentItem is not a subableContentItem`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyRoot.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
      [dummyParagraph1.id]: { ...dummyParagraph1 },
      [dummyParagraph2.id]: { ...dummyParagraph2 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph3.id, dummyParagraph4.id] },
      [dummyParagraph3.id]: { ...dummyParagraph3 },
      [dummyParagraph4.id]: { ...dummyParagraph4 },
    };

    expect((): void => {
      lib.edit.validateChildOrSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is PARENT and the passed contentItem is not a containerContentItem`, (): void => {
    const dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: dummyHeading1.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
      [dummyParagraph1.id]: { ...dummyParagraph1 },
      [dummyParagraph2.id]: { ...dummyParagraph2 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph3.id, dummyParagraph4.id] },
      [dummyParagraph3.id]: { ...dummyParagraph3 },
      [dummyParagraph4.id]: { ...dummyParagraph4 },
    };

    expect((): void => {
      lib.edit.validateChildOrSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is invalid`, (): void => {
    const dummyContext: any = {
      contextType: 'INVALID_CONTEXT_TYPE',
      contextItemId: dummyRoot.id,
    };
    const dummyContentItemsById = {
      [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
      [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
      [dummyParagraph1.id]: { ...dummyParagraph1 },
      [dummyParagraph2.id]: { ...dummyParagraph2 },
      [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph3.id, dummyParagraph4.id] },
      [dummyParagraph3.id]: { ...dummyParagraph3 },
      [dummyParagraph4.id]: { ...dummyParagraph4 },
    };

    expect((): void => {
      lib.edit.validateChildOrSubItemsInContext(dummyContext, dummyContentItemsById);
    }).toThrow(InvalidArgumentError);
  });

});
