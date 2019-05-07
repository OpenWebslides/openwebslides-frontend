// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`canUnindent`, (): void => {

  let dummyHeading221: m.HeadingContentItem;
  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph13: m.ParagraphContentItem;
  let dummyParagraph121: m.ParagraphContentItem;
  let dummyParagraph122: m.ParagraphContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: Object;

  beforeEach((): void => {
    dummyHeading221 = { ...dummyData.headingContentItem3 };
    dummyParagraph22 = {
      ...dummyData.paragraphContentItem7,
      subItemIds: [dummyHeading221.id],
    };
    dummyParagraph21 = { ...dummyData.paragraphContentItem6 };
    dummyHeading2 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id],
    };
    dummyParagraph13 = { ...dummyData.paragraphContentItem5 };
    dummyParagraph122 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph121 = { ...dummyData.paragraphContentItem3 };
    dummyParagraph12 = {
      ...dummyData.paragraphContentItem2,
      subItemIds: [dummyParagraph121.id, dummyParagraph122.id],
    };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id, dummyParagraph13.id],
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
      [dummyParagraph121.id]: dummyParagraph121,
      [dummyParagraph122.id]: dummyParagraph122,
      [dummyParagraph13.id]: dummyParagraph13,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
      [dummyHeading221.id]: dummyHeading221,
    };
    dummyContentItemsState = { byId: dummyContentItemsById, currentlySelectedId: null };
    dummyState = { modules: { contentItems: dummyContentItemsState } };
  });

  it(`returns TRUE when the contentItem has a valid parentOrSuperItem`, (): void => {
    expect(selectors.canUnindent(dummyState, { id: dummyParagraph122.id })).toBe(true);
  });

  it(`returns FALSE when the contentItem does not have a valid parentOrSuperItem`, (): void => {
    expect(selectors.canUnindent(dummyState, { id: dummyRoot.id })).toBe(false);
  });

  it(`returns FALSE when the contentItem for the passed id could not be found`, (): void => {
    expect(selectors.canUnindent(dummyState, { id: 'invalidId' })).toBe(false);
  });

});
