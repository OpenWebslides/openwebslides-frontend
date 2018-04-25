// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import Voiceplayer from '../Voiceplayer';

describe(`voicePlayerComp`, (): void => {

  // const buttonSelector = `.${'VoiceButton'}`;
  // const dummyRead = jest.fn();

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <Voiceplayer />,
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
