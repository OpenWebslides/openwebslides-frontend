// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import api from '..';

describe(`api.topics.patchContent`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<*> => {
    const dummyTopicId = 'ThisIsAnId';
    const dummyToken = 'foobarToken';
    const dummyContent = [dummyData.rootContentItem, dummyData.headingContentItem];
    fetch.mockResponseOnce(null, { status: 200 });
    await api.topics.patchContent(dummyTopicId, dummyContent, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/topics/${dummyTopicId}/content`);
    expect(mockOptions.method).toBe(httpMethods.PATCH);
    expect(JSON.parse(mockOptions.body)).toEqual({
      data: {
        type: 'contents',
        attributes: {
          content: dummyContent,
        },
      },
    });
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
