// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import Gravatar, { hash } from '.';

describe(`Gravatar`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <Gravatar
        email="cucumber.tennismatch@email.com"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  describe(`hash`, (): void => {

    it(`returns a correct hash`, (): void => {
      const email = 'cucumber.tennismatch@email.com';
      // hash should have lowercase letters
      const expectedHash = 'b542075b89170094d9cf73b4ab0fdc12';
      const generatedHash = hash(email);

      expect(generatedHash).toEqual(expectedHash);
    });

  });

});
