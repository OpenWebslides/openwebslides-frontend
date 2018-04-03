// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

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
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
