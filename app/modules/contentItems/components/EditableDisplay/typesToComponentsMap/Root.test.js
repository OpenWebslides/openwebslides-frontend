// @flow

import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import * as m from '../../../model';
import { dummyContentItemData as dummyData } from '../../../lib/testResources';

import { PureRoot } from './Root';

describe(`Root`, (): void => {

  let dummyHeading2: $Exact<m.HeadingContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: $Exact<m.ContentItemsById>;
  let dummyState: any;

  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyHeading2 = { ...dummyData.headingContentItem2 };
    dummyHeading1 = { ...dummyData.headingContentItem };
    dummyRoot = { ...dummyData.rootContentItem, childItemIds: [dummyHeading1.id, dummyHeading2.id] };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyHeading2.id]: dummyHeading2,
    };
    dummyState = {
      modules: {
        contentItems: {
          byId: dummyContentItemsById,
        },
      },
    };

    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, dummyState);
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRoot contentItem={dummyRoot} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders all of its child items`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <PureRoot contentItem={dummyRoot} />
      </Provider>,
    );
    expect(enzymeWrapper.find('PureHeading')).toHaveLength(2);
  });

});
