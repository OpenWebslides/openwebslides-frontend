// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyUserData, dummyInitialState } from 'lib/testResources';

import * as m from '../../../model';

import StatisticsMessage, { PureStatisticsMessage } from '.';

describe(`StatisticsMessage`, (): void => {

  let dummyUser: m.User;

  beforeEach((): void => {
    dummyUser = dummyUserData.user;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureStatisticsMessage
        {...dummyProviderProps.translatorProps}
        user={{ ...dummyUser, age: null }}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a message, when the user lacks age`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <StatisticsMessage user={{ ...dummyUser, age: null }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="statistics-message"]').hostNodes()).toHaveLength(1);
  });

  it(`renders a message, when the user lacks gender`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <StatisticsMessage user={{ ...dummyUser, gender: null }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="statistics-message"]').hostNodes()).toHaveLength(1);
  });

  it(`renders a message, when the user lacks role`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <StatisticsMessage user={{ ...dummyUser, role: null }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="statistics-message"]').hostNodes()).toHaveLength(1);
  });

  it(`renders a message, when the user lacks country`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <StatisticsMessage user={{ ...dummyUser, country: null }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="statistics-message"]').hostNodes()).toHaveLength(1);
  });

  it(`renders nothing, when the user contains age, gender, role and country`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <StatisticsMessage user={dummyUser} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="statistics-message"]').hostNodes()).toHaveLength(0);
  });

});
