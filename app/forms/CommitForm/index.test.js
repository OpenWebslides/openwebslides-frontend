// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureCommitForm, type CommitFormValues } from '.';

describe(`CommitForm`, (): void => {

  let dummyFormProps: CommitFormValues;
  let dummyOnSubmit: any;

  beforeEach((): void => {
    dummyFormProps = {
      message: 'dummyMessage',
    };
    dummyOnSubmit = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureCommitForm onSubmit={dummyOnSubmit} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(
      <PureCommitForm onSubmit={dummyOnSubmit} />,
    );
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, message: '' })).toHaveProperty('message');
    expect(validate({ ...dummyFormProps, message: 'abcd' })).toHaveProperty('message');
    expect(validate({ ...dummyFormProps, message: '123456789012345678901234567890123456789012345678901234567890' })).not.toHaveProperty('message');
    expect(validate({ ...dummyFormProps, message: '1234567890123456789012345678901234567890123456789012345678901' })).toHaveProperty('message');
  });

});
