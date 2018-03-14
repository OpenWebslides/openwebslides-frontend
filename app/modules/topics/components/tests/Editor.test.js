// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureEditor } from '../Editor';

describe(`List`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };

    const enzymeWrapper = shallow(
      <PureEditor
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
