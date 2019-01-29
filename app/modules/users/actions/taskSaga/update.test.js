// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`update`, (): void => {

  let dummyId: string;
  let dummyName: string;
  let dummyLocale: string;
  let dummyAlertEmails: boolean;
  const dummyAge = 18;
  const dummyGender = m.genderTypes.MALE;
  const dummyRole = m.roleTypes.LEARNER;
  const dummyCountry = 'BE';

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyName = 'dummyName';
    dummyLocale = 'dummyLocale';
    dummyAlertEmails = false;
  });

  it(`returns a users UPDATE action containing the passed props`, (): void => {
    const expectedAction: a.UpdateAction = {
      type: a.UPDATE,
      payload: {
        id: dummyId,
        name: dummyName,
        locale: dummyLocale,
        alertEmails: dummyAlertEmails,
        age: dummyAge,
        gender: dummyGender,
        role: dummyRole,
        country: dummyCountry,
      },
    };
    const actualAction = actions.update(dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyAge, dummyGender, dummyRole, dummyCountry);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
