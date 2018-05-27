// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import type { SlideStyling } from 'modules/slide-styling/model';
import contentItems from 'modules/content-items';
import { PureSlideSidebar } from '../SlideSidebar';

const { contentItemTypes } = contentItems.model;

describe(`SlideSidebar`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      userId: '1234567890',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };
    const dummyContentItemTreeRootItem = {
      childItemIds: [],
      childItems: [],
      id: 'qyrgv0bcd6',
      type: 'contentItemTypes/ROOT',
      isEditing: false,
    };

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

    const enzymeWrapper = shallow(
      <PureSlideSidebar
        contentItemTreeRootItem={dummyContentItemTreeRootItem}
        topic={dummyTopic}
        slideStylingItem={dummySlideStyling}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
