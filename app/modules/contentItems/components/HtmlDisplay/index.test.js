// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../model';

import { PureHtmlDisplay } from '.';

describe(`HtmlDisplay`, (): void => {

  let dummyParagraph22: m.DenormalizedParagraphContentItem;
  let dummyParagraph21: m.DenormalizedParagraphContentItem;
  let dummyHeading2: m.DenormalizedHeadingContentItem;
  let dummyParagraph122: m.DenormalizedParagraphContentItem;
  let dummyParagraph121: m.DenormalizedParagraphContentItem;
  let dummyHeading12: m.DenormalizedHeadingContentItem;
  let dummyParagraph1122: m.DenormalizedParagraphContentItem;
  let dummyParagraph1121: m.DenormalizedParagraphContentItem;
  let dummyParagraph112: m.DenormalizedParagraphContentItem;
  let dummyParagraph111: m.DenormalizedParagraphContentItem;
  let dummyHeading11: m.DenormalizedHeadingContentItem;
  let dummyHeading1: m.DenormalizedHeadingContentItem;
  let dummyRoot: m.DenormalizedRootContentItem;

  let subItemsSelector: string;

  beforeEach((): void => {
    dummyParagraph22 = { ..._.omit(dummyData.paragraphContentItem8, 'subItemIds'), subItems: [] };
    dummyParagraph21 = { ..._.omit(dummyData.paragraphContentItem7, 'subItemIds'), subItems: [] };
    dummyHeading2 = { ..._.omit(dummyData.headingContentItem4, 'subItemIds'), subItems: [dummyParagraph21, dummyParagraph22] };
    dummyParagraph122 = { ..._.omit(dummyData.paragraphContentItem6, 'subItemIds'), subItems: [] };
    dummyParagraph121 = { ..._.omit(dummyData.paragraphContentItem5, 'subItemIds'), subItems: [] };
    dummyHeading12 = { ..._.omit(dummyData.headingContentItem3, 'subItemIds'), subItems: [dummyParagraph121, dummyParagraph122] };
    dummyParagraph1122 = { ..._.omit(dummyData.paragraphContentItem4, 'subItemIds'), subItems: [] };
    dummyParagraph1121 = { ..._.omit(dummyData.paragraphContentItem3, 'subItemIds'), subItems: [] };
    dummyParagraph112 = { ..._.omit(dummyData.paragraphContentItem2, 'subItemIds'), subItems: [dummyParagraph1121, dummyParagraph1122] };
    dummyParagraph111 = { ..._.omit(dummyData.paragraphContentItem, 'subItemIds'), subItems: [] };
    dummyHeading11 = { ..._.omit(dummyData.headingContentItem2, 'subItemIds'), subItems: [dummyParagraph111, dummyParagraph112] };
    dummyHeading1 = { ..._.omit(dummyData.headingContentItem, 'subItemIds'), subItems: [dummyHeading11, dummyHeading12] };
    dummyRoot = { ..._.omit(dummyData.rootContentItem, 'childItemIds'), childItems: [dummyHeading1, dummyHeading2] };

    subItemsSelector = `[data-test-id="content-item-html-display__sub-items"]`;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders all of the contentItem's nested child- and subItems`, (): void => {
    const enzymeWrapper = mount(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );

    const root = enzymeWrapper.find('PureRoot');
    expect(root).toHaveLength(1);
    const headings = root.find('PureHeading');
    expect(headings).toHaveLength(4);
    const paragraphs = root.find('PureParagraph');
    expect(paragraphs).toHaveLength(8);
  });

  it(`renders NULL, when the passed contentItem is NULL`, (): void => {
    const enzymeWrapper = mount(
      <PureHtmlDisplay
        contentItem={null}
        headingLevel={1}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  it(`does not render any sub items, when the contentItem is not subable`, (): void => {
    const enzymeWrapper = shallow(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );
    const subItemsTags = enzymeWrapper.find(subItemsSelector).hostNodes();
    expect(subItemsTags).toHaveLength(0);
  });

  it(`does not render an empty sub items container, when the contentItem is subable but does not contain any sub items`, (): void => {
    const enzymeWrapper = shallow(
      <PureHtmlDisplay
        contentItem={dummyParagraph111}
        headingLevel={1}
      />,
    );
    const subItemsTags = enzymeWrapper.find(subItemsSelector).hostNodes();
    expect(subItemsTags).toHaveLength(0);
  });

  it(`renders a heading and its sub items wrapped inside a section tag`, (): void => {
    const enzymeWrapper = mount(
      <PureHtmlDisplay
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );
    const sectionTag = enzymeWrapper.find('h1').at(0).parents('section').hostNodes();
    expect(sectionTag.text()).toContain(dummyHeading1.text);
    expect(sectionTag.text()).toContain(dummyHeading11.text);
    expect(sectionTag.text()).toContain(dummyHeading12.text);
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
    expect(h1Tags).toHaveLength(2);
    expect(h1Tags.at(0).text()).toEqual(dummyHeading1.text);
    expect(h1Tags.at(1).text()).toEqual(dummyHeading2.text);
    expect(h2Tags).toHaveLength(2);
    expect(h2Tags.at(0).text()).toEqual(dummyHeading11.text);
    expect(h2Tags.at(1).text()).toEqual(dummyHeading12.text);
  });

});
