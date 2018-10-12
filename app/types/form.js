// @flow

/**
 * Temporary copy of redux-form FormProps; see 'redux-form/lib/types.js.flow'
 * copy is necessary because redux-form is now ignored in .flowconfig,
 * which means we can no longer import the above file.
 *
 * #TODO replace redux-form with formik
 */

/* eslint-disable
    flowtype/require-exact-type,
    flowtype/no-weak-types,
    flowtype/no-existential-type,
    flowtype/no-mutable-array,
    flowtype/array-style-simple-type */

export type FormProps = {
  anyTouched: boolean,
  array: {
    insert: (field: string, index: number, value: any) => void,
    move: (field: string, from: number, to: number) => void,
    pop: (field: string) => void,
    push: (field: string, value: any) => void,
    remove: (field: string, index: number) => void,
    removeAll: (field: string) => void,
    shift: (field: string) => void,
    splice: (
      field: string,
      index: number,
      removeNum: number,
      value: any
    ) => void,
    swap: (field: string, indexA: number, indexB: number) => void,
    unshift: (field: string, value: any) => void,
  },
  asyncValidate: () => void,
  asyncValidating: boolean,
  autofill: (field: string, value: any) => void,
  blur: (field: string, value: any) => void,
  change: (field: string, value: any) => void,
  clearAsyncError: (field: string) => void,
  clearSubmit: () => void,
  destroy: () => void,
  dirty: boolean,
  dispatch: Function,
  error: any,
  form: string,
  // $FlowFixMe existential type is deprecated, but can't change this since it is a copy/paste
  handleSubmit: (eventOrSubmit: any) => void | Promise<*>,
  initialize: (data: Object) => void,
  initialized: boolean,
  initialValues: Object,
  invalid: boolean,
  pristine: boolean,
  reset: () => void,
  resetSection: () => void,
  submitting: boolean,
  submitFailed: boolean,
  submitSucceeded: boolean,
  touch: (...fields: string[]) => void,
  untouch: (...fields: string[]) => void,
  valid: boolean,
  warning: any,
};
