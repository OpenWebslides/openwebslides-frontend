// @flow

import * as m from '../model';
import { dummyContentItemsById } from '../dummyData';

import reducer from '.';

describe(`index`, (): void => {

  let dummyInitialState: m.ContentItemsState;

  beforeEach((): void => {
    dummyInitialState = {
      byId: dummyContentItemsById,
    };
  });

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction: any = {
      type: 'DUMMY_ACTION',
    };
    expect(reducer(undefined, dummyAction)).toEqual(dummyInitialState);
  });

});
