// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';
import contentItems from 'modules/contentItems';

import { PureSlide } from '.';

describe(`Slide`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItem: contentItems.model.DenormalizedRootContentItem = {
      id: 'abcdefghij',
      type: contentItems.model.contentItemTypes.ROOT,
      isDirty: false,
      isEditing: false,
      childItems: [],
    };

    const enzymeWrapper = shallow(
      <PureSlide
        {...dummyProviderProps.translatorProps}
        contentItem={dummyContentItem}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
