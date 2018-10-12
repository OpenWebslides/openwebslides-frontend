// @flow

import * as data from './dummyData';

import split, { recursiveSplit } from '.';

describe(`recursiveSplit`, (): void => {
  it(`splits rootContentItem into childItems`, (): void => {
    const result = recursiveSplit(data.dummyRootContentItem1);

    expect(result).toStrictEqual([data.dummyHeadingContentItem1, data.dummyParagraphContentItem1]);
  });

  it(`splits every top-level heading into a new slide`, (): void => {
    const result = recursiveSplit(data.dummyRootContentItem2);

    expect(result).toStrictEqual([data.dummyHeadingContentItem2, data.dummyHeadingContentItem3]);
  });

  it(`splits top-level heading with two subheadings into two slides with duplicated top-level headings`, (): void => {
    const result = recursiveSplit(data.dummyRootContentItem3);

    expect(result).toStrictEqual([
      {
        ...data.dummyHeadingContentItem4,
        subItems: [data.dummySubHeadingContentItem1],
      },
      {
        ...data.dummyHeadingContentItem4,
        subItems: [data.dummySubHeadingContentItem2],
      },
    ]);
  });

  it(`splits top-level heading with paragraph and two subheadings into three slides with duplicated top-level headings`, (): void => {
    const result = recursiveSplit(data.dummyRootContentItem4);

    expect(result).toStrictEqual([
      {
        ...data.dummyHeadingContentItem5,
        subItems: [data.dummyParagraphContentItem1],
      },
      {
        ...data.dummyHeadingContentItem5,
        subItems: [data.dummySubHeadingContentItem1],
      },
      {
        ...data.dummyHeadingContentItem5,
        subItems: [data.dummySubHeadingContentItem2],
      },
    ]);
  });
});

describe(`split`, (): void => {
  it(`splits rootContentItems into more rootContentItems`, (): void => {
    const result = split(data.dummyRootContentItem1);

    expect(result).toHaveLength(2);
    expect(result[0].childItems).toStrictEqual([data.dummyHeadingContentItem1]);
    expect(result[1].childItems).toStrictEqual([data.dummyParagraphContentItem1]);
  });
});
