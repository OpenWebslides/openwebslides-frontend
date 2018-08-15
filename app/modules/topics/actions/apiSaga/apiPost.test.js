// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPost`, (): void => {

  let dummyTitle: string;
  let dummyDescription: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyTitle = 'This is the title';
    dummyDescription = 'A description';
    dummyUserId = 'dummyUserId';
  });

  it(`returns a topics API_POST action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPostAction = {
      type: a.API_POST,
      payload: {
        title: dummyTitle,
        description: dummyDescription,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.apiPost(dummyTitle, dummyDescription, dummyUserId);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`calls validate.stringProps with the correct arguments and passes the result into the action`, (): void => {
    const dummyValidatedProps = { dummy: 'props' };
    validate.stringProps = jest.fn((): any => dummyValidatedProps);
    const actualAction = actions.apiPost(dummyTitle, dummyDescription, dummyUserId);

    expect(validate.stringProps).toHaveBeenCalledWith(
      ['title'],
      ['description'],
      {
        title: dummyTitle,
        description: dummyDescription,
        userId: dummyUserId,
      },
    );
    expect(actualAction.payload).toEqual(dummyValidatedProps);
  });

});
