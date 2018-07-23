// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureEventWrapper } from '../Event';
import { predicate } from '../../model';

describe(`Event`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyUser = {
      id: 'abcdefghij',
      firstName: 'Jan',
      lastName: 'Jansen',
      email: 'jan.jansen@email.com',
      password: 'janswachtwoord',
    };
    const dummyTopic = {
      id: 'abcdefghij',
      userId: '1234567890',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };
    const dummyEvent = {
      id: 'zzzzzzzzzz',
      userId: 'xxxxxxxxxx',
      topicId: 'yyyyyyyyyy',
      predicate: predicate.CREATE,
      timestamp: 1511622599112,
    };
    const dummyGetUser = jest.fn();
    const dummyGetTopic = jest.fn();

    const enzymeWrapper = shallow(
      <PureEventWrapper
        {...dummyProviderProps.translatorProps}
        eventId="zzzzzzzzzz"
        user={dummyUser}
        topic={dummyTopic}
        event={dummyEvent}
        getUser={dummyGetUser}
        getTopic={dummyGetTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
