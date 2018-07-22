// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import { PureResendConfirmationEmailPage } from '.';

describe(`ResendConfirmationEmailPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureResendConfirmationEmailPage
        {...dummyTranslatorProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
