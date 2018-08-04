// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

const create = (title: string, description: ?string = null, userId: string): a.CreateAction => {
  const validatedProps = validate.stringProps(['title'], ['description'], { title, description });

  return {
    type: a.CREATE,
    payload: {
      ...validatedProps,
      userId,
    },
  };
};

export default create;
