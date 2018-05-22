// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { VoicePlayerToggleComp } from '../VoicePlayerToggle';

describe(`VoicePlayerToggle`, (): void => {
  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <VoicePlayerToggleComp
        content=""
        startPlay={true}
        pausePlay={false}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
