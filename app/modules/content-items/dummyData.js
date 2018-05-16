// @flow

import { contentItemTypes } from './model';
import type {
  ParagraphContentItem,
  ContentItemsById,
} from './model';

export const dummyContentItemsById: ContentItemsById = {
  w4lg2u0p1h: {
    id: 'w4lg2u0p1h',
    type: contentItemTypes.ROOT,
    childItemIds: ['qflasjgtxr'],
  },
  qflasjgtxr: {
    id: 'qflasjgtxr',
    type: contentItemTypes.HEADING,
    text: 'Lorem ipsum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['plqfm799be', 'a8ntqiiho1'],
  },
  plqfm799be: ({
    id: 'plqfm799be',
    type: contentItemTypes.PARAGRAPH,
    text: 'Lorem **ipsum** dolor `sit` amet, [consectetur](https://www.lipsum.com) adipiscing *elit*.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  a8ntqiiho1: ({
    id: 'a8ntqiiho1',
    type: contentItemTypes.PARAGRAPH,
    text: 'Mauris accumsan pretium sem, in volutpat nibh sodales a. Nulla blandit posuere ex, et facilisis dui volutpat in. Fusce tincidunt sed ipsum quis varius. Quisque vitae laoreet sem.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  qyrgv0bcd6: {
    id: 'qyrgv0bcd6',
    type: contentItemTypes.ROOT,
    childItemIds: ['ivks4jgtxr', 'j0vcu0y7vk', 'ua32xchh7q', 'kcosdhj38v', 'kchwki48cd', 'ck2k4kvcj4', 'ldicl3j4jk'],
  },
  j0vcu0y7vk: {
    id: 'j0vcu0y7vk',
    type: contentItemTypes.HEADING,
    text: 'Nam malesuada fermentum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['yp8bumunth', 'u9niafk733'],
  },
  yp8bumunth: ({
    id: 'yp8bumunth',
    type: contentItemTypes.PARAGRAPH,
    text: 'Nullam ultrices rhoncus quam vulputate bibendum. Aliquam vehicula augue quis nibh iaculis semper.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['uieqlbgnxb'],
  }: ParagraphContentItem),
  uieqlbgnxb: ({
    id: 'uieqlbgnxb',
    type: contentItemTypes.PARAGRAPH,
    text: 'Morbi sed felis quis mi luctus malesuada at eu neque. Integer auctor lorem leo, ut semper massa dignissim et. Nulla dictum ullamcorper mattis. Suspendisse suscipit porttitor gravida. Aliquam porttitor tortor augue, sit amet lacinia ligula sodales sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed vitae purus sed odio pulvinar sagittis egestas non est. Aliquam nisi urna, faucibus in tellus in, tristique suscipit justo. Etiam rutrum nisl sit amet venenatis euismod. Nullam dictum imperdiet libero, et ornare est semper eu. Aenean dui ligula, vulputate et nisi eu, bibendum tempus arcu. In ornare sem et nunc volutpat, eu elementum neque vestibulum. Nullam dictum ipsum in viverra blandit. Suspendisse potenti.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  u9niafk733: ({
    id: 'u9niafk733',
    type: contentItemTypes.PARAGRAPH,
    text: 'In sapien erat, venenatis iaculis volutpat in, pulvinar eu augue. Vestibulum porta euismod urna ac tempus. Praesent malesuada, ligula sed venenatis dictum, nulla ante finibus sem, nec suscipit felis lacus at urna. Vestibulum nec gravida sem. Pellentesque magna tortor, hendrerit ac nulla vitae, placerat gravida tortor.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['vrci6v35s7', 'cpi389s1e3'],
  }: ParagraphContentItem),
  vrci6v35s7: ({
    id: 'vrci6v35s7',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed hendrerit eget metus nec elementum. Aenean commodo semper sapien, nec porta leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit elit et metus tincidunt semper. Sed ac tellus odio. Sed placerat faucibus leo a convallis. Pellentesque eget libero at lacus rutrum pretium.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  cpi389s1e3: ({
    id: 'cpi389s1e3',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed ut neque tristique, venenatis purus a, consequat orci. Aenean sed lectus et ante aliquet maximus. Integer hendrerit odio volutpat tincidunt consectetur. Cras venenatis, nibh a dignissim consectetur, augue tortor viverra nisi, quis euismod urna ligula ac turpis. Pellentesque eget faucibus urna, id sodales odio. Quisque ipsum ante, fringilla elementum mauris vel, tincidunt rhoncus augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  ua32xchh7q: {
    id: 'ua32xchh7q',
    type: contentItemTypes.HEADING,
    text: 'Phasellus posuere tincidunt enim',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['rnnvciso5i', 'bz807z2zha'],
  },
  rnnvciso5i: ({
    id: 'rnnvciso5i',
    type: contentItemTypes.PARAGRAPH,
    text: 'Etiam euismod sed erat vel tincidunt. Ut at dui non orci tincidunt ultricies. Sed aliquam ligula ultrices pretium laoreet.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  bz807z2zha: ({
    id: 'bz807z2zha',
    type: contentItemTypes.PARAGRAPH,
    text: 'Nullam pharetra malesuada nibh, nec gravida turpis pharetra nec. Donec nec semper dolor.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  ivks4jgtxr: {
    id: 'ivks4jgtxr',
    type: contentItemTypes.HEADING,
    text: 'This is a heading',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['oswmjc09be', 'jbv2ju5jc6'],
  },
  oswmjc09be: ({
    id: 'oswmjc09be',
    type: contentItemTypes.PARAGRAPH,
    text: 'Lorem **ipsum** dolor `sit` amet, [consectetur](https://www.lipsum.com) adipiscing *elit*.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  jbv2ju5jc6: ({
    id: 'jbv2ju5jc6',
    type: contentItemTypes.PARAGRAPH,
    text: 'Mauris accumsan pretium sem, in volutpat nibh sodales a. Nulla blandit posuere ex, et facilisis dui volutpat in. Fusce tincidunt sed ipsum quis varius. Quisque vitae laoreet sem.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  kcosdhj38v: {
    id: 'kcosdhj38v',
    type: contentItemTypes.HEADING,
    text: 'Open Webslides slide rendering',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['vl4jfkdj4l', 'kdo4lbvn5l', 'lhjdki4hvi', 'dk3j5cl34k'],
  },
  kdo4lbvn5l: {
    id: 'kdo4lbvn5l',
    type: contentItemTypes.HEADING,
    text: 'Subheading 1',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['kdl3l4jkvd'],
  },
  kdl3l4jkvd: ({
    id: 'kdl3l4jkvd',
    type: contentItemTypes.PARAGRAPH,
    text: 'Lorem **ipsum** dolor `sit` amet, [consectetur](https://www.lipsum.com) adipiscing *elit*. Mauris *accumsan* pretium sem, in volutpat nibh sodales a. **Nulla blandit** posuere ex, et [facilisis](https://www.lipsum.com) dui volutpat in.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  vl4jfkdj4l: ({
    id: 'vl4jfkdj4l',
    type: contentItemTypes.PARAGRAPH,
    text: 'Introduction to the *Open Webslides **Slide Rendering** for noobs*',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  lhjdki4hvi: {
    id: 'lhjdki4hvi',
    type: contentItemTypes.HEADING,
    text: 'Subheading 2',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: ['kdloeijdj3'],
  },
  dk3j5cl34k: ({
    id: 'dk3j5cl34k',
    type: contentItemTypes.PARAGRAPH,
    text: 'Lorem **ipsum** dolor `sit` amet, [consectetur](https://www.lipsum.com) adipiscing *elit*.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  kdloeijdj3: ({
    id: 'kdloeijdj3',
    type: contentItemTypes.PARAGRAPH,
    text: 'Lorem **ipsum** dolor `sit` amet, [consectetur](https://www.lipsum.com) adipiscing *elit*. Mauris *accumsan* pretium sem, in volutpat nibh sodales a. **Nulla blandit** posuere ex, et [facilisis](https://www.lipsum.com) dui volutpat in.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  }: ParagraphContentItem),
  kchwki48cd: {
    id: 'kchwki48cd',
    type: contentItemTypes.HEADING,
    text: 'Yet Another Heading That Is Boring',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  },
  ck2k4kvcj4: {
    id: 'ck2k4kvcj4',
    type: contentItemTypes.HEADING,
    text: '10 Reasons Why You Should Read This',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  },
  ldicl3j4jk: {
    id: 'ldicl3j4jk',
    type: contentItemTypes.HEADING,
    text: 'Welcome to the presentation',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  },
};
