// @flow

import * as React from 'react';
import { render, shallow } from 'enzyme';

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import { PureRoot } from './Root';

describe(`Root`, (): void => {

  let dummyHeading2: m.DenormalizedHeadingContentItem;
  let dummyHeading1: m.DenormalizedHeadingContentItem;
  let dummyRoot: m.DenormalizedRootContentItem;

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
