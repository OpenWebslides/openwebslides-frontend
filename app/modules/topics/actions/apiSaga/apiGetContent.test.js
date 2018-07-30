// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiGetContent`, (): void => {

  it(`returns a API_GET_CONTENT action`, (): void => {
    const id = 'abcdefghij';
    const expectedAction: a.ApiGetTopicContentAction = {
      type: a.API_GET_CONTENT,
      payload: {
        id,
      },
    };

    expect(actions.apiGetContent(id)).toEqual(expectedAction);
  });

});
