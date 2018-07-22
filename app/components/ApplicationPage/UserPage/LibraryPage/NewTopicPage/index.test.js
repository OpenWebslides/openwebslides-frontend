// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import { PureNewTopicPage } from '.';

describe(`NewTopicPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewTopicPage
        {...dummyTranslatorProps}
        currentUserId="dummyUserId"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
