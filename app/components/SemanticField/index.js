// @flow

import React from 'react';
import { Field } from 'formik';

/**
 * Workaround for non-browser native Semantic UI components such as Dropdown
 * See https://github.com/jaredpalmer/formik/issues/148
 * See https://github.com/Semantic-Org/Semantic-UI-React/issues/638
 * See https://github.com/turner-industries/formik-semantic-ui
 *
 * Copied and adjusted from https://github.com/jaredpalmer/formik/issues/148#issuecomment-437159043
 *
 */
// eslint-disable-next-line flowtype/no-weak-types
const SemanticField = ({ component, ...fieldProps }: any) => (
  <Field
    {...fieldProps}
    // eslint-disable-next-line react/jsx-no-bind
    render={({
      field: { value, ...field },
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
        if (fieldProps.onChange) {
          // Call onChange if it is defined on <SemanticField>
          fieldProps.onChange(newValue || checked);
        }
        return setFieldValue(fieldProps.name, newValue || checked);
      },
      // eslint-disable-next-line flowtype/no-weak-types
      onBlur: (e: Event, blurProps: any): void => {
        if (blurProps) setFieldTouched(fieldProps.name, (blurProps.value || blurProps.checked));
      },
    })
    }
  />
);

export default SemanticField;
