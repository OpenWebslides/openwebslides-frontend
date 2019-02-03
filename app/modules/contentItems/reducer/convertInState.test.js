// @flow

import { InvalidArgumentError, NotYetImplementedError, ObjectNotFoundError, UnsupportedOperationError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`CONVERT_IN_STATE`, (): void => {

  let dummyBlockquote333: m.BlockquoteContentItem;
  let dummyParagraph332: m.ParagraphContentItem;
  let dummyParagraph331: m.ParagraphContentItem;
  let dummyHeading33: m.HeadingContentItem;
  let dummyParagraph32: m.ParagraphContentItem;
  let dummyParagraph31: m.ParagraphContentItem;
  let dummyHeading3: m.HeadingContentItem;
  let dummyParagraph2: m.ParagraphContentItem;
  let dummyParagraph1: m.ParagraphContentItem;
  let dummyRoot: m.RootContentItem;

  beforeEach((): void => {
    dummyBlockquote333 = { ...dummyData.blockquoteContentItem };
    dummyParagraph332 = { ...dummyData.paragraphContentItem6 };
    dummyParagraph331 = { ...dummyData.paragraphContentItem5 };
    dummyHeading33 = { ...dummyData.headingContentItem2 };
    dummyParagraph32 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph31 = { ...dummyData.paragraphContentItem3 };
    dummyHeading3 = { ...dummyData.headingContentItem };
    dummyParagraph2 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph1 = { ...dummyData.paragraphContentItem };
    dummyRoot = { ...dummyData.rootContentItem };
  });

  it(`converts a PARAGRAPH into a HEADING, when the contentItem for the passed id is a PARAGRAPH and newType is HEADING`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const convertInStateAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: dummyParagraph2.id,
        newType: m.contentItemTypes.HEADING,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2, type: m.contentItemTypes.HEADING },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const resultState: m.ContentItemsState = reducer(prevState, convertInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyRoot.id]).not.toBe(prevState.byId[dummyParagraph2.id]);
  });

  it(`converts a HEADING into a PARAGRAPH, when the contentItem for the passed id is a HEADING and newType is PARAGRAPH`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const convertInStateAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: dummyHeading33.id,
        newType: m.contentItemTypes.PARAGRAPH,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id], type: m.contentItemTypes.PARAGRAPH },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const resultState: m.ContentItemsState = reducer(prevState, convertInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyRoot.id]).not.toBe(prevState.byId[dummyHeading33.id]);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id could not be found`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const convertInStateAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: 'invalidId',
        newType: m.contentItemTypes.HEADING,
      },
    };

    expect((): void => {
      reducer(prevState, convertInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an UnsupportedOperationError, when the contentItem for the passed id is not a PlainText contentItem`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const convertInStateAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: dummyRoot.id,
        newType: m.contentItemTypes.HEADING,
      },
    };

    expect((): void => {
      reducer(prevState, convertInStateAction);
    }).toThrow(UnsupportedOperationError);
  });

  it(`throws an InvalidArgumentError, when the contentItem for the passed id already has newType as its type`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const convertInStateAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: dummyParagraph2.id,
        newType: m.contentItemTypes.PARAGRAPH,
      },
    };

    expect((): void => {
      reducer(prevState, convertInStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an UnsupportedOperationError, when the newType is not a PlainText type`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const convertInStateAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: dummyParagraph2.id,
        newType: m.contentItemTypes.IMAGE,
      },
    };

    expect((): void => {
      reducer(prevState, convertInStateAction);
    }).toThrow(UnsupportedOperationError);
  });

  it(`throws an UnsupportedOperationError, when attempting to convert a HEADING that has other HEADINGS in its descendants to a PARAGRAPH`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const convertInStateAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: dummyHeading3.id,
        newType: m.contentItemTypes.PARAGRAPH,
      },
    };

    expect((): void => {
      reducer(prevState, convertInStateAction);
    }).toThrow(UnsupportedOperationError);
  });

  it(`temporarily throws a NotYetImplementedError, when the contentItem for the passed id has a PlainText type different from HEADING or PARAGRAPH`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const convertInStateAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: dummyBlockquote333.id,
        newType: m.contentItemTypes.PARAGRAPH,
      },
    };

    expect((): void => {
      reducer(prevState, convertInStateAction);
    }).toThrow(NotYetImplementedError);
  });

  it(`temporarily throws a NotYetImplementedError, when the newType is a PlainText type different from HEADING or PARAGRAPH`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyHeading3.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading3.id]: { ...dummyHeading3, subItemIds: [dummyParagraph31.id, dummyParagraph32.id, dummyHeading33.id] },
        [dummyParagraph31.id]: { ...dummyParagraph31 },
        [dummyParagraph32.id]: { ...dummyParagraph32 },
        [dummyHeading33.id]: { ...dummyHeading33, subItemIds: [dummyParagraph331.id, dummyParagraph332.id, dummyBlockquote333.id] },
        [dummyParagraph331.id]: { ...dummyParagraph331 },
        [dummyParagraph332.id]: { ...dummyParagraph332 },
        [dummyBlockquote333.id]: { ...dummyBlockquote333 },
      },
    };
    const convertInStateAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: dummyParagraph2.id,
        newType: m.contentItemTypes.BLOCKQUOTE,
      },
    };

    expect((): void => {
      reducer(prevState, convertInStateAction);
    }).toThrow(NotYetImplementedError);
  });

});
