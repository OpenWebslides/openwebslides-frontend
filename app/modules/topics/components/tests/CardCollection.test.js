// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureCardCollection } from '../CardCollection';

describe(`CardCollection`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureCardCollection
        topicIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
