// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import { PureRoot } from './Root';

describe(`Root`, (): void => {

  let dummyHeading2: m.HeadingContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyState: any;

  beforeEach((): void => {
    dummyHeading2 = { ...dummyData.headingContentItem2 };
    dummyHeading1 = { ...dummyData.headingContentItem };
    dummyRoot = { ...dummyData.rootContentItem, subItemIds: [dummyHeading1.id, dummyHeading2.id] };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyHeading2.id]: dummyHeading2,
    };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        contentItems: {
          ...dummyInitialState.modules.contentItems,
          byId: dummyContentItemsById,
        },
      },
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRoot contentItem={dummyRoot} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders all of its sub items`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <PureRoot contentItem={dummyRoot} />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('PureHeading')).toHaveLength(2);
  });

});
