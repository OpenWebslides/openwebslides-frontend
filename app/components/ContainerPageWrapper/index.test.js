// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureContainerPageWrapper } from '.';

describe(`ContainerPageWrapper`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureContainerPageWrapper>
        <p>Page content</p>
      </PureContainerPageWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
