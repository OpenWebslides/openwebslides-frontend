// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import EmailForm, { PureEmailForm, type EmailFormValues } from '.';

describe(`EmailForm`, (): void => {

  let dummyFormProps: EmailFormValues;
  let dummyOnSubmit: any;

  beforeEach((): void => {
    dummyFormProps = {
      email: 'dummy@email',
    };
    dummyOnSubmit = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEmailForm onSubmit={dummyOnSubmit} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders default buttons if no children are specified`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EmailForm onSubmit={dummyOnSubmit} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSubmitButtonGroup')).toHaveLength(1);
  });

  it(`allows rendering children instead of default form buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EmailForm onSubmit={dummyOnSubmit}>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </EmailForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PureEmailForm onSubmit={dummyOnSubmit} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, email: '' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo' })).toHaveProperty('email');
    expect(validate({ ...dummyFormProps, email: 'foo@bar' })).not.toHaveProperty('email');
  });

});
