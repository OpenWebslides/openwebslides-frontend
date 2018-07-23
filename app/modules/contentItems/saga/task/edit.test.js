// @flow

import { expectSaga, testSaga } from 'redux-saga-test-plan';

import { NotYetImplementedError, ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

import editSaga from './edit';

describe(`editSaga`, (): void => {

  let dummyParagraph12: $Exact<m.ParagraphContentItem>;
  let dummyParagraph11: $Exact<m.ParagraphContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: any;

  beforeEach((): void => {
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
    const dummyEditAction: $Exact<a.EditAction> = {
      type: a.EDIT,
      payload: {
        id: dummyParagraph11.id,
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: a.EDIT_PROPS_FOR_TYPE_IN_STATE,
          payload: {
            contentItem: dummyParagraph11,
            propsForType: {
              text: dummyEditAction.payload.propsForType.text,
            },
          },
        },
      })
      .run();
  });

  it(`puts a REMOVE action, when a plainText contentItem's isEditing state is FALSE and its text property is being set to an empty string`, (): void => {
    const dummyEditAction: $Exact<a.EditAction> = {
      type: a.EDIT,
      payload: {
        id: dummyParagraph11.id,
        propsForType: {
          text: '',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: a.REMOVE,
          payload: {
            id: dummyParagraph11.id,
          },
        },
      })
      .run();
  });

  it(`does not put a REMOVE action, when a plainText contentItem's isEditing state is TRUE and its text property is being set to an empty string`, (): void => {
    dummyParagraph11.isEditing = true;

    const dummyEditAction: $Exact<a.EditAction> = {
      type: a.EDIT,
      payload: {
        id: dummyParagraph11.id,
        propsForType: {
          text: '',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .withState(dummyState)
      .not.put.actionType(a.REMOVE)
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, (): void => {
    const dummyInvalidId = 'ExtremelyUnlikelyIdX';
    const dummyEditAction: $Exact<a.EditAction> = {
      type: a.EDIT,
      payload: {
        id: dummyInvalidId,
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    expect((): void => {
      testSaga(editSaga, dummyEditAction)
        .next()
        .select(selectors.getById, { id: dummyInvalidId })
        .next(null);
    }).toThrow(ObjectNotFoundError);
  });

  it(`temporarily throws a NotYetImplementedError, when the contentItem's type is not a plainTextContentItemType`, (): void => {
    const dummyEditAction: $Exact<a.EditAction> = {
      type: a.EDIT,
      payload: {
        id: dummyRoot.id,
        isEditing: false,
        propsForType: {},
      },
    };
    expect((): void => {
      testSaga(editSaga, dummyEditAction)
        .next()
        .select(selectors.getById, { id: dummyRoot.id })
        .next(dummyRoot);
    }).toThrow(NotYetImplementedError);
  });

});
