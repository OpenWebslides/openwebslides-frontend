// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import EmailForm, { PureEmailForm, type EmailFormValues } from '.';

describe(`EmailForm`, (): void => {

  let dummyFormProps: EmailFormValues;

  beforeEach((): void => {
    dummyFormProps = {
      email: 'dummy@email',
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEmailForm {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`allows rendering children instead of default form buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EmailForm>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </EmailForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PureEmailForm {...dummyProviderProps.translatorProps} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, email: '' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo@bar' })).not.toHaveProperty('email');
  });

});
