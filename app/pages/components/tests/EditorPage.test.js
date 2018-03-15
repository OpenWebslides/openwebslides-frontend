// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureEditorPage } from '../EditorPage';

describe(`EditorPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditorPage
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
        match={{ params: {}, isExact: true, path: '', url: '' }}
        rootContentItemId="abcde"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
