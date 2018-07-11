// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import contentItems from 'modules/contentItems';

import { PureTempSlideTestPage } from '../TempSlideTestPage';

describe(`TempSlideTestPage`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyDenormalizedContentItem: $Exact<contentItems.model.DenormalizedRootContentItem> = {
      id: 'abcdefghij',
      type: contentItems.model.contentItemTypes.ROOT,
      isEditing: false,
      childItems: [],
    };
    const enzymeWrapper = shallow(
      <PureTempSlideTestPage
        {...dummyTranslatorProps}
        contentItemTreeRootItem={dummyDenormalizedContentItem}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
