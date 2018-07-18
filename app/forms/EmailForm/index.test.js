// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps, dummyFormProps } from 'config/tests';

import { PureEmailForm } from '.';

describe(`EmailForm`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEmailForm {...dummyTranslatorProps} {...dummyFormProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
