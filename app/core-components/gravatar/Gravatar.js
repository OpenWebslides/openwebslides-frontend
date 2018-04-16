// @flow

import * as React from 'react';
import { Image } from 'semantic-ui-react';
import _ from 'lodash';

import md5 from 'blueimp-md5';

type PassedProps = {
  email: string,
  size: number,
};

type Props = PassedProps;

const Gravatar = (props: Props): React.Node => {
  const {
    email,
    size,
  } = props;

  const imageHash = md5(_.trim(email).toLowerCase());

  return (
    <React.Fragment>
      <Image src={`https://www.gravatar.com/avatar/${imageHash}?s=${size}`} alt="profile" />
    </React.Fragment>
  );
};

export default Gravatar;
