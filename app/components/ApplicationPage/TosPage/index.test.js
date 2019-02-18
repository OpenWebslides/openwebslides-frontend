// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureTosPage } from '.';

describe(`TosPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTosPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
