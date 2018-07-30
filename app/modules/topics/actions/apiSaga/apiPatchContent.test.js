// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPatchContent`, (): void => {

  it(`returns a API_PATCH_CONTENT action`, (): void => {
    const id = 'abcdefghij';
    const content = [];
    const expectedAction: a.ApiPatchTopicContentAction = {
      type: a.API_PATCH_CONTENT,
      payload: {
        id,
        content,
      },
    };

    expect(actions.apiPatchContent(id, content)).toEqual(expectedAction);
  });

});
