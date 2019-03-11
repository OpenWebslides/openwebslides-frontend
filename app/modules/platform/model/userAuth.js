// @flow

export type UserAuth = {|
  +userId: string,
  // Long-lived refresh token, used only for obtaining a short-lived access token
  // See https://github.com/floriandejonckheere/jwt-auth for a summary of the refresh token mechanism
  +refreshToken: string,
  // Short-lived refresh token, used for API requests
  // See https://github.com/floriandejonckheere/jwt-auth for a summary of the refresh token mechanism
  +accessToken: string,
|};
