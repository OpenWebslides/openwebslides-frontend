// @flow

import * as React from 'react';
import { render, shallow } from 'enzyme';

import type { SlideStyling } from 'modules/slide-styling/model';

import { contentItemTypes } from '../../../../model';
import type {
  DenormalizedRootContentItem,
  DenormalizedHeadingContentItem,
} from '../../../../model';

import { PureRoot } from '../Root';

describe(`Root`, (): void => {

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

  const dummyHeading2Text = 'Dolor sit amet';
  const dummyHeading1Text = 'Lorem ipsum';
  const dummyHeading2: $Exact<DenormalizedHeadingContentItem> = {
    id: 'vqj12bqawx',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: dummyHeading2Text,
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [],
  };
  const dummyHeading1: $Exact<DenormalizedHeadingContentItem> = {
    id: 'o365j96prm',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: dummyHeading1Text,
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [],
  };
  const dummyRoot: $Exact<DenormalizedRootContentItem> = {
    id: 'jptgampe2x',
    type: contentItemTypes.ROOT,
    isEditing: false,
    childItems: [dummyHeading1, dummyHeading2],
  };

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRoot
        contentItem={dummyRoot}
        headingLevel={1}
        slideStyling={dummySlideStyling}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders all of its child items`, (): void => {
    const enzymeWrapper = render(
      <PureRoot
        contentItem={dummyRoot}
        headingLevel={1}
        slideStyling={dummySlideStyling}
      />,
    );
    expect(enzymeWrapper.text()).toContain(dummyHeading1Text);
    expect(enzymeWrapper.text()).toContain(dummyHeading2Text);
  });

});
