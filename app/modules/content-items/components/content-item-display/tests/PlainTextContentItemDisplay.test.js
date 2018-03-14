// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PurePlainTextContentItemDisplay } from '../PlainTextContentItemDisplay';

import { contentItemTypes } from '../../../model';

describe(`PlainTextContentItemDisplay`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItem = {
      id: 'abcdefghij',
      type: contentItemTypes.PARAGRAPH,
      text: 'Bla.',
      highlights: [],
      metadata: {
        tags: [],
        visibilityOverrides: {},
      },
      subItemIds: [],
    };

    const enzymeWrapper = shallow(
      <PurePlainTextContentItemDisplay
        contentItem={dummyContentItem}
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
