// @flow

import * as React from 'react';
import { render, shallow } from 'enzyme';

import * as model from '../../../model';
import * as dummyData from '../../../lib/testResources/dummyContentItemData';

import { PureParagraph } from './Paragraph';

const { DenormalizedParagraphContentItem } = model;

describe(`Paragraph`, (): void => {

  let dummyParagraph: DenormalizedParagraphContentItem;

  beforeEach((): void => {
    dummyParagraph = { ...dummyData.paragraphContentItem, subItems: [] };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        headingLevel={1}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its text prop inside a paragraph tag`, (): void => {
    const enzymeWrapper = render(
      <PureParagraph
        contentItem={dummyParagraph}
        headingLevel={1}
      />,
    );
    const paragraphTags = enzymeWrapper.find('p');
    expect(paragraphTags).toHaveLength(1);
    expect(paragraphTags.first().text()).toEqual(dummyParagraph.text);
  });

});
