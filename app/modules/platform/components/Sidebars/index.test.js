// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';
import topics from 'modules/topics';

import { PureSidebars } from '.';

describe(`Sidebars`, (): void => {

  let dummyTopic: topics.model.Topic;

  beforeEach((): void => {
    dummyTopic = {
      id: 'dummyTopicId',
      title: 'Lorem ipum',
      description: 'Bla',
      rootContentItemId: 'dummyContentItemId',
      userId: 'dummyUserId',
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSidebars
        {...dummyTranslatorProps}
        activeSidebarIds={[]}
        topicId="dummyTopicId"
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
