// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureEditor } from '../Editor';

import { contentItemTypes } from '../../model';

describe(`Editor`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditor
        rootContentItemId=""
        rootContentItem={{ id: 'abcdefghij', type: contentItemTypes.ROOT, childItemIds: [] }}
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
