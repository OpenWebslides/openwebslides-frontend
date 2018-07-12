// @flow

import * as m from '../../../model';
import * as dummyData from '../../testResources/dummyContentItemData';

import find from '..';

describe(`findAllAncestorItems`, (): void => {

  let dummyParagraph22: $Exact<m.ParagraphContentItem>;
  let dummyParagraph21: $Exact<m.ParagraphContentItem>;
  let dummyHeading2: $Exact<m.HeadingContentItem>;
  let dummyParagraph122: $Exact<m.ParagraphContentItem>;
  let dummyParagraph121: $Exact<m.ParagraphContentItem>;
  let dummyHeading12: $Exact<m.HeadingContentItem>;
  let dummyParagraph1122: $Exact<m.ParagraphContentItem>;
  let dummyParagraph1121: $Exact<m.ParagraphContentItem>;
  let dummyParagraph112: $Exact<m.ParagraphContentItem>;
  let dummyParagraph111: $Exact<m.ParagraphContentItem>;
  let dummyHeading11: $Exact<m.HeadingContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: m.ContentItemsById;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem8 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem7 };
    dummyHeading2 = {
      ...dummyData.headingContentItem4,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id],
    };
    dummyParagraph122 = { ...dummyData.paragraphContentItem6 };
    dummyParagraph121 = { ...dummyData.paragraphContentItem5 };
    dummyHeading12 = {
      ...dummyData.headingContentItem3,
      subItemIds: [dummyParagraph121.id, dummyParagraph122.id],
    };
    dummyParagraph1122 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph1121 = { ...dummyData.paragraphContentItem3 };
    dummyParagraph112 = {
      ...dummyData.paragraphContentItem2,
      subItemIds: [dummyParagraph1121.id, dummyParagraph1122.id],
    };
    dummyParagraph111 = { ...dummyData.paragraphContentItem };
    dummyHeading11 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph111.id, dummyParagraph112.id],
    };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyHeading11.id, dummyHeading12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyHeading11.id]: dummyHeading11,
      [dummyParagraph111.id]: dummyParagraph111,
      [dummyParagraph112.id]: dummyParagraph112,
      [dummyParagraph1121.id]: dummyParagraph1121,
      [dummyParagraph1122.id]: dummyParagraph1122,
      [dummyHeading12.id]: dummyHeading12,
      [dummyParagraph121.id]: dummyParagraph121,
      [dummyParagraph122.id]: dummyParagraph122,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
    };
  });

  it(`returns an array containing all of the passed contentItem's ancestorItems, when the passed contentItem is a subItem`, (): void => {
    const actualResult = find.allAncestorItems(dummyParagraph1122, dummyContentItemsById);
    expect(actualResult).toHaveLength(4);
    expect(actualResult[0]).toBe(dummyParagraph112);
    expect(actualResult[1]).toBe(dummyHeading11);
    expect(actualResult[2]).toBe(dummyHeading1);
    expect(actualResult[3]).toBe(dummyRoot);
  });

  it(`returns an array containing all of the passed contentItem's ancestorItems, when the passed contentItem is a childItem`, (): void => {
    const actualResult = find.allAncestorItems(dummyHeading1, dummyContentItemsById);
    expect(actualResult).toHaveLength(1);
    expect(actualResult[0]).toBe(dummyRoot);
  });

  it(`returns an empty array, when the passed contentItem is neither a child- nor a subItem (i.e. is a ROOT)`, (): void => {
    const actualResult = find.allAncestorItems(dummyRoot, dummyContentItemsById);
    expect(actualResult).toHaveLength(0);
  });

  it(`returns an empty array, when the passed contentItem is NULL`, (): void => {
    const actualResult = find.allAncestorItems(null, dummyContentItemsById);
    expect(actualResult).toHaveLength(0);
  });

});
