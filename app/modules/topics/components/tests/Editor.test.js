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
      childItems: [],
    };

    const enzymeWrapper = shallow(
      <PureEditor
        {...dummyTranslatorProps}
        topicId="abcdefghij"
        topic={dummyTopic}
        contentItemTreeRootItem={dummyDenormalizedContentItem}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
