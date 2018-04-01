// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureEditorBlock } from '../EditorBlock';

import { contentItemTypes } from '../../model';

describe(`EditorBlock`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditorBlock
        {...dummyTranslatorProps}
        contentItemId="abcdefghij"
        contentItem={{ id: 'abcdefghij', type: contentItemTypes.ROOT, childItemIds: [] }}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
