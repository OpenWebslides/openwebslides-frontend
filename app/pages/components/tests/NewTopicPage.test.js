// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureNewTopicPage } from '../NewTopicPage';

describe(`NewTopicPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewTopicPage
        {...dummyTranslatorProps}
        topicIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
