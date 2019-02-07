// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import * as m from '../../model';

import { PureSidebarsMenu } from '.';

describe(`SidebarsMenu`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarsMenu enabledSidebarIds={[]} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders SidebarsMenuItem only for enabled sidebars`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PureSidebarsMenu
          enabledSidebarIds={[
            m.sidebarIds.TOPIC_INFO,
            m.sidebarIds.SLIDE_PREVIEWS,
          ]}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSidebarsMenuItem')).toHaveLength(2);
  });

});
