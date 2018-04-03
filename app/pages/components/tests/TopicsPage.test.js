// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureTopicsPage } from '../TopicsPage';

describe(`TopicsPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicsPage
        {...dummyTranslatorProps}
        topicIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
