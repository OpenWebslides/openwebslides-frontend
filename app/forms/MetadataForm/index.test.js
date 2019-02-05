// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureMetadataForm, type MetadataFormValues } from '.';

describe(`MetadataForm`, (): void => {

  let dummyFormProps: MetadataFormValues;

  beforeEach((): void => {
    dummyFormProps = {
      title: 'dummyTitle',
      description: 'dummyDescription',
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureMetadataForm {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toStrictEqual(false);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PureMetadataForm {...dummyProviderProps.translatorProps} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    // Title of length 101
    const tooLongTitle = new Array(102).join('X');

    // Description of length 201
    const tooLongDescription = new Array(202).join('X');

    expect(validate({ ...dummyFormProps, title: '' })).toHaveProperty('title');
    expect(validate({ ...dummyFormProps, title: 'abcd' })).not.toHaveProperty('title');
    expect(validate({ ...dummyFormProps, title: tooLongTitle })).toHaveProperty('title');

    expect(validate({ ...dummyFormProps, description: '' })).not.toHaveProperty('description');
    expect(validate({ ...dummyFormProps, description: tooLongDescription })).toHaveProperty('description');
  });

});
