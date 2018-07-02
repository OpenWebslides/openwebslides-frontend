// @flow

import type {
  DenormalizedHeadingContentItem,
  DenormalizedParagraphContentItem,
  DenormalizedRootContentItem,
} from 'modules/contentItems';

import { contentItemTypes } from 'modules/contentItems/model';

// Paragraphs
export const dummyParagraphContentItem1: DenormalizedParagraphContentItem = {
  id: 'guweco5ijd',
  type: contentItemTypes.PARAGRAPH,
  isEditing: false,
  text: 'Paragraph',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: ['3yfivbpo4v'],
  subItems: [{
    id: '3yfivbpo4v',
    type: contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Paragraph 2',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
    subItems: [],
  }],
};

// Subheadings
export const dummySubHeadingContentItem1: DenormalizedHeadingContentItem = {
  id: 'odo8vj3ivu',
  type: contentItemTypes.HEADING,
  isEditing: false,
  text: 'Subheading 1',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  subItems: [],
};

export const dummySubHeadingContentItem2: DenormalizedHeadingContentItem = {
  id: 'qocj4o9vco',
  type: contentItemTypes.HEADING,
  isEditing: false,
  text: 'Subheading 2',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  subItems: [],
};

// Headings
export const dummyHeadingContentItem1: DenormalizedHeadingContentItem = {
  id: 'ko3ucudn9l',
  type: contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 1',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  subItems: [],
};

export const dummyHeadingContentItem2: DenormalizedHeadingContentItem = {
  id: 'iidk2kfcp2',
  type: contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 2',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  subItems: [],
};

export const dummyHeadingContentItem3: DenormalizedHeadingContentItem = {
  id: 'vckiiek3ld',
  type: contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 3',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [],
  subItems: [],
};

export const dummyHeadingContentItem4: DenormalizedHeadingContentItem = {
  id: 'kdivjd3eju',
  type: contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 4',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [dummySubHeadingContentItem1.id, dummySubHeadingContentItem2.id],
  subItems: [dummySubHeadingContentItem1, dummySubHeadingContentItem2],
};

export const dummyHeadingContentItem5: DenormalizedHeadingContentItem = {
  id: 'dkhjedy2lc',
  type: contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 5',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItemIds: [
    dummyParagraphContentItem1,
    dummySubHeadingContentItem1.id,
    dummySubHeadingContentItem2.id,
  ],
  subItems: [
    dummyParagraphContentItem1,
    dummySubHeadingContentItem1,
    dummySubHeadingContentItem2,
  ],
};

// Root content items
export const dummyRootContentItem1: DenormalizedRootContentItem = {
  id: 'ldoivik3dh',
  type: contentItemTypes.ROOT,
  isEditing: false,
  childItemIds: [dummyHeadingContentItem1.id, dummyParagraphContentItem1.id],
  childItems: [
    dummyHeadingContentItem1,
    dummyParagraphContentItem1,
  ],
};

export const dummyRootContentItem2: DenormalizedRootContentItem = {
  id: 'ivjdoieo3k',
  type: contentItemTypes.ROOT,
  isEditing: false,
  childItemIds: [dummyHeadingContentItem2.id, dummyHeadingContentItem3.id],
  childItems: [
    dummyHeadingContentItem2,
    dummyHeadingContentItem3,
  ],
};

export const dummyRootContentItem3: DenormalizedRootContentItem = {
  id: 'ivjdoieo3k',
  type: contentItemTypes.ROOT,
  isEditing: false,
  childItemIds: [dummyHeadingContentItem4.id],
  childItems: [
    dummyHeadingContentItem4,
  ],
};

export const dummyRootContentItem4: DenormalizedRootContentItem = {
  id: 'ocodk2fdoi',
  type: contentItemTypes.ROOT,
  isEditing: false,
  childItemIds: [dummyHeadingContentItem5.id],
  childItems: [
    dummyHeadingContentItem5,
  ],
};
