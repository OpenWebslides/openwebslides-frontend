// @flow

import { expectSaga } from 'redux-saga-test-plan';

// eslint-disable-next-line import/no-internal-modules
import generateId from 'modules/contentItems/lib/generateId'; // #TODO

import actions from '../../actions';

import { sagas } from '..';

jest.mock('modules/contentItems/lib/generateId');

describe(`create`, (): void => {

  let dummyTitle: string;
  let dummyDescription: string;
  let dummyUserId: string;
  let dummyGeneratedId: string;

  beforeEach((): void => {
    dummyTitle = 'dummyTitle';
    dummyDescription = 'Lorem ipsum dolor sit amet.';
    dummyUserId = 'dummyUserId';
    dummyGeneratedId = 'dummyGeneratedId';
    (generateId: any)
      .mockReturnValueOnce(dummyGeneratedId);
  });

  it(`puts a topics apiPost action`, (): void => {
    const dummyAction = actions.create(dummyTitle, dummyDescription, dummyUserId);

    return expectSaga(sagas.create, dummyAction)
      .put(actions.apiPost(dummyTitle, dummyDescription, dummyGeneratedId, dummyUserId))
      .run();
  });

});
