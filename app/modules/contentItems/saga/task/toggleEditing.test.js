// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import * as model from '../../model';
import * as dummyData from '../../lib/testResources/dummyContentItemData';

import toggleEditingSaga from './toggleEditing';

const { editablePropsForType } = model;

describe(`toggleEditingSaga`, (): void => {

  let dummyState: any;

  beforeEach((): void => {
    dummyState = {
      modules: {
        contentItems: {
          byId: {
            [dummyData.rootContentItem.id]: {
              ...dummyData.rootContentItem,
              isEditing: false,
              childItemIds: [dummyData.headingContentItem.id, dummyData.headingContentItem2.id],
            },
            [dummyData.headingContentItem.id]: {
              ...dummyData.headingContentItem,
              isEditing: false,
            },
            [dummyData.headingContentItem2.id]: {
              ...dummyData.headingContentItem2,
              isEditing: false,
            },
          },
        },
      },
    };
  });

  it(`puts a SWITCH_EDITING_IN_STATE action switching the contentItem's isEditing value from TRUE to FALSE, when no explicit value was passed`, (): void => {
    dummyState.modules.contentItems.byId[dummyData.headingContentItem.id].isEditing = true;

    const toggleEditingAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyData.headingContentItem.id,
      },
    };

    return expectSaga(toggleEditingSaga, toggleEditingAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.SWITCH_EDITING_IN_STATE,
          payload: {
            previousEditingItemId: dummyData.headingContentItem.id,
          },
        },
      })
      .run();
  });

  it(`puts a SWITCH_EDITING_IN_STATE action switching the contentItem's isEditing value from FALSE to TRUE, when no explicit value was passed`, (): void => {
    const toggleEditingAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyData.headingContentItem.id,
      },
    };

    return expectSaga(toggleEditingSaga, toggleEditingAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.SWITCH_EDITING_IN_STATE,
          payload: {
            nextEditingItemId: dummyData.headingContentItem.id,
          },
        },
      })
      .run();
  });

  it(`puts a SWITCH_EDITING_IN_STATE action switching the contentItem's isEditing value to TRUE, when the passed value was TRUE`, (): void => {
    const toggleEditingAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyData.headingContentItem.id,
        isEditing: true,
      },
    };

    return expectSaga(toggleEditingSaga, toggleEditingAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.SWITCH_EDITING_IN_STATE,
          payload: {
            nextEditingItemId: dummyData.headingContentItem.id,
          },
        },
      })
      .run();
  });

  it(`puts a SWITCH_EDITING_IN_STATE action switching the contentItem's isEditing value to FALSE, when the passed value was FALSE`, (): void => {
    dummyState.modules.contentItems.byId[dummyData.headingContentItem.id].isEditing = true;

    const toggleEditingAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyData.headingContentItem.id,
        isEditing: false,
      },
    };

    return expectSaga(toggleEditingSaga, toggleEditingAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.SWITCH_EDITING_IN_STATE,
          payload: {
            previousEditingItemId: dummyData.headingContentItem.id,
          },
        },
      })
      .run();
  });

  it(`puts an EDIT action containing all the contentItem's editablePropsForType, when toggling from TRUE to FALSE`, (): void => {
    dummyState.modules.contentItems.byId[dummyData.headingContentItem.id].isEditing = true;

    const toggleEditingAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyData.headingContentItem.id,
        isEditing: false,
      },
    };

    return expectSaga(toggleEditingSaga, toggleEditingAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.EDIT,
          payload: {
            id: dummyData.headingContentItem.id,
            propsForType: _.pick(dummyData.headingContentItem, editablePropsForType[dummyData.headingContentItem.type]),
          },
        },
      })
      .run();
  });

  it(`does not put a SWITCH_EDITING_IN_STATE action, when the contentItem's new isEditing value equals the previous one`, (): void => {
    const toggleEditingAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyData.headingContentItem.id,
        isEditing: false,
      },
    };

    return expectSaga(toggleEditingSaga, toggleEditingAction)
      .withState(dummyState)
      .not.put.actionType(t.SWITCH_EDITING_IN_STATE)
      .run();
  });

  it(`correctly sets the SWITCH_EDITING_IN_STATE action's previousEditingItemId, when another item was previously active`, (): void => {
    dummyState.modules.contentItems.byId[dummyData.headingContentItem2.id].isEditing = true;

    const toggleEditingAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyData.headingContentItem.id,
      },
    };

    return expectSaga(toggleEditingSaga, toggleEditingAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.SWITCH_EDITING_IN_STATE,
          payload: {
            previousEditingItemId: dummyData.headingContentItem2.id,
            nextEditingItemId: dummyData.headingContentItem.id,
          },
        },
      })
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<*> => {
    const toggleEditingAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: 'DefinitelyNotValidId',
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(toggleEditingSaga, toggleEditingAction)
        .withState(dummyState)
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
