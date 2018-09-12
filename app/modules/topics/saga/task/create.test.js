// @flow

import { expectSaga } from 'redux-saga-test-plan';

import contentItems from 'modules/contentItems';
// eslint-disable-next-line import/no-internal-modules
import generateId from 'modules/contentItems/lib/generateId'; // #TODO

import actions from '../../actions';

import { sagas } from '..';

jest.mock('modules/contentItems/lib/generateId');

const { contentItemTypes, contextTypes } = contentItems.model;

describe(`create`, (): void => {

  let dummyTitle: string;
  let dummyDescription: string;
  let dummyUserId: string;
  let dummyGeneratedId1: string;
  let dummyGeneratedId2: string;

  beforeEach((): void => {
    dummyTitle = 'dummyTitle';
    dummyDescription = 'Lorem ipsum dolor sit amet.';
    dummyUserId = 'dummyUserId';
    dummyGeneratedId1 = 'dummyGeneratedId1';
    dummyGeneratedId2 = 'dummyGeneratedId2';
    (generateId: any)
      .mockReturnValueOnce(dummyGeneratedId1)
      .mockReturnValueOnce(dummyGeneratedId2);
  });

  it(`puts a topics apiPost action`, (): void => {
    const dummyAction = actions.create(dummyTitle, dummyDescription, dummyUserId);

    return expectSaga(sagas.create, dummyAction)
      .put(actions.apiPost(dummyTitle, dummyDescription, dummyGeneratedId1, dummyUserId))
      .run();
  });

  it(`creates placeholder topic content`, (): void => {
    const dummyAction = actions.create(dummyTitle, dummyDescription, dummyUserId);

    return expectSaga(sagas.create, dummyAction)
      .put(contentItems.actions.addToState(dummyGeneratedId1, contentItemTypes.ROOT, null, {}))
      .put(contentItems.actions.addToState(dummyGeneratedId2, contentItemTypes.HEADING, { contextType: contextTypes.PARENT, contextItemId: dummyGeneratedId1 }, { text: 'Placeholder' }))
      .run();
  });

});
