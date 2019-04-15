// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`canIndent`, (): void => {

  let dummyParagraph24: m.ParagraphContentItem;
  let dummySlideBreak23: m.SlideBreakContentItem;
  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: Object;

  beforeEach((): void => {
    dummyParagraph24 = { ...dummyData.paragraphContentItem5 };
    dummySlideBreak23 = { ...dummyData.slideBreakContentItem };
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummySlideBreak23.id, dummyParagraph24.id],
    };
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
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
      [dummySlideBreak23.id]: dummySlideBreak23,
      [dummyParagraph24.id]: dummyParagraph24,
    };
    dummyContentItemsState = { byId: dummyContentItemsById, currentlySelectedId: null };
    dummyState = { modules: { contentItems: dummyContentItemsState } };
  });

  it(`returns TRUE when the contentItem has a subable previousSiblingItem`, (): void => {
    expect(selectors.canIndent(dummyState, { id: dummyParagraph12.id })).toBe(true);
  });

  it(`returns FALSE when the contentItem's previousSiblingItem is not subable`, (): void => {
    expect(selectors.canIndent(dummyState, { id: dummyParagraph24.id })).toBe(false);
  });

  it(`returns FALSE when the contentItem for the passed id could not be found`, (): void => {
    expect(selectors.canIndent(dummyState, { id: 'invalidId' })).toBe(false);
  });

});
