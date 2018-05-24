// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';
import type { SlideStyling } from 'modules/slide-styling/model';

import { PureTempSlideTestPage } from '../TempSlideTestPage';

describe(`TempSlideTestPage`, (): void => {
  const dummyaddToState = (): void => {};
  const dummyUserId = 'adkqmq5ds5';
  const dummyId = 'azd15dsqz1';

  it(`renders without errors`, (): void => {
    const dummyDenormalizedContentItem: $Exact<DenormalizedRootContentItem> = {
      id: 'abcdefghij',
      type: contentItemTypes.ROOT,
      childItems: [],
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
      <PureTempSlideTestPage
        {...dummyTranslatorProps}
        contentItemTreeRootItem={dummyDenormalizedContentItem}
        slideStylingId={dummyId}
        userId={dummyUserId}
        slideStylingItem={dummySlideStyling}
        onAddToState={dummyaddToState}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
