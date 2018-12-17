// @flow

import * as a from '../../actionTypes';

const update = (
  id: string,
  name: string,
  locale: string,
  alertEmails: boolean,
): a.UpdateAction => {
  return {
    type: a.UPDATE,
    payload: {
      id,
      name,
      locale,
      alertEmails,
    },
  };
};

export default update;
