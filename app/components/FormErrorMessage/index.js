// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from 'formik';
import { Message } from 'semantic-ui-react';

type PassedProps = {|
  name: string,
|};

type Props = {| ...PassedProps |};

const PureFormErrorMessage = (props: Props): React.Node => {
  const { name } = props;
  const [t] = useTranslation();

  return (
    <ErrorMessage name={name}>
      {(msg: string): React.Node => <Message negative={true}>{t(msg)}</Message>}
    </ErrorMessage>
  );
};

const FormErrorMessage = PureFormErrorMessage;

export { PureFormErrorMessage };
export default FormErrorMessage;
