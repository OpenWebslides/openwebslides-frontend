// @flow

import { dummyUserData } from 'lib/testResources';

import * as m from '../../model';

import lib from '..';

describe(`getGravatarSrc`, (): void => {

  let dummyUser: m.User;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user, gravatarHash: 'dummyHash' };
  });

  it(`returns the gravatar image url for the passed user`, (): void => {
    const expectedSrc = `https://www.gravatar.com/avatar/dummyHash?default=mp`;
    expect(lib.getGravatarSrc(dummyUser)).toBe(expectedSrc);
  });

  it(`returns the gravatar image url for the passed user in the passed size, when a size value is passed`, (): void => {
    const expectedSrc = `https://www.gravatar.com/avatar/dummyHash?default=mp&size=100`;
    expect(lib.getGravatarSrc(dummyUser, 100)).toBe(expectedSrc);
  });

  it(`returns the gravatar image url for the passed user in the max size, when 'max' is passed as the size value`, (): void => {
    const expectedSrc = `https://www.gravatar.com/avatar/dummyHash?default=mp&size=2048`;
    expect(lib.getGravatarSrc(dummyUser, 'max')).toBe(expectedSrc);
  });

});
