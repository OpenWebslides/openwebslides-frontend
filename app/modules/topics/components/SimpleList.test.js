// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureSimpleList } from './SimpleList';

describe(`SimpleList`, (): void => {

  it(`renders without errors`, (): void => {

    const enzymeWrapper = shallow(
      <PureSimpleList
        {...dummyProviderProps.translatorProps}
        userId="abcdefghij"
        topicIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
