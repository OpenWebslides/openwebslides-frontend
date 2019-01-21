// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`signup`, (): void => {

  it(`returns a users SIGNUP action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const dummyName = 'Test Tester';
    const dummyPassword = 'MahPasswordY0';
    const dummyTosAccepted = true;
    const dummyAge = 18;
    const dummyGender = m.genderTypes.MALE;
    const dummyRole = m.roleTypes.LEARNER;
    const dummyCountry = m.countryTypes.BELGIUM;

    const expectedAction: a.SignupAction = {
      type: a.SIGNUP,
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
    const actualAction = actions.signup(dummyEmail, dummyName, dummyPassword, dummyTosAccepted, dummyAge, dummyGender, dummyRole, dummyCountry);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
