// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.pullRequests.patch`, (): void => {

  let dummyId: string;
  let dummyStateEvent: string;
  let dummyFeedback: string;
  let dummyToken: string;

  beforeEach((): void => {
    fetch.resetMocks();
    dummyId = 'dummyId';
    dummyStateEvent = 'dummyStateEvent';
    dummyFeedback = 'dummyFeedback';
    dummyToken = 'dummyToken';
  });

  it(`executes the correct fetch call`, async (): Promise<mixed> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.pullRequests.patch(dummyId, dummyStateEvent, dummyFeedback, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/pullRequests/${dummyId}`);
    expect(mockOptions.method).toBe(httpMethods.PATCH);
    expect(JSON.parse(mockOptions.body)).toStrictEqual({
      data: {
        type: 'pullRequests',
        id: dummyId,
        attributes: {
          stateEvent: dummyStateEvent,
          feedback: dummyFeedback,
        },
      },
    });
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
