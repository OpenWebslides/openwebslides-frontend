// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`apiPost`, (): void => {

  let dummyEmail: string;
  let dummyName: string;
  let dummyPassword: string;
  let dummyTosAccepted: true;
  let dummyAge: number;
  let dummyGender: m.GenderType;
  let dummyRole: m.RoleType;
  let dummyCountry: m.CountryType;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;
    dummyAge = 18;
    dummyGender = m.genderTypes.MALE;
    dummyRole = m.roleTypes.LEARNER;
    dummyCountry = m.countryTypes.BELGIUM;
  });

  it(`returns an API_POST action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPostAction = {
      type: a.API_POST,
      payload: {
        email: dummyEmail,
        name: dummyName,
        password: dummyPassword,
        tosAccepted: dummyTosAccepted,
        age: dummyAge,
        gender: dummyGender,
        role: dummyRole,
        country: dummyCountry,
      },
    };
    const actualAction = actions.apiPost(dummyEmail, dummyName, dummyPassword, dummyTosAccepted, dummyAge, dummyGender, dummyRole, dummyCountry);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
