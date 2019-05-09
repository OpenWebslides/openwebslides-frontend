// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import { PureRoot } from './Root';

describe(`Root`, (): void => {

  let dummyHeading2: m.HeadingContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;

  beforeEach((): void => {
    dummyHeading2 = { ...dummyData.headingContentItem2 };
    dummyHeading1 = { ...dummyData.headingContentItem };
    dummyRoot = { ...dummyData.rootContentItem, subItemIds: [dummyHeading1.id, dummyHeading2.id] };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRoot contentItem={dummyRoot} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  it(`renders nothing`, (): void => {
    const enzymeWrapper = mount(
      <PureRoot contentItem={dummyRoot} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

});
