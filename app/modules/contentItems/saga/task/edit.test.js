// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { CorruptedInternalStateError, ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

import { sagas } from '..';

describe(`edit`, (): void => {

  let dummyEditedText: string;

  let dummyHeading2: m.HeadingContentItem;
  let dummyHeading14: m.HeadingContentItem;
  let dummyParagraph13: m.ParagraphContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph111: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyEditedText = 'This text has been edited.';

    dummyHeading2 = { ...dummyData.headingContentItem3 };
    dummyHeading14 = { ...dummyData.headingContentItem2 };
    dummyParagraph13 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph12 = { ...dummyData.paragraphContentItem3 };
    dummyParagraph111 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem, subItemIds: [dummyParagraph111.id] };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id, dummyParagraph13.id, dummyHeading14.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      subItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph111.id]: dummyParagraph111,
      [dummyParagraph12.id]: dummyParagraph12,
      [dummyParagraph13.id]: dummyParagraph13,
      [dummyHeading14.id]: dummyHeading14,
      [dummyHeading2.id]: dummyHeading2,
    };
    dummyContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: null,
    };
    dummyState = {
      modules: {
        contentItems: dummyContentItemsState,
      },
    };
  });

  it(`puts an EDIT_PROPS_FOR_TYPE_IN_STATE action`, (): void => {
    const dummyAction = actions.edit(dummyParagraph11.id, { text: dummyEditedText });

    return expectSaga(sagas.edit, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .put(actions.editPropsForTypeInState(dummyParagraph11, { text: dummyEditedText }))
      .run();
  });

  it(`converts a PARAGRAPH into a HEADING, when the PARAGRAPH's edited text prop starts with '# '`, (): void => {
    const dummyAction = actions.edit(dummyParagraph12.id, { text: `# ${dummyEditedText}` });

    return expectSaga(sagas.edit, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .put(actions.convertInState(dummyParagraph12.id, m.contentItemTypes.HEADING))
      .put(actions.editPropsForTypeInState(dummyParagraph12, { text: dummyEditedText }))
      .run();
  });

  it(`moves any subsequent sibling PARAGRAPHS to the edited item's subItems, when converting a PARAGRAPH into a HEADING`, (): void => {
    const dummyAction = actions.edit(dummyParagraph11.id, { text: `# ${dummyEditedText}` });

    return expectSaga(sagas.edit, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.move(
        dummyParagraph13.id,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyParagraph11.id,
          indexInSiblingItems: 1,
        },
      ))
      .call(asyncRequests.lib.putAndReturn, actions.move(
        dummyParagraph12.id,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyParagraph11.id,
          indexInSiblingItems: 1,
        },
      ))
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<void> => {
    const dummyAction = actions.edit('dummyInvalidId', { text: dummyEditedText });

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.edit, dummyAction)
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
    dummyHeading1.subItemIds = _.without(dummyHeading1.subItemIds, dummyParagraph12.id);
    const dummyAction = actions.edit(dummyParagraph12.id, { text: `# ${dummyEditedText}` });

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.edit, dummyAction)
        .withState(dummyState)
        .provide([
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.MOVE) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(CorruptedInternalStateError);
  });

});
