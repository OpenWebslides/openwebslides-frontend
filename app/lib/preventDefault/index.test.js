// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import preventDefault from '.';

describe(`preventDefault`, (): void => {

  let dummyEvent: any;

  beforeEach((): void => {
    dummyEvent = {
      preventDefault: jest.fn(),
    };
  });

  it(`calls preventDefault on the event`, (): void => {
    const enzymeWrapper = shallow(<input type="button" value="button" onClick={preventDefault} />);

    enzymeWrapper.simulate('click', dummyEvent);
    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
  });

});
