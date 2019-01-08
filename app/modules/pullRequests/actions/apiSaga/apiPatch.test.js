// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPatch`, (): void => {

  let dummyId: string;
  let dummyStateEvent: string;
  let dummyFeedback: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyStateEvent = 'dummyStateEvent';
    dummyFeedback = 'dummyFeedback';
  });

  it(`returns a pullRequests API_PATCH action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPatchAction = {
      type: a.API_PATCH,
      payload: {
        id: dummyId,
        stateEvent: dummyStateEvent,
        feedback: dummyFeedback,
      },
    };
    const actualAction = actions.apiPatch(dummyId, dummyStateEvent, dummyFeedback);

    expect(actualAction).toStrictEqual(expectedAction);
  });

  it(`calls validate.stringProps with the correct arguments and passes the result into the action`, (): void => {
    const dummyValidatedProps = { dummy: 'props', id: dummyId };
    validate.stringProps = jest.fn((): any => dummyValidatedProps);
    const actualAction = actions.apiPatch(dummyId, dummyStateEvent, dummyFeedback);

    expect(validate.stringProps).toHaveBeenCalledWith(
      ['stateEvent'],
      ['feedback'],
      {
        stateEvent: dummyStateEvent,
        feedback: dummyFeedback,
      },
    );
    expect(actualAction.payload).toStrictEqual(dummyValidatedProps);
  });

});
