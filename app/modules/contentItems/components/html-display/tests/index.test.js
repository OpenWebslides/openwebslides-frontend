// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { contentItemTypes } from '../../../model';
import type {
  DenormalizedRootContentItem,
  DenormalizedHeadingContentItem,
  DenormalizedParagraphContentItem,
} from '../../../model';
import { emptyMetadata } from '../../../lib/test-resources/dummyContentItemData';

import { PureHtmlDisplay, DummyDisplayComponent } from '..';

describe(`HtmlDisplay`, (): void => {

  const dummyNestedNestedParagraph1: $Exact<DenormalizedParagraphContentItem> = {
    id: 'wiwj9xqnf3',
    type: contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Proin faucibus tellus eros, quis ultricies est fermentum eu',
    metadata: emptyMetadata,
    subItems: [],
  };
  const dummyNestedParagraph2: $Exact<DenormalizedParagraphContentItem> = {
    id: 'cpi389s1e3',
    type: contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Sed ut neque tristique, venenatis purus a, consequat orci. Aenean sed lectus et ante aliquet maximus.',
    metadata: emptyMetadata,
    subItems: [dummyNestedNestedParagraph1],
  };
  const dummyNestedParagraph1: $Exact<DenormalizedParagraphContentItem> = {
    id: 'vrci6v35s7',
    type: contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Sed hendrerit eget metus nec elementum. Aenean commodo semper sapien, nec porta leo.',
    metadata: emptyMetadata,
    subItems: [],
  };
  const dummyLevel2Heading: $Exact<DenormalizedHeadingContentItem> = {
    id: 'qbpm9mgn6b',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Level 2 heading',
    metadata: emptyMetadata,
    subItems: [dummyNestedParagraph1, dummyNestedParagraph2],
  };
  const dummyLevel1Heading: $Exact<DenormalizedHeadingContentItem> = {
    id: '6o6qy5dz0a',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Level 1 heading',
    metadata: emptyMetadata,
    subItems: [dummyLevel2Heading],
  };
  const dummyRoot: $Exact<DenormalizedRootContentItem> = {
    id: 'jptgampe2x',
    type: contentItemTypes.ROOT,
    isEditing: false,
    childItems: [dummyLevel1Heading],
  };

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders all of the contentItem's sub items, when the contentItem is subable and has sub items`, (): void => {
    const enzymeWrapper = mount(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );

    const root = enzymeWrapper.find('PureRoot');
    expect(root).toHaveLength(1);

    const headings = root.find('PureHeading');
    expect(headings).toHaveLength(2);

    const level1Heading = headings.at(0);
    const level2Heading = level1Heading.find('SubItemsHtmlDisplay').find('PureHeading');
    expect(level2Heading).toHaveLength(1);

    const level2Paragraphs = level2Heading.find('PureParagraph');
    expect(level2Paragraphs).toHaveLength(3);

    const level3Paragraph = level2Paragraphs.at(1).find('SubItemsHtmlDisplay').find('PureParagraph');
    expect(level3Paragraph).toHaveLength(1);
  });

  it(`does not render any sub items, when the contentItem is not subable`, (): void => {
    const enzymeWrapper = shallow(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );
    const subItemsHtmlDisplayWrapper = enzymeWrapper.find('SubItemsHtmlDisplay').dive();
    expect(subItemsHtmlDisplayWrapper.instance()).toEqual(null);
  });

  it(`does not render an empty sub items container, when the contentItem is subable but does not contain any sub items`, (): void => {
    const enzymeWrapper = shallow(
      <PureHtmlDisplay
        contentItem={dummyNestedParagraph1}
        headingLevel={1}
      />,
    );
    const subItemsHtmlDisplayWrapper = enzymeWrapper.find('SubItemsHtmlDisplay').dive();
    expect(subItemsHtmlDisplayWrapper.instance()).toEqual(null);
  });

  it(`renders a heading and its sub items wrapped inside a section`, (): void => {
    const enzymeWrapper = mount(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );
    const sectionTag = enzymeWrapper.find('h1').parents('section').hostNodes();
    expect(sectionTag.text()).toContain(dummyLevel1Heading.text);
    expect(sectionTag.text()).toContain(dummyLevel2Heading.text);
  });

  it(`renders nested headings with increasing heading levels`, (): void => {
    const enzymeWrapper = mount(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );
    const h1Tags = enzymeWrapper.find('h1').hostNodes();
    const h2Tags = enzymeWrapper.find('h2').hostNodes();
    expect(h1Tags).toHaveLength(1);
    expect(h1Tags.first().text()).toEqual(dummyLevel1Heading.text);
    expect(h2Tags).toHaveLength(1);
    expect(h2Tags.first().text()).toEqual(dummyLevel2Heading.text);
  });

  it(`passes non-default class names to child and sub items`, (): void => {
    const dummyContainerClassName = 'dsfgoejfef';
    const dummySubItemsClassNameSuffix = 'fkioojkpge';
    const enzymeWrapper = mount(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
        containerClassName={dummyContainerClassName}
        subItemsClassNameSuffix={dummySubItemsClassNameSuffix}
      />,
    );
    const containerTags = enzymeWrapper.find(`.${dummyContainerClassName}`).hostNodes();
    expect(containerTags).toHaveLength(5);
    const subItemsTags = enzymeWrapper.find(`.${dummyContainerClassName}${dummySubItemsClassNameSuffix}`).hostNodes();
    expect(subItemsTags).toHaveLength(3);
  });

  describe(`DummyDisplayComponent`, (): void => {

    it(`renders without errors`, (): void => {
      const enzymeWrapper = shallow(
        <DummyDisplayComponent />,
      );
      expect(enzymeWrapper.isEmptyRender()).toEqual(false);
    });

  });

});
