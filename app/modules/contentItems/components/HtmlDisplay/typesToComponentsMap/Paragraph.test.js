// @flow

import _ from 'lodash';
import * as React from 'react';
import { render, shallow } from 'enzyme';

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import { PureParagraph } from './Paragraph';

describe(`Paragraph`, (): void => {

  let dummyParagraph: m.DenormalizedParagraphContentItem;

  beforeEach((): void => {
    dummyParagraph = { ..._.omit(dummyData.paragraphContentItem, 'subItemIds'), subItems: [] };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its text prop inside a paragraph tag`, (): void => {
    const enzymeWrapper = render(
      <PureParagraph
        contentItem={dummyParagraph}
      />,
    );
    const paragraphTags = enzymeWrapper.find('p');
    expect(paragraphTags).toHaveLength(1);
    expect(paragraphTags.first().text()).toEqual(dummyParagraph.text);
  });

});
