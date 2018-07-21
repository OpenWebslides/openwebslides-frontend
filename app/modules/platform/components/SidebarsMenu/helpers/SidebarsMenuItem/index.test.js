// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import * as m from '../../../../model';

import { PureSidebarsMenuItem } from '.';

describe(`SidebarsMenuItem`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebarsMenuItem
        {...dummyTranslatorProps}
        sidebarId={m.sidebarIds.TOPIC_INFO}
        isActive={false}
        handleMenuItemClick={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
