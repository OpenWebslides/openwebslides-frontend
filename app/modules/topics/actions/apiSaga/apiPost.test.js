// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPost`, (): void => {

  let dummyTitle: string;
  let dummyDescription: string;
  let dummyRootContentItemId: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyTitle = 'This is the title';
    dummyDescription = 'A description';
    dummyRootContentItemId = 'foobarId';
    dummyUserId = 'dummyUserId';
  });

  it(`returns a topics API_POST action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPostAction = {
      type: a.API_POST,
      payload: {
        title: dummyTitle,
        description: dummyDescription,
        rootContentItemId: dummyRootContentItemId,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.apiPost(dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

  it(`calls validate.stringProps with the correct arguments and passes the result into the action`, (): void => {
    const dummyValidatedProps = { dummy: 'props' };
    validate.stringProps = jest.fn((): any => dummyValidatedProps);
    const actualAction = actions.apiPost(dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId);

    expect(validate.stringProps).toHaveBeenCalledWith(
      ['title', 'rootContentItemId'],
      ['description'],
      {
        title: dummyTitle,
        description: dummyDescription,
        rootContentItemId: dummyRootContentItemId,
        userId: dummyUserId,
      },
    );
    expect(actualAction.payload).toStrictEqual(dummyValidatedProps);
  });

});
