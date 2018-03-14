// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureEditorBlock } from '../EditorBlock';

import { contentItemTypes } from '../../model';

describe(`EditorBlock`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditorBlock
        contentItemId="abcdefghij"
        contentItem={{ id: 'abcdefghij', type: contentItemTypes.ROOT, childItemIds: [] }}
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
