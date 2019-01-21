// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`apiPatch`, (): void => {

  let dummyId: string;
  let dummyName: string;
  let dummyLocale: string;
  let dummyAlertEmails: boolean;
  let dummyCurrentPassword: string;
  let dummyPassword: string;
  let dummyAge: number;
  let dummyGender: m.GenderType;
  let dummyRole: m.RoleType;
  let dummyCountry: m.CountryType;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyName = 'dummyName';
    dummyLocale = 'dummyLocale';
    dummyAlertEmails = false;
    dummyCurrentPassword = 'dummyCurrentPassword';
    dummyPassword = 'dummyPassword';
    dummyAge = 18;
    dummyGender = m.genderTypes.MALE;
    dummyRole = m.roleTypes.LEARNER;
    dummyCountry = m.countryTypes.BELGIUM;
  });

  it(`returns an API_PATCH action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPatchAction = {
      type: a.API_PATCH,
      payload: {
        id: dummyId,
        name: dummyName,
        locale: dummyLocale,
        alertEmails: dummyAlertEmails,
        currentPassword: dummyCurrentPassword,
        password: dummyPassword,
        age: dummyAge,
        gender: dummyGender,
        role: dummyRole,
        country: dummyCountry,
      },
    };
    const actualAction = actions.apiPatch(dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyCurrentPassword, dummyPassword, dummyAge, dummyGender, dummyRole, dummyCountry);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
