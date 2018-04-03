// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { render, shallow } from 'enzyme';

import { contentItemTypes } from 'modules/content-items';
import type {
  DenormalizedRootContentItem,
  DenormalizedHeadingContentItem,
} from 'modules/content-items';

import { PureRoot } from '../Root';

describe(`Root`, (): void => {

  const dummyHeading2Text = 'Dolor sit amet';
  const dummyHeading1Text = 'Lorem ipsum';
  const dummyHeading2: $Exact<DenormalizedHeadingContentItem> = {
    id: 'vqj12bqawx',
    type: contentItemTypes.HEADING,
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
    childItems: [dummyHeading1, dummyHeading2],
  };

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRoot
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders all of its child items`, (): void => {
    const enzymeWrapper = render(
      <PureRoot
        contentItem={dummyRoot}
        headingLevel={1}
      />,
    );
    expect(enzymeWrapper.text()).toContain(dummyHeading1Text);
    expect(enzymeWrapper.text()).toContain(dummyHeading2Text);
  });

});
