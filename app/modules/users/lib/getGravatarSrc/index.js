// @flow

import * as m from '../../model';

const getGravatarSrc = (user: m.User, size?: (number | 'max')): string => {
  let src: string = `https://www.gravatar.com/avatar/${user.gravatarHash}?default=mp`;

  if (size === 'max') src += '&size=2048';
  else if (size != null) src += `&size=${size}`;

  return src;
};

export default getGravatarSrc;
