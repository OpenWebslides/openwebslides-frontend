// @flow

import apiDeleteToken from './apiDeleteToken';
import apiPostConfirmation from './apiPostConfirmation';
import apiPostEmailToConfirmation from './apiPostEmailToConfirmation';
import apiPostEmailToPassword from './apiPostEmailToPassword';
import apiPostSigninToTokenAndGetUserAuth from './apiPostSigninToTokenAndGetUserAuth';

const apiSagaActions = {
  apiDeleteToken,
  apiPostConfirmation,
  apiPostEmailToConfirmation,
  apiPostEmailToPassword,
  apiPostSigninToTokenAndGetUserAuth,
};

export default apiSagaActions;
