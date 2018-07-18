// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps, dummyFormProps } from 'config/tests';

import { PureEmailAndPasswordForm } from '.';

describe(`EmailAndPasswordForm`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEmailAndPasswordForm {...dummyTranslatorProps} {...dummyFormProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
