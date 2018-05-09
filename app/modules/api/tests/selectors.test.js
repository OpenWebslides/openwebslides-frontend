// @flow

import { isPending, isSuccess, isFailure, getError } from '../selectors';
import { statusTypes } from '../model';
import type { RequestStatus } from '../model';

describe(`selectors`, (): void => {
  const dummyRequest1: $Exact<RequestStatus> = {
    status: statusTypes.PENDING,
  };
  const dummyRequest2: $Exact<RequestStatus> = {
    status: statusTypes.SUCCESS,
  };
  const dummyRequest3: $Exact<RequestStatus> = {
    status: statusTypes.FAILURE,
  };
  const dummyRequest4: $Exact<RequestStatus> = {
    status: statusTypes.FAILURE,
    error: {
      message: 'errormessage',
    },
  };

  const dummyState: any = {
    modules: {
      api: {
        dummy1: dummyRequest1,
        dummy2: dummyRequest2,
        dummy3: dummyRequest3,
        dummy4: dummyRequest4,
      },
    },
  };

  describe(`isPending`, (): void => {
    it(`returns true on pending request`, (): void => {
      expect(isPending(dummyState, 'dummy1')).toEqual(true);
    });

    it(`returns false on finished request`, (): void => {
      expect(isPending(dummyState, 'dummy2')).toEqual(false);
      expect(isPending(dummyState, 'dummy3')).toEqual(false);
    });

    it(`returns false on non-existant request`, (): void => {
      expect(isPending(dummyState, 'dummy0')).toEqual(false);
    });
  });

  describe(`isSuccess`, (): void => {
    it(`returns true on success request`, (): void => {
      expect(isSuccess(dummyState, 'dummy2')).toEqual(true);
    });

    it(`returns false on failure or pending request`, (): void => {
      expect(isSuccess(dummyState, 'dummy1')).toEqual(false);
      expect(isSuccess(dummyState, 'dummy3')).toEqual(false);
    });

    it(`returns false on non-existant request`, (): void => {
      expect(isSuccess(dummyState, 'dummy0')).toEqual(false);
    });
  });

  describe(`isFailure`, (): void => {
    it(`returns true on failure request`, (): void => {
      expect(isFailure(dummyState, 'dummy3')).toEqual(true);
    });

    it(`returns false on success or pending request`, (): void => {
      expect(isFailure(dummyState, 'dummy1')).toEqual(false);
      expect(isFailure(dummyState, 'dummy2')).toEqual(false);
    });

    it(`returns false on non-existant request`, (): void => {
      expect(isFailure(dummyState, 'dummy0')).toEqual(false);
    });
  });

  describe(`getError`, (): void => {
    it(`returns error on error request`, (): void => {
      expect(getError(dummyState, 'dummy4')).toEqual({ message: 'errormessage' });
    });

    it(`returns null on other request`, (): void => {
      expect(getError(dummyState, 'dummy1')).toEqual(null);
      expect(getError(dummyState, 'dummy2')).toEqual(null);
      expect(getError(dummyState, 'dummy3')).toEqual(null);
    });

    it(`returns null on non-existant request`, (): void => {
      expect(getError(dummyState, 'dummy0')).toEqual(null);
    });
  });
});
