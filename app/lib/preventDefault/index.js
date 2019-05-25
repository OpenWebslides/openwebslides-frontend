// @flow

// eslint-disable-next-line flowtype/no-weak-types
const preventDefault = (event: SyntheticEvent<any>): void => {
  event.preventDefault();
};

export default preventDefault;
