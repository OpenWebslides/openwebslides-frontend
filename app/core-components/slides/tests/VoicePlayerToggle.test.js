// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import VoicePlayerToggle from '../VoicePlayerToggle';

describe(`VoicePlayerToggle`, (): void => {

  // const buttonSelector = `.${'VoiceButton'}`;
  // const dummyRead = jest.fn();

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <VoicePlayerToggle content="" />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});

/* it('calls read after button click', (): void => {
    const enzymeWrapper = shallow(
      <Voiceplay />,
    );
    enzymeWrapper.find(buttonSelector).hostNodes().simulate('click');
    expect(dummyRead).toHaveBeenCalled();
  }); */
