// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';

import { PureEditor } from '../Editor';

describe(`Editor`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      userId: '1234567890',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };
    const dummyDenormalizedContentItem: $Exact<DenormalizedRootContentItem> = {
      id: 'abcdefghij',
      type: contentItemTypes.ROOT,
      isEditing: false,
      childItems: [],
    };
    const dummyOnSaveButtonClick = jest.fn();
    const dummyOnLoadButtonClick = jest.fn();

    const enzymeWrapper = shallow(
      <PureEditor
        {...dummyTranslatorProps}
        topicId="abcdefghij"
        topic={dummyTopic}
        contentItemTreeRootItem={dummyDenormalizedContentItem}
        onSaveButtonClick={dummyOnSaveButtonClick}
        onLoadButtonClick={dummyOnLoadButtonClick}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
