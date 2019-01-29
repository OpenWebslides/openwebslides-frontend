// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.users.patch`, (): void => {

  let dummyId: string;
  let dummyName: string;
  let dummyLocale: string;
  let dummyAlertEmails: boolean;
  let dummyCurrentPassword: string;
  let dummyPassword: string;
  let dummyAge: number;
  let dummyGender: string;
  let dummyRole: string;
  let dummyCountry: string;
  let dummyDeviceType: string;
  let dummyToken: string;

  beforeEach((): void => {
    fetch.resetMocks();
    dummyId = 'dummyId';
    dummyName = 'dummyName';
    dummyLocale = 'dummyLocale';
    dummyAlertEmails = false;
    dummyCurrentPassword = 'dummyCurrentPassword';
    dummyPassword = 'dummyPassword';
    dummyAge = 18;
    dummyGender = 'dummyGender';
    dummyRole = 'dummyRole';
    dummyCountry = 'dummyCountry';
    dummyDeviceType = 'dummyDeviceType';
    dummyToken = 'dummyToken';
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.users.patch(dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyCurrentPassword, dummyPassword, dummyAge, dummyGender, dummyRole, dummyCountry, dummyDeviceType, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/users/${dummyId}`);
    expect(mockOptions.method).toBe(httpMethods.PATCH);
    expect(JSON.parse(mockOptions.body)).toStrictEqual({
      data: {
        type: 'users',
        id: dummyId,
        attributes: {
          name: dummyName,
          locale: dummyLocale,
          alertEmails: dummyAlertEmails,
          currentPassword: dummyCurrentPassword,
          password: dummyPassword,
          age: dummyAge,
          gender: dummyGender,
          role: dummyRole,
          country: dummyCountry,
          deviceType: dummyDeviceType,
        },
      },
    });
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
