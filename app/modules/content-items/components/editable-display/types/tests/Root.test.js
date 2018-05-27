// @flow

import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18nextConfig from 'config/i18next';
import { mount, shallow } from 'enzyme';

import { contentItemTypes } from 'modules/content-items';
import type {
  RootContentItem,
  HeadingContentItem,
  ContentItemsById,
  ContentItemsState,
} from 'modules/content-items';
import * as dummyContentItemData from '../../../../lib/test-resources/dummyContentItemData';

import { PureRoot } from '../Root';

describe(`Root`, (): void => {

  const dummyHeading2: $Exact<HeadingContentItem> = {
    id: 'vqj12bqawx',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Dolor sit amet',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [],
  };
  const dummyHeading1: $Exact<HeadingContentItem> = {
    id: 'o365j96prm',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Lorem ipsum',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [],
  };
  const dummyRoot: $Exact<RootContentItem> = {
    id: 'jptgampe2x',
    type: contentItemTypes.ROOT,
    isEditing: false,
    childItemIds: [dummyHeading1.id, dummyHeading2.id],
  };
  const dummyContentItemsById: ContentItemsById = {
    [dummyRoot.id]: dummyRoot,
    [dummyHeading1.id]: dummyHeading1,
    [dummyHeading2.id]: dummyHeading2,
  };
  const dummyContentItemsState: ContentItemsState = {
    byId: dummyContentItemsById,
  };
  const dummyState: any = {
    modules: {
      contentItems: dummyContentItemsState,
    },
  };

  // eslint-disable-next-line no-unused-vars
  const dummyReducer = (state: any = {}, action: any): any => state;
  const dummyStore = createStore(dummyReducer, dummyState);

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRoot contentItem={dummyRoot} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders all of its child items`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <PureRoot contentItem={dummyRoot} />
        </I18nextProvider>
      </Provider>,
    );
    expect(enzymeWrapper.find('PureHeading')).toHaveLength(2);
  });

});
