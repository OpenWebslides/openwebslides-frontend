// @flow

import apiDeleteToken from './apiDeleteToken';
import apiPostConfirmation from './apiPostConfirmation';
import apiPostPassword from './apiPostPassword';
import apiPostSigninAndGetUserAuth from './apiPostSigninAndGetUserAuth';

const apiSagaActions = {
  apiDeleteToken,
  apiPostConfirmation,
  apiPostPassword,
  apiPostSigninAndGetUserAuth,
};

export default apiSagaActions;
