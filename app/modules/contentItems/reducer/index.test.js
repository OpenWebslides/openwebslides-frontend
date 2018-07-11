// @flow

import * as model from '../model';
import { dummyContentItemsById } from '../dummyData';

import reducer from '.';

const { ContentItemsState } = model;

describe(`index`, (): void => {

  let dummyInitialState: ContentItemsState;

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
