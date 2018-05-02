// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureFeedItem } from '../FeedItem';
import { predicateTypes } from '../../model';

describe(`FeedItem`, (): void => {

  it(`renders without errors`, (): void => {
    const user = {
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
    const feedItem = {
      id: 'zzzzzzzzzz',
      userId: 'xxxxxxxxxx',
      topicId: 'yyyyyyyyyy',
      predicate: predicateTypes.CREATE,
      timestamp: 1511622599112,
    };
    const enzymeWrapper = shallow(
      <PureFeedItem
        {...dummyTranslatorProps}
        feedItemId="zzzzzzzzzz"
        user={user}
        topic={dummyTopic}
        feedItem={feedItem}
        getUser={(): void => {}}
        getTopic={(): void => {}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
