// @flow
/* eslint-disable quote-props */

import { API_URL } from 'config/api';
import { InvalidArgumentError, UnsupportedOperationError } from 'errors';

import { httpMethods } from '../types';

import fetchApiResponseData from './fetchApiResponseData';

import ApiRequest, { defaultConfig } from '.';

jest.mock('./fetchApiResponseData');

describe(`ApiRequest`, (): void => {

  let dummyFetchApiResponseData: *;

  beforeEach((): void => {
    jest.restoreAllMocks();

    dummyFetchApiResponseData = jest.fn();
    (fetchApiResponseData: any).mockImplementation(dummyFetchApiResponseData);
  });

  it(`correctly sets the method and uses defaults for the rest of the config, when it is created`, (): void => {
    const dummyRequest = new ApiRequest(httpMethods.GET);
    expect(dummyRequest.config).toEqual({
      ...defaultConfig,
      method: httpMethods.GET,
    });
  });

  it(`calls fetchApiResponseData with the correct arguments, when it is executed`, (): void => {
    new ApiRequest(httpMethods.GET)
      .addPathSegment('test')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: httpMethods.GET,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`strips a starting slash from a pathSegment, when a pathSegment with a starting slash is added`, (): void => {
    new ApiRequest(httpMethods.GET)
      .addPathSegment('/test')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: httpMethods.GET,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`throws an InvalidArgumentError, when an empty pathSegment is added`, (): void => {
    expect((): void => {
      new ApiRequest(httpMethods.GET)
        .addPathSegment('/');
    }).toThrow(InvalidArgumentError);
  });

  it(`executes with extra parameters, when extra parameters are passed before execution`, (): void => {
    new ApiRequest(httpMethods.GET)
      .addPathSegment('test')
      .setParameter('page', '5')
      .setParameter('filter', 'foobar')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test?page=5&filter=foobar`,
      {
        method: httpMethods.GET,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`allows previously set parameters to be overridden with new values`, (): void => {
    new ApiRequest(httpMethods.GET)
      .addPathSegment('test')
      .setParameter('page', '5')
      .setParameter('page', '8')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test?page=8`,
      {
        method: httpMethods.GET,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`executes with the correct url, when multiple pathSegments and parameters are passed`, (): void => {
    new ApiRequest(httpMethods.GET)
      .addPathSegment('lorem')
      .addPathSegment('ipsum')
      .setParameter('page', '5')
      .setParameter('filter', 'foobar')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/lorem/ipsum?page=5&filter=foobar`,
      {
        method: httpMethods.GET,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`throws an UnsupportedOperationError, when attempting to execute without having added any pathSegments`, (): void => {
    expect((): void => {
      new ApiRequest(httpMethods.GET)
        .execute();
    }).toThrow(UnsupportedOperationError);
  });

  it(`executes with extra headers, when extra headers are passed before execution`, (): void => {
    new ApiRequest(httpMethods.GET)
      .addPathSegment('test')
      .setHeader('Host', 'localhost')
      .setHeader('Accept-Charset', 'utf-8')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: httpMethods.GET,
        headers: {
          ...defaultConfig.headers,
          'Host': 'localhost',
          'Accept-Charset': 'utf-8',
        },
        body: null,
      },
    );
  });

  it(`allows default headers to be overridden with new values`, (): void => {
    new ApiRequest(httpMethods.GET)
      .addPathSegment('test')
      .setHeader('Content-Type', 'text/html')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: httpMethods.GET,
        headers: {
          ...defaultConfig.headers,
          'Content-Type': 'text/html',
        },
        body: null,
      },
    );
  });

  it(`executes with the correct body, when a body is passed before execution`, (): void => {
    const dummyBody = JSON.stringify({ data: { foo: 'bar' } });
    new ApiRequest(httpMethods.POST)
      .addPathSegment('test')
      .setBody(dummyBody)
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: httpMethods.POST,
        headers: defaultConfig.headers,
        body: dummyBody,
      },
    );
  });

  it(`throws an UnsupportedOperationError, when attempting to set a body on a GET request`, (): void => {
    const dummyBody = JSON.stringify({ data: { foo: 'bar' } });

    expect((): void => {
      new ApiRequest(httpMethods.GET)
        .addPathSegment('test')
        .setBody(dummyBody);
    }).toThrow(UnsupportedOperationError);
  });

  it(`executes with the correct Auth header, when a token is passed before execution`, (): void => {
    new ApiRequest(httpMethods.POST)
      .addPathSegment('test')
      .setToken('foobarToken')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: httpMethods.POST,
        headers: {
          ...defaultConfig.headers,
          'Authorization': 'Bearer foobarToken',
        },
        body: null,
      },
    );
  });

  it(`allows unsetting the Auth header by passing null as a token`, (): void => {
    new ApiRequest(httpMethods.POST)
      .addPathSegment('test')
      .setToken('foobarToken')
      .setToken(null)
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: httpMethods.POST,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`allows unsetting the Auth header by passing an empty string as a token`, (): void => {
    new ApiRequest(httpMethods.POST)
      .addPathSegment('test')
      .setToken('foobarToken')
      .setToken('')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: httpMethods.POST,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

});
