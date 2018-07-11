// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import { PureSimpleList } from '../SimpleList';

describe(`SimpleList`, (): void => {

  it(`renders without errors`, (): void => {

    const enzymeWrapper = shallow(
      <PureSimpleList
        {...dummyTranslatorProps}
        userId="abcdefghij"
        topicIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
