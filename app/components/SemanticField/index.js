// @flow

import React from 'react';
import { Field } from 'formik';

/**
 * Workaround for non-browser native Semantic UI components such as Dropdown
 * See https://github.com/jaredpalmer/formik/issues/148
 * See https://github.com/Semantic-Org/Semantic-UI-React/issues/638
 * See https://github.com/turner-industries/formik-semantic-ui
 *
 * Copied from https://github.com/jaredpalmer/formik/issues/148#issuecomment-437159043
 *
 */
// eslint-disable-next-line flowtype/no-weak-types
const SemanticField = ({ component, ...fieldProps }: any) => (
  <Field
    {...fieldProps}
    // eslint-disable-next-line react/jsx-no-bind
    render={({
      field: { value, onBlur, ...field },
      form: { setFieldValue, setFieldTouched },
      ...props
    }) => React.createElement(component, {
      ...fieldProps,
      ...field,
      ...props,
      ...(typeof value === 'boolean'
        ? {
          checked: value,
        }
        : {
          value,
        }),
      // eslint-disable-next-line flowtype/no-weak-types
      onChange: (e: Event, { value: newValue, checked }: any): void => {
        return setFieldValue(fieldProps.name, newValue || checked);
      },
      // eslint-disable-next-line flowtype/no-weak-types
      onBlur: (e: Event, blurProps: any): void => {
        return (blurProps ? setFieldTouched(fieldProps.name, blurProps.value) : onBlur(e));
      },
    })
    }
  />
);

export default SemanticField;
