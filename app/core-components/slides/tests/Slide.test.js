// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import * as contentItems from 'modules/content-items';

import { PureSlide } from '../Slide';

describe(`Slide`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItemTreeRoot = {
      id: 'abcdefghij',
      type: contentItems.contentItemTypes.ROOT,
      childItemIds: [],
      childItems: [],
    };

    const enzymeWrapper = shallow(
      <PureSlide
        contentItemTreeRootItem={dummyContentItemTreeRoot}
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
