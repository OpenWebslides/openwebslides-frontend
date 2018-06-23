// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureCardCollection } from '../CardCollection';

describe(`CardCollection`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyHandleRequestTopics = jest.fn();
    const enzymeWrapper = shallow(
      <PureCardCollection
        topicIds={[]}
        userId="abcdefghij"
        handleRequestTopics={dummyHandleRequestTopics}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
