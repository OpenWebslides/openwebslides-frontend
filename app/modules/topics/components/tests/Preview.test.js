// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PurePreview } from '../Preview';

describe(`Preview`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };

    const enzymeWrapper = shallow(
      <PurePreview
        {...dummyTranslatorProps}
        topicId="abcdefghij"
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
