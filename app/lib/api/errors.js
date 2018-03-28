// @flow

import parseValidationErrors from './parseValidationErrors';

export class ApiError extends Error {
  constructor(message, statusCode) {
    super();

    this.message = message;
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
};

export class ClientApiError extends ApiError {
  constructor(message, statusCode) {
    super(message, statusCode);

    this.name = 'ClientApiError';
  };
};

export class ServerApiError extends ApiError {
  constructor(message, statusCode) {
    super(message, statusCode);

    this.name = 'ServerApiError';
  };
};

export class ValidationError extends ClientApiError {
  constructor(message, statusCode, errors) {
    super(message, statusCode);

    this.validationErrors = parseValidationErrors(errors);
    this.name = 'ValidationError';
  }
};
