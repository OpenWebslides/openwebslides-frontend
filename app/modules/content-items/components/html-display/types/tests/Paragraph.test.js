// @flow

import * as React from 'react';
import { render, shallow } from 'enzyme';

import { contentItemTypes } from '../../../../model';
import type { DenormalizedParagraphContentItem } from '../../../../model';

import { PureParagraph } from '../Paragraph';

describe(`Paragraph`, (): void => {

  const dummyParagraph: $Exact<DenormalizedParagraphContentItem> = {
    id: 'plqfm799be',
    type: contentItemTypes.PARAGRAPH,
    text: 'Lorem ipsum dolor sit amet.',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [],
  };

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        headingLevel={1}
        containerClassName="ows_container"
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
      />,
    );
    const paragraphTags = enzymeWrapper.find('p');
    expect(paragraphTags).toHaveLength(2);
    expect(paragraphTags.first().text()).toEqual(dummyParagraph.text);
  });

});
