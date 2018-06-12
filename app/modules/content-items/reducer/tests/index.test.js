// @flow

import reducer from '../../reducer';
import type { ContentItemsState } from '../../model';
import { dummyContentItemsById } from '../../dummyData';

describe(`index`, (): void => {

  const dummyInitialState: ContentItemsState = {
    byId: dummyContentItemsById,
  };

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction: any = {
      type: 'DUMMY_ACTION',
    };
    expect(reducer(undefined, dummyAction)).toEqual(dummyInitialState);
  });

});
