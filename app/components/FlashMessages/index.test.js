// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureFlashMessages } from '.';

describe(`FlashMessages`, (): void => {

  it(`renders without errors`, (): void => {
    const flash = {
      id: 'abcd1234',
      message: 'Dummy flash',
      isError: false,
      props: {
        title: 'foo',
      },
    };

    const enzymeWrapper = shallow(
      <PureFlashMessages
        {...dummyProviderProps.translatorProps}
        flash={flash}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders nothing without flash`, (): void => {
    const enzymeWrapper = shallow(
      <PureFlashMessages
        {...dummyProviderProps.translatorProps}
        flash={null}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(true);
  });

});
