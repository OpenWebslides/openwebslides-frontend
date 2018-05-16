// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps, dummyRouterMatchProps } from 'config/tests';

import { PureEditorPage } from '../EditorPage';

describe(`EditorPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditorPage
        {...dummyTranslatorProps}
        {...dummyRouterMatchProps}
        amountOfSidebars={0}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
