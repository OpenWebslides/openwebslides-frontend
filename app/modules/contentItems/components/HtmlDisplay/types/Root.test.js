// @flow

import * as React from 'react';
import { render, shallow } from 'enzyme';

import * as model from '../../../model';
import * as dummyData from '../../../lib/testResources/dummyContentItemData';

import { PureRoot } from './Root';

const {
  DenormalizedRootContentItem,
  DenormalizedHeadingContentItem,
} = model;

describe(`Root`, (): void => {

  let dummyHeading2: DenormalizedHeadingContentItem;
  let dummyHeading1: DenormalizedHeadingContentItem;
  let dummyRoot: DenormalizedRootContentItem;

  beforeEach((): void => {
    dummyHeading2 = { ...dummyData.headingContentItem4, subItems: [] };
    dummyHeading1 = { ...dummyData.headingContentItem, subItems: [] };
    dummyRoot = { ...dummyData.rootContentItem, childItems: [dummyHeading1, dummyHeading2] };
  });

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
    expect(enzymeWrapper.text()).toContain(dummyHeading1.text);
    expect(enzymeWrapper.text()).toContain(dummyHeading2.text);
  });

});
