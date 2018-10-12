// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { DummyDisplayComponent } from '.';

describe(`typesToComponentsMap`, (): void => {

  describe(`DummyDisplayComponent`, (): void => {

    it(`renders without errors`, (): void => {
      const enzymeWrapper = shallow(
        <DummyDisplayComponent />,
      );
      expect(enzymeWrapper.isEmptyRender()).toBe(false);
    });

  });

});
