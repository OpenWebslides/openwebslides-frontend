// @flow

export type FlashProperties = {
  +[string]: string,
};

export type Flash = {
  +id: string,
  +message: string,
  +isError: boolean,
  +props: FlashProperties,
};
