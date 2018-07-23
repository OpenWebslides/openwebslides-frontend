// @flow

import * as React from 'react';
import { Image } from 'semantic-ui-react';
import _ from 'lodash';
import md5 from 'blueimp-md5';

type PassedProps = {|
  email: ?string,
  isLarge?: boolean,
|};

type Props = {| ...PassedProps |};

const GRAVATAR_SIZE_SMALL = 64;
const GRAVATAR_SIZE_LARGE = 512;

const hash = (email: ?string): string => {
  // toLowerCase because Gravatar says so
  return md5(_.trim(email).toLowerCase());
};

const Gravatar = (props: Props): React.Node => {
  const { email, isLarge } = props;

  const imageHash = hash(email);
  const size = (isLarge) ? GRAVATAR_SIZE_LARGE : GRAVATAR_SIZE_SMALL;

  return (
    <React.Fragment>
      <Image src={`https://www.gravatar.com/avatar/${imageHash}?s=${size}&d=identicon`} alt="profile" />
    </React.Fragment>
  );
};

export { hash };
export default Gravatar;
