// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureFlashMessages } from '../FlashMessages';

describe(`FlashMessages`, (): void => {

  it(`renders without errors`, (): void => {
    const flash = {
      id: 'abcd1234',
      message: 'Dummy flash',
      isError: false,
      props: {},
    };

    const enzymeWrapper = shallow(
      <PureFlashMessages
        {...dummyTranslatorProps}
        flash={flash}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
