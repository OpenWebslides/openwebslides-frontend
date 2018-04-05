// @flow

import * as React from 'react';
import { render, shallow } from 'enzyme';

import { contentItemTypes } from 'modules/content-items';
import type {
  DenormalizedRootContentItem,
  DenormalizedHeadingContentItem,
  DenormalizedParagraphContentItem,
} from 'modules/content-items';

import { PureContentItemHtmlDisplay } from '..';

describe(`ContentItemHtmlDisplay`, (): void => {

  const containerClassName = 'ows_container';
  const subItemsClassNameSuffix = '__sub-items';
  const subItemsClassName = `${containerClassName}${subItemsClassNameSuffix}`;

  const dummyRoot2: $Exact<DenormalizedRootContentItem> = {
    id: 'ua32xchh7q',
    type: contentItemTypes.ROOT,
    childItems: [],
  };
  const dummyNestedParagraph2: $Exact<DenormalizedParagraphContentItem> = {
    id: 'cpi389s1e3',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed ut neque tristique, venenatis purus a, consequat orci. Aenean sed lectus et ante aliquet maximus.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [],
  };
  const dummyNestedParagraph1: $Exact<DenormalizedParagraphContentItem> = {
    id: 'vrci6v35s7',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed hendrerit eget metus nec elementum. Aenean commodo semper sapien, nec porta leo.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [],
  };
  const dummyLevel2Heading: $Exact<DenormalizedHeadingContentItem> = {
    id: 'qbpm9mgn6b',
    type: contentItemTypes.HEADING,
    text: 'Level 2 heading',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [dummyNestedParagraph1, dummyNestedParagraph2],
  };
  const dummyLevel1Heading: $Exact<DenormalizedHeadingContentItem> = {
    id: '6o6qy5dz0a',
    type: contentItemTypes.HEADING,
    text: 'Level 1 heading',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [dummyLevel2Heading],
  };
  const dummyRoot1: $Exact<DenormalizedRootContentItem> = {
    id: 'jptgampe2x',
    type: contentItemTypes.ROOT,
    childItems: [dummyLevel1Heading],
  };

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureContentItemHtmlDisplay
        contentItem={dummyRoot1}
        headingLevel={1}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders all of the contentItem's sub items, when the contentItem is subable and has sub items`, (): void => {
    const enzymeWrapper = render(
      <PureContentItemHtmlDisplay
        contentItem={dummyRoot1}
        headingLevel={1}
        containerClassName={containerClassName}
        subItemsClassNameSuffix={subItemsClassNameSuffix}
      />,
    );

    const subItemsTags = enzymeWrapper.find(`.${subItemsClassName}`);
    expect(subItemsTags).toHaveLength(2);

    const level1SubItemsTag = subItemsTags.first();
    expect(level1SubItemsTag.text()).toContain(dummyLevel2Heading.text);
    expect(level1SubItemsTag.text()).toContain(dummyNestedParagraph1.text);
    expect(level1SubItemsTag.text()).toContain(dummyNestedParagraph2.text);

    const level2SubItemsTags = level1SubItemsTag.find(`.${subItemsClassName}`);
    expect(level2SubItemsTags).toHaveLength(1);

    const level2SubItemsTag = level2SubItemsTags.first();
    expect(level2SubItemsTag.text()).not.toContain(dummyLevel2Heading.text);
    expect(level2SubItemsTag.text()).toContain(dummyNestedParagraph1.text);
    expect(level2SubItemsTag.text()).toContain(dummyNestedParagraph2.text);
  });

  it(`does not render an empty sub items container, when the contentItem is not subable`, (): void => {
    const enzymeWrapper = render(
      <PureContentItemHtmlDisplay
        contentItem={dummyRoot2}
        headingLevel={1}
        containerClassName={containerClassName}
        subItemsClassNameSuffix={subItemsClassNameSuffix}
      />,
    );
    const subItemsTags = enzymeWrapper.find(`.${subItemsClassName}`);
    expect(subItemsTags).toHaveLength(0);
  });

  it(`does not render an empty sub items container, when the contentItem is subable but does not contain any sub items`, (): void => {
    const enzymeWrapper = render(
      <PureContentItemHtmlDisplay
        contentItem={dummyNestedParagraph1}
        headingLevel={1}
        containerClassName={containerClassName}
        subItemsClassNameSuffix={subItemsClassNameSuffix}
      />,
    );
    const subItemsTags = enzymeWrapper.find(`.${subItemsClassName}`);
    expect(subItemsTags).toHaveLength(0);
  });

  it(`renders a heading and its sub items wrapped inside a section`, (): void => {
    const enzymeWrapper = render(
      <PureContentItemHtmlDisplay
        contentItem={dummyRoot1}
        headingLevel={1}
      />,
    );
    const sectionTag = enzymeWrapper.find('h1').parents('section');
    expect(sectionTag.text()).toContain(dummyLevel1Heading.text);
    expect(sectionTag.text()).toContain(dummyLevel2Heading.text);
  });

  it(`renders nested headings with increasing heading levels`, (): void => {
    const enzymeWrapper = render(
      <PureContentItemHtmlDisplay
        contentItem={dummyRoot1}
        headingLevel={1}
      />,
    );
    const h1Tags = enzymeWrapper.find('h1');
    const h2Tags = enzymeWrapper.find('h2');
    expect(h1Tags).toHaveLength(1);
    expect(h1Tags.first().text()).toEqual(dummyLevel1Heading.text);
    expect(h2Tags).toHaveLength(1);
    expect(h2Tags.first().text()).toEqual(dummyLevel2Heading.text);
  });

});
