// @flow

const GET: 'GET' = 'GET';
const POST: 'POST' = 'POST';
const PATCH: 'PATCH' = 'PATCH';
const DELETE: 'DELETE' = 'DELETE';

export const methodTypes = {
  GET,
  POST,
  PATCH,
  DELETE,
};

export type MethodType = $Values<typeof methodTypes>;
