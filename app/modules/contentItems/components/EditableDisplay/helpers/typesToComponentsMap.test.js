// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { DummyDisplayComponent } from './typesToComponentsMap';

describe(`typesToComponentsMap`, (): void => {

  describe(`DummyDisplayComponent`, (): void => {

    it(`renders without errors`, (): void => {
      const enzymeWrapper = shallow(
        <DummyDisplayComponent />,
      );
      expect(enzymeWrapper.isEmptyRender()).toEqual(false);
    });

  });

});
