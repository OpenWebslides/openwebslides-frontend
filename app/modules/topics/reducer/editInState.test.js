// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`reducer`, (): void => {

  it(`handles topic EDIT_IN_STATE action`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        abcdefghij: {
          id: 'abcdefghij',
          userId: 'wxcvbnqsdf',
          title: 'dummy topic 1',
          description: 'Lorem ipsum dolor sit amet.',
          rootContentItemId: 'abcdefghij',
        },
      },
    };
    const editAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: 'abcdefghij',
        title: 'Edited test topic',
        description: 'Description has been edited.',
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        abcdefghij: {
          id: 'abcdefghij',
          userId: 'wxcvbnqsdf',
          title: 'Edited test topic',
          description: 'Description has been edited.',
          rootContentItemId: 'abcdefghij',
        },
      },
    };

    expect(reducer(prevState, editAction)).toEqual(nextState);
  });

});
