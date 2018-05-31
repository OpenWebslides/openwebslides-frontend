// @flow

import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import reducer from '../../reducer';
import * as t from '../../actionTypes';
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

  it(`temporarily throws a NotYetImplementedError, when a SET_IN_STATE action is passed`, (): void => {
    const prevState: ContentItemsState = {
      byId: {},
    };
    const dummySetInStateAction: any = {
      type: t.SET_IN_STATE,
    };
    expect((): void => {
      reducer(prevState, dummySetInStateAction);
    }).toThrow(NotYetImplementedError);
  });

});
