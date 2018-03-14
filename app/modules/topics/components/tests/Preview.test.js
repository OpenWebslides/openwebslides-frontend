// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PurePreview } from '../Preview';

describe(`Preview`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };

    const enzymeWrapper = shallow(
      <PurePreview
        topicId="abcdefghij"
        topic={dummyTopic}
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
