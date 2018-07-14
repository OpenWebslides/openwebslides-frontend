// @flow

const GET: 'GET' = 'GET';
const POST: 'POST' = 'POST';
const PATCH: 'PATCH' = 'PATCH';
const DELETE: 'DELETE' = 'DELETE';

export const httpMethods = {
  GET,
  POST,
  PATCH,
  DELETE,
};

export type HttpMethod = $Values<typeof httpMethods>;
