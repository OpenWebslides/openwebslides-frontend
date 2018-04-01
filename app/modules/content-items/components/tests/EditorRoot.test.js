// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureEditorRoot } from '../EditorRoot';

import { contentItemTypes } from '../../model';

describe(`EditorRoot`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditorRoot
        {...dummyTranslatorProps}
        rootContentItemId=""
        rootContentItem={{ id: 'abcdefghij', type: contentItemTypes.ROOT, childItemIds: [] }}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
