// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureAccessLevelForm, type AccessLevelFormValues } from '.';

describe(`AccessLevelForm`, (): void => {

  let dummyFormProps: AccessLevelFormValues;

  beforeEach((): void => {
    dummyFormProps = {
      title: 'dummyTitle',
      description: 'dummyDescription',
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAccessLevelForm {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toStrictEqual(false);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PureAccessLevelForm {...dummyProviderProps.translatorProps} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, title: '' })).toHaveProperty('title');
    expect(validate({ ...dummyFormProps, title: 'abcd' })).not.toHaveProperty('title');
    expect(validate({ ...dummyFormProps, title: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy' })).toHaveProperty('title');

    expect(validate({ ...dummyFormProps, description: '' })).not.toHaveProperty('description');
    expect(validate({ ...dummyFormProps, description: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvw' })).toHaveProperty('description');
  });

});
