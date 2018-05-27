// @flow

import * as React from 'react';
import { render, shallow } from 'enzyme';

import type { SlideStyling } from 'modules/slide-styling/model';

import { contentItemTypes } from '../../../../model';
import type { DenormalizedParagraphContentItem } from '../../../../model';

import { PureParagraph } from '../Paragraph';

describe(`Paragraph`, (): void => {

  const dummyParagraph: $Exact<DenormalizedParagraphContentItem> = {
    id: 'plqfm799be',
    type: contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Lorem ipsum dolor sit amet.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [],
  };

  const dummySlideStyling: $Exact<SlideStyling> = {
    id: 'azd15dsqz1',
    userId: 'adkqmq5ds5',
    rules: {
      [contentItemTypes.PARAGRAPH]: {
        color: '#000000',
        font: 'Verdana',
      },
      [contentItemTypes.HEADING]: {
        color: '#000000',
        font: 'Verdana',
      },
    },
  };

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        headingLevel={1}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its text prop inside a paragraph tag`, (): void => {
    const enzymeWrapper = render(
      <PureParagraph
        contentItem={dummyParagraph}
        headingLevel={1}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    const paragraphTags = enzymeWrapper.find('p');
    expect(paragraphTags).toHaveLength(1);
    expect(paragraphTags.first().text()).toEqual(dummyParagraph.text);
  });

});
