// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import { sagas } from '..';

describe(`edit`, (): void => {

  let dummyEditedText: string;

  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyEditedText = 'This text has been edited.';

    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
    };
    dummyContentItemsState = {
      byId: dummyContentItemsById,
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
      .put(actions.editPropsForTypeInState(dummyParagraph11, { text: dummyEditedText }))
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<void> => {
    const dummyAction = actions.edit('dummyInvalidId', { text: dummyEditedText });

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.edit, dummyAction)
        .withState(dummyState)
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
