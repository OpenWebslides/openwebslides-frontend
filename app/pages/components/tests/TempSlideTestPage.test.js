// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';

import { PureTempSlideTestPage } from '../TempSlideTestPage';

describe(`TempSlideTestPage`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyDenormalizedContentItem: $Exact<DenormalizedRootContentItem> = {
      id: 'abcdefghij',
      type: contentItemTypes.ROOT,
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
