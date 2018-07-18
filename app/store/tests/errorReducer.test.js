// @flow

import type { ErrorState } from 'types/state';
import type { ErrorAction } from 'types/error';

import errorReducer from '../errorReducer';

describe(`errorReducer`, (): void => {

  describe(`initial`, (): void => {

    const dummyInitialState: ErrorState = {};

    it(`returns the initial state, when state parameter is undefined`, (): void => {
      const dummyAction: any = {
        type: 'DUMMY_ACTION',
      };

      expect(errorReducer(undefined, dummyAction)).toEqual(dummyInitialState);
    });

  });

  describe(`ErrorAction`, (): void => {

    const dummyErrorMessage = 'Dummpy error message';
    const dummyError = new Error(dummyErrorMessage);
    const dummyErrorAction: $Exact<ErrorAction> = {
      type: 'DUMMY_ERROR_ACTION',
      error: dummyError,
    };

    it(`prints both the error message and the entire error to the console`, (): void => {
      global.console = { error: jest.fn() };
      errorReducer({}, dummyErrorAction);
      expect(console.error).toHaveBeenCalledWith(dummyErrorMessage);
      expect(console.error).toHaveBeenCalledWith(dummyError);
    });

  });

});
