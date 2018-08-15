// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

import actions from '..';

describe(`create`, (): void => {

  let dummyTitle: string;
  let dummyDescription: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyTitle = 'dummyTitle';
    dummyDescription = 'dummyDescription';
    dummyUserId = 'dummyUserId';
  });

  it(`returns a topics CREATE action containing the passed arguments`, (): void => {
    const expectedAction: a.CreateAction = {
      type: a.CREATE,
      payload: {
        title: dummyTitle,
        description: dummyDescription,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.create(dummyTitle, dummyDescription, dummyUserId);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`calls validate.stringProps with the correct arguments and passes the result into the action`, (): void => {
    const dummyValidatedProps = { dummy: 'props' };
    validate.stringProps = jest.fn((): any => dummyValidatedProps);
    const actualAction = actions.create(dummyTitle, dummyDescription, dummyUserId);

    expect(validate.stringProps).toHaveBeenCalledWith(
      ['title'],
      ['description'],
      {
        title: dummyTitle,
        description: dummyDescription,
      },
    );
    expect(actualAction.payload).toEqual({ ...dummyValidatedProps, userId: dummyUserId });
  });

});
