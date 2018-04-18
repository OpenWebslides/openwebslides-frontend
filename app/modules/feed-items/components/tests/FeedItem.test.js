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
        feedItem={feedItem}
        topicTitle="abcdefghijklmnop"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
