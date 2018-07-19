// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';
import { dummyTranslatorProps, dummyFormProps } from 'config/tests';

import UserForm, { PureUserForm } from '.';

describe(`UserForm`, (): void => {

  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, {});
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUserForm {...dummyTranslatorProps} {...dummyFormProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`checks its checkbox #TEMP`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <UserForm />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    const checkboxNode = enzymeWrapper.find('[data-test-id="user-form-tos-accepted"]').hostNodes();
    checkboxNode.simulate('change');
    // #TODO
  });

});
