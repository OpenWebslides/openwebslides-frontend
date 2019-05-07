// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { CorruptedInternalStateError, ObjectNotFoundError, UnsupportedOperationError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

import { removeHeading } from './remove';

import { sagas } from '..';

describe(`remove`, (): void => {

  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph122: m.ParagraphContentItem;
  let dummyParagraph121: m.ParagraphContentItem;
  let dummyHeading12: m.HeadingContentItem;
  let dummyParagraph112: m.ParagraphContentItem;
  let dummyParagraph111: m.ParagraphContentItem;
  let dummyHeading11: m.HeadingContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: Object;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem6 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem5 };
    dummyHeading2 = {
      ...dummyData.headingContentItem4,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id],
    };
    dummyParagraph122 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph121 = { ...dummyData.paragraphContentItem3 };
    dummyHeading12 = {
      ...dummyData.headingContentItem3,
      subItemIds: [dummyParagraph121.id, dummyParagraph122.id],
    };
    dummyParagraph112 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph111 = { ...dummyData.paragraphContentItem };
    dummyHeading11 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph111.id, dummyParagraph112.id],
    };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyHeading11.id, dummyHeading12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      subItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyHeading11.id]: dummyHeading11,
      [dummyParagraph111.id]: dummyParagraph111,
      [dummyParagraph112.id]: dummyParagraph112,
      [dummyHeading12.id]: dummyHeading12,
      [dummyParagraph121.id]: dummyParagraph121,
      [dummyParagraph122.id]: dummyParagraph122,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
    };
    dummyContentItemsState = { byId: dummyContentItemsById, currentlySelectedId: null };
    dummyState = { modules: { contentItems: dummyContentItemsState } };
  });

  it(`puts a REMOVE_FROM_STATE action`, (): void => {
    const dummyAction = actions.remove(dummyParagraph111.id);

    return expectSaga(sagas.remove, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .put(actions.removeFromState(dummyParagraph111.id))
      .run();
  });

  it(`throws an UnsupportedOperationError, when attempting to remove a ROOT`, async (): Promise<void> => {
    const dummyAction = actions.remove(dummyRoot.id);

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.remove, dummyAction)
        .withState(dummyState)
        .provide([
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.MOVE) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

  it(`moves the contentItem's subItems to the end of the previous HEADING, when the contentItem is a HEADING and its previousSibling is also a HEADING`, (): void => {
    const dummyAction = actions.remove(dummyHeading12.id);

    return expectSaga(sagas.remove, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.move(
        dummyParagraph122.id,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyHeading11.id,
          indexInSiblingItems: 2,
        },
      ))
      .call(asyncRequests.lib.putAndReturn, actions.move(
        dummyParagraph121.id,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyHeading11.id,
          indexInSiblingItems: 2,
        },
      ))
      .put(actions.removeFromState(dummyHeading12.id))
      .run();
  });

  it(`moves the contentItem's subItems to its own previous location, when the contentItem is a HEADING and its previousSibling is not a HEADING`, (): void => {
    const dummyAction = actions.remove(dummyHeading11.id);

    return expectSaga(sagas.remove, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.move(
        dummyParagraph112.id,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          siblingItemIds: [dummyHeading11.id, dummyHeading12.id],
          indexInSiblingItems: 0,
        },
      ))
      .call(asyncRequests.lib.putAndReturn, actions.move(
        dummyParagraph111.id,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          siblingItemIds: [dummyHeading11.id, dummyHeading12.id],
          indexInSiblingItems: 0,
        },
      ))
      .put(actions.removeFromState(dummyHeading11.id))
      .run();
  });

  it(`does not move the contentItem's subItems, when the contentItem is not a HEADING`, (): void => {
    const dummyAction = actions.remove(dummyParagraph111.id);

    return expectSaga(sagas.remove, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .not.call.fn(asyncRequests.lib.putAndReturn)
      .run();
  });

  it(`adds a placeholder contentItem, when the removal results in the ROOT being empty`, (): void => {
    const dummyLastParagraph: m.ParagraphContentItem = {
      ...dummyData.paragraphContentItem10,
    };
    const dummyAlmostEmptyRoot: m.RootContentItem = {
      ...dummyData.rootContentItem3,
      subItemIds: [dummyLastParagraph.id],
    };
    const dummyTestContentItemsById = {
      [dummyAlmostEmptyRoot.id]: dummyAlmostEmptyRoot,
      [dummyLastParagraph.id]: dummyLastParagraph,
    };
    const dummyTestState = {
      modules: { contentItems: { byId: dummyTestContentItemsById } },
    };

    const dummyAction = actions.remove(dummyLastParagraph.id);

    return expectSaga(sagas.remove, dummyAction)
      .withState(dummyTestState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.GENERATE_PLACEHOLDER) ? null : next();
        })],
        [select(selectors.getById, { id: dummyAlmostEmptyRoot.id }), {
          ...dummyAlmostEmptyRoot,
          subItemIds: [],
        }],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.generatePlaceholder(dummyAlmostEmptyRoot.id))
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<void> => {
    const dummyAction = actions.remove('invalidId');

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.remove, dummyAction)
        .withState(dummyState)
        .provide([
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.MOVE) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById structure is corrupted`, async (): Promise<void> => {
    dummyHeading1.subItemIds = [dummyHeading12.id];
    const dummyAction = actions.remove(dummyHeading11.id);

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.remove, dummyAction)
        .withState(dummyState)
        .provide([
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.MOVE) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(CorruptedInternalStateError);
  });

  describe(`removeHeading`, (): void => {

    it(`throws a CorruptedInternalStateError, when the passed contentItemsById structure is corrupted`, async (): Promise<void> => {
      dummyHeading1.subItemIds = [dummyHeading12.id];

      try {
        expectSaga(removeHeading, dummyHeading11, dummyContentItemsById)
          .withState(dummyState)
          .provide([
            [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
              return (action.type === a.MOVE) ? null : next();
            })],
          ])
          .run();
      }
      catch (e) {
        expect(e).toBeInstanceOf(CorruptedInternalStateError);
      }
    });

  });

});
