// @flow

import apiDeleteToken from './apiDeleteToken';
import apiPostEmailToConfirmation from './apiPostEmailToConfirmation';
import apiPostEmailToPassword from './apiPostEmailToPassword';
import apiPostSigninToTokenAndGetUserAuth from './apiPostSigninToTokenAndGetUserAuth';

const apiSagaActions = {
  apiDeleteToken,
  apiPostEmailToConfirmation,
  apiPostEmailToPassword,
  apiPostSigninToTokenAndGetUserAuth,
};

export default apiSagaActions;
