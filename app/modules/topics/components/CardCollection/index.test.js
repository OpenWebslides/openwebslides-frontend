// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureCardCollection } from '.';

describe(`CardCollection`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureCardCollection
        {...dummyProviderProps.translatorProps}
        topicIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
