// @flow

import * as data from '../dummyData';

import split from '..';

describe(`split`, (): void => {

  it(`splits rootContentItem into childItems`, (): void => {
    const result = split(data.dummyRootContentItem1);

    expect(result).toEqual([data.dummyHeadingContentItem1, data.dummyParagraphContentItem1]);
  });

  it(`splits every top-level heading into a new slide`, (): void => {
    const result = split(data.dummyRootContentItem2);

    expect(result).toEqual([data.dummyHeadingContentItem2, data.dummyHeadingContentItem3]);
  });

  it(`splits top-level heading with two subheadings into two slides with duplicated top-level headings`, (): void => {
    const result = split(data.dummyRootContentItem3);

    expect(result).toEqual([
      {
        ...data.dummyHeadingContentItem4,
        subItemIds: [data.dummySubHeadingContentItem1.id],
        subItems: [data.dummySubHeadingContentItem1],
      },
      {
        ...data.dummyHeadingContentItem4,
        subItemIds: [data.dummySubHeadingContentItem2.id],
        subItems: [data.dummySubHeadingContentItem2],
      },
    ]);
  });

  it(`splits top-level heading with paragraph and two subheadings into three slides with duplicated top-level headings`, (): void => {
    const result = split(data.dummyRootContentItem4);

    expect(result).toEqual([
      {
        ...data.dummyHeadingContentItem5,
        subItemIds: [data.dummyParagraphContentItem1.id],
        subItems: [data.dummyParagraphContentItem1],
      },
      {
        ...data.dummyHeadingContentItem5,
        subItemIds: [data.dummySubHeadingContentItem1.id],
        subItems: [data.dummySubHeadingContentItem1],
      },
      {
        ...data.dummyHeadingContentItem5,
        subItemIds: [data.dummySubHeadingContentItem2.id],
        subItems: [data.dummySubHeadingContentItem2],
      },
    ]);
  });
});
