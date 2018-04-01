// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { contentItemTypes } from 'modules/content-items';
import type { DenormalizedContentItem } from 'modules/content-items';

import { PureTempSlideTestPage } from '../TempSlideTestPage';

describe(`TempSlideTestPage`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyDenormalizedContentItem: DenormalizedContentItem = {
      id: 'abcdefghij',
      type: contentItemTypes.ROOT,
      childItemIds: [],
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
