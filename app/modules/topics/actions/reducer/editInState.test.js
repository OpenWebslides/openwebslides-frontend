// @flow

import { UnsupportedOperationError } from 'errors';
import validate from 'lib/validate';

import * as a from '../../actionTypes';

import actions from '..';

describe(`editInState`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'Edited title';
    dummyDescription = 'Edited description';
  });

  it(`returns a topic EDIT_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: dummyId,
        editedProps: {
          title: dummyTitle,
          description: dummyDescription,
        },
      },
    };
    const actualAction = actions.editInState(dummyId, { title: dummyTitle, description: dummyDescription });

    expect(actualAction).toStrictEqual(expectedAction);
  });

  it(`calls validate.stringProps with the correct arguments and passes the result into the action`, (): void => {
    const dummyValidatedProps = { dummy: 'props' };
    validate.stringProps = jest.fn((): any => dummyValidatedProps);
    const actualAction = actions.editInState(dummyId, { title: dummyTitle, description: dummyDescription });

    expect(validate.stringProps).toHaveBeenCalledWith(
      ['title'],
      ['description'],
      {
        title: dummyTitle,
        description: dummyDescription,
      },
    );
    expect(actualAction.payload.editedProps).toBe(dummyValidatedProps);
  });

  it(`throws an UnsupportedOperationError, when there are no passed editedProps`, (): void => {
    expect((): void => {
      actions.editInState(dummyId, { });
    }).toThrow(UnsupportedOperationError);
  });

});
