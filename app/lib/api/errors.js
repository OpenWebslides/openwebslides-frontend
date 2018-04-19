// @flow

export class ApiError extends Error {}

export class UnauthorizedApiError extends ApiError {}
export class ForbiddenApiError extends ApiError {}
export class ClientApiError extends ApiError {}
export class ServerApiError extends ApiError {}
