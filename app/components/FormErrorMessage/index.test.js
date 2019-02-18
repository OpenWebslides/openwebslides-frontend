// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Formik, Field } from 'formik';

import { DummyProviders } from 'lib/testResources';

import FormErrorMessage, { PureFormErrorMessage } from '.';

describe(`FormErrorMessage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureFormErrorMessage name="dummy" />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a Message component when the associated form field is invalid`, async (): Promise<void> => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <Formik initialValues={{ dummy: '' }} onSubmit={(): void => {}}>
          {() => (
            <form>
              <FormErrorMessage name="dummy" />
              <Field
                type="text"
                name="dummy"
                id="dummy"
                validate={(value: string): ?string => ((value !== '') ? 'Dummy error' : null)}
                data-test-id="dummy-input"
              />
            </form>
          )}
        </Formik>
      </DummyProviders>,
    );
    const dummyInput = enzymeWrapper.find('[data-test-id="dummy-input"] input');
    dummyInput.simulate('change', { target: { name: 'dummy', value: 'dummy input text' } });
    dummyInput.simulate('blur');

    // Wait for async Formik update
    await new Promise((resolve): any => setTimeout(resolve, 0));
    enzymeWrapper.update();

    expect(enzymeWrapper.find('Message')).toHaveLength(1);
  });

});
