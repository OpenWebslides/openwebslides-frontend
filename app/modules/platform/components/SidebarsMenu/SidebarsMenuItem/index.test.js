// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';
import { dummyProviderProps } from 'lib/testResources';

import actions from '../../../actions';
import * as m from '../../../model';
import selectors from '../../../selectors';

import SidebarsMenuItem, { PureSidebarsMenuItem } from '.';

describe(`SidebarsMenuItem`, (): void => {

  let dummySidebarId: m.SidebarId;

  let dummyDispatch: *;
  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummySidebarId = m.sidebarIds.TOPIC_INFO;

    dummyDispatch = jest.fn();
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, {});
    dummyStore.dispatch = dummyDispatch;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarsMenuItem
        {...dummyProviderProps.translatorProps}
        sidebarId={dummySidebarId}
        isActive={false}
        handleMenuItemClick={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`is active, when the corresponding sidebarId is active`, (): void => {
    selectors.getSettingByKey = (): any => [dummySidebarId];

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <SidebarsMenuItem sidebarId={dummySidebarId} />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    expect(enzymeWrapper.find('PureSidebarsMenuItem').props().isActive).toBe(true);
  });

  it(`is inactive, when the corresponding sidebarId is inactive`, (): void => {
    selectors.getSettingByKey = (): any => [];

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <SidebarsMenuItem sidebarId={dummySidebarId} />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    expect(enzymeWrapper.find('PureSidebarsMenuItem').props().isActive).toBe(false);
  });

  it(`dispatches a toggleSidebar(sidebarId) action, whet it is clicked`, (): void => {
    selectors.getSettingByKey = (): any => [dummySidebarId];

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <SidebarsMenuItem sidebarId={dummySidebarId} />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    const menuItemNode = enzymeWrapper.find('[data-test-id="sidebars-menu-item"]').hostNodes();
    menuItemNode.simulate('click');

    expect(dummyDispatch).toHaveBeenCalledWith(actions.toggleSidebar(dummySidebarId));
  });

});
