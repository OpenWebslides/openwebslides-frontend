// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps, dummyUserData, dummyTopicData } from 'lib/testResources';

import * as m from '../model';

import { PureEventWrapper } from './Event';

describe(`Event`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyUser = { ...dummyUserData.user };
    const dummyTopic = { ...dummyTopicData.topic };
    const dummyEvent = {
      id: 'zzzzzzzzzz',
      userId: 'xxxxxxxxxx',
      topicId: 'yyyyyyyyyy',
      type: m.feedItemTypes.CREATE,
      timestamp: 1511622599112,
    };

    const enzymeWrapper = shallow(
      <PureEventWrapper
        {...dummyProviderProps.translatorProps}
        eventId="zzzzzzzzzz"
        user={dummyUser}
        topic={dummyTopic}
        event={dummyEvent}
        fetchUser={jest.fn()}
        fetchTopic={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
