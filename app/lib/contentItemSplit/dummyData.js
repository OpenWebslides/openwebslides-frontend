// @flow

import contentItems from 'modules/contentItems';

// Paragraphs
export const dummyParagraphContentItem1: contentItems.model.DenormalizedParagraphContentItem = {
  id: 'guweco5ijd',
  type: contentItems.model.contentItemTypes.PARAGRAPH,
  isEditing: false,
  text: 'Paragraph',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItems: [{
    id: '3yfivbpo4v',
    type: contentItems.model.contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Paragraph 2',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [],
  }],
};

// Subheadings
export const dummySubHeadingContentItem1: contentItems.model.DenormalizedHeadingContentItem = {
  id: 'odo8vj3ivu',
  type: contentItems.model.contentItemTypes.HEADING,
  isEditing: false,
  text: 'Subheading 1',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItems: [],
};

export const dummySubHeadingContentItem2: contentItems.model.DenormalizedHeadingContentItem = {
  id: 'qocj4o9vco',
  type: contentItems.model.contentItemTypes.HEADING,
  isEditing: false,
  text: 'Subheading 2',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItems: [],
};

// Headings
export const dummyHeadingContentItem1: contentItems.model.DenormalizedHeadingContentItem = {
  id: 'ko3ucudn9l',
  type: contentItems.model.contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 1',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItems: [],
};

export const dummyHeadingContentItem2: contentItems.model.DenormalizedHeadingContentItem = {
  id: 'iidk2kfcp2',
  type: contentItems.model.contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 2',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItems: [],
};

export const dummyHeadingContentItem3: contentItems.model.DenormalizedHeadingContentItem = {
  id: 'vckiiek3ld',
  type: contentItems.model.contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 3',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItems: [],
};

export const dummyHeadingContentItem4: contentItems.model.DenormalizedHeadingContentItem = {
  id: 'kdivjd3eju',
  type: contentItems.model.contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 4',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItems: [dummySubHeadingContentItem1, dummySubHeadingContentItem2],
};

export const dummyHeadingContentItem5: contentItems.model.DenormalizedHeadingContentItem = {
  id: 'dkhjedy2lc',
  type: contentItems.model.contentItemTypes.HEADING,
  isEditing: false,
  text: 'Heading 5',
  metadata: {
    tags: [],
    visibilityOverrides: {},
  },
  subItems: [
    dummyParagraphContentItem1,
    dummySubHeadingContentItem1,
    dummySubHeadingContentItem2,
  ],
};

// Root content items
export const dummyRootContentItem1: contentItems.model.DenormalizedRootContentItem = {
  id: 'ldoivik3dh',
  type: contentItems.model.contentItemTypes.ROOT,
  isEditing: false,
  subItems: [
    dummyHeadingContentItem1,
    dummyParagraphContentItem1,
  ],
};

export const dummyRootContentItem2: contentItems.model.DenormalizedRootContentItem = {
  id: 'ivjdoieo3k',
  type: contentItems.model.contentItemTypes.ROOT,
  isEditing: false,
  subItems: [
    dummyHeadingContentItem2,
    dummyHeadingContentItem3,
  ],
};

export const dummyRootContentItem3: contentItems.model.DenormalizedRootContentItem = {
  id: 'ivjdoieo3k',
  type: contentItems.model.contentItemTypes.ROOT,
  isEditing: false,
  subItems: [
    dummyHeadingContentItem4,
  ],
};

export const dummyRootContentItem4: contentItems.model.DenormalizedRootContentItem = {
  id: 'ocodk2fdoi',
  type: contentItems.model.contentItemTypes.ROOT,
  isEditing: false,
  subItems: [
    dummyHeadingContentItem5,
  ],
};
