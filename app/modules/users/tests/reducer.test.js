// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';

import type { UsersState } from '../model';

describe(`reducer`, (): void => {
  it(`handles SET_ITEM_IN_STATE action`, (): void => {
    const setItemInStateAction: t.SetItemInStateAction = {
      type: t.SET_ITEM_IN_STATE,
      payload: {
        item: {
          id: '1',
          firstName: 'Foo',
        },
      },
    };

    const nextState: UsersState = {
      '1': {
        id: '1',
        firstName: 'Foo',
      },
    };

    expect(reducer({}, setItemInStateAction)).toEqual(nextState);
  });

  it(`handles SET_ITEMS_IN_STATE action`, (): void => {
    const setItemsInStateAction: t.SetItemsInStateAction = {
      type: t.SET_ITEMS_IN_STATE,
      payload: {
        items: [{
          id: '1',
          firstName: 'Foo',
        },
        {
          id: '2',
          firstName: 'Foo',
        }],
      },
    };

    const nextState: UsersState = {
      '1': {
        id: '1',
        firstName: 'Foo',
      },
      '2': {
        id: '2',
        firstName: 'Foo',
      },
    };

    expect(reducer({}, setItemsInStateAction)).toEqual(nextState);
  });
});
