// @flow

import { dummyFeedItemData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`setMultipleInState`, (): void => {

  let dummyFeedItems: $ReadOnlyArray<m.FeedItem>;

  beforeEach((): void => {
    dummyFeedItems = [
      { ...dummyFeedItemData.feedItem },
      { ...dummyFeedItemData.feedItem2 },
    ];
  });

  it(`returns a feedItems SET_MULTIPLE_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        feedItems: dummyFeedItems,
      },
    };
    const actualAction = actions.setMultipleInState(dummyFeedItems);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
