// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`update`, (): void => {

  let dummyId: string;
  let dummyName: string;
  let dummyLocale: string;
  let dummyAlertEmails: boolean;

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
      },
    };
    const actualAction = actions.update(dummyId, dummyName, dummyLocale, dummyAlertEmails);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
