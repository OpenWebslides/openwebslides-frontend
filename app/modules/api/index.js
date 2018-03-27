// @flow

import ApiRequest from './ApiRequest';

import * as feed from './feed';

const api = {
  ApiRequest,
  apiSagas: [
    ...feed.sagas,
  ],
};

export default api;
