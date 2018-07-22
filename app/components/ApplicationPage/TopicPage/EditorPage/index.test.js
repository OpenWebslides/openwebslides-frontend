// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps, dummyRouterProps } from 'config/tests';

import { PureEditorPage } from '.';

describe(`EditorPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditorPage
        {...dummyTranslatorProps}
        {...dummyRouterProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
