// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PurePreview } from '../Preview';

describe(`Preview`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePreview
        topicId="abcde"
        topic={{ id: 'abcde', title: 'Lorem ipsum', description: '' }}
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
