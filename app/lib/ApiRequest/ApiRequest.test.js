// @flow
/* eslint-disable quote-props */

import { API_URL } from 'config/api';
import { UnsupportedOperationError } from 'errors';

import fetchApiResponseData from './helpers/fetchApiResponseData';
import ApiRequest, { defaultConfig } from './ApiRequest';
import * as m from './model';

jest.mock('./helpers/fetchApiResponseData');

describe(`ApiRequest`, (): void => {

  let dummyFetchApiResponseData: *;

  beforeEach((): void => {
    jest.restoreAllMocks();

    dummyFetchApiResponseData = jest.fn();
    (fetchApiResponseData: any).mockImplementation(dummyFetchApiResponseData);
  });

  it(`correctly sets the method and uses defaults for the rest of the config, when it is created`, (): void => {
    const dummyRequest = new ApiRequest(m.httpMethods.GET);
    expect(dummyRequest.config).toEqual({
      ...defaultConfig,
      method: m.httpMethods.GET,
    });
  });

  it(`calls fetchApiResponseData with the correct arguments, when it is executed`, (): void => {
    new ApiRequest(m.httpMethods.GET)
      .addPathSegment('test')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: m.httpMethods.GET,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`executes with extra headers, when extra headers are passed before execution`, (): void => {
    new ApiRequest(m.httpMethods.GET)
      .addPathSegment('test')
      .setHeader('Host', 'localhost')
      .setHeader('Accept-Charset', 'utf-8')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: m.httpMethods.GET,
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
    new ApiRequest(m.httpMethods.GET)
      .addPathSegment('test')
      .setHeader('Content-Type', 'text/html')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: m.httpMethods.GET,
        headers: {
          ...defaultConfig.headers,
          'Content-Type': 'text/html',
        },
        body: null,
      },
    );
  });

  it(`executes with extra parameters, when extra parameters are passed before execution`, (): void => {
    new ApiRequest(m.httpMethods.GET)
      .addPathSegment('test')
      .setParameter('page', '5')
      .setParameter('filter', 'foobar')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test?page=5&filter=foobar`,
      {
        method: m.httpMethods.GET,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`allows previously set parameters to be overridden with new values`, (): void => {
    new ApiRequest(m.httpMethods.GET)
      .addPathSegment('test')
      .setParameter('page', '5')
      .setParameter('page', '8')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test?page=8`,
      {
        method: m.httpMethods.GET,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`executes with the correct url, when multiple pathSegments and parameters are passed`, (): void => {
    new ApiRequest(m.httpMethods.GET)
      .addPathSegment('lorem')
      .addPathSegment('ipsum')
      .setParameter('page', '5')
      .setParameter('filter', 'foobar')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/lorem/ipsum?page=5&filter=foobar`,
      {
        method: m.httpMethods.GET,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`throws an UnsupportedOperationError, when attempting to execute without having added any pathSegments`, (): void => {
    expect((): void => {
      new ApiRequest(m.httpMethods.GET)
        .execute();
    }).toThrow(UnsupportedOperationError);
  });

  it(`executes with the correct body, when a body is passed before execution`, (): void => {
    const dummyBody = JSON.stringify({ data: { foo: 'bar' } });
    new ApiRequest(m.httpMethods.POST)
      .addPathSegment('test')
      .setBody(dummyBody)
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: m.httpMethods.POST,
        headers: defaultConfig.headers,
        body: dummyBody,
      },
    );
  });

  it(`throws an UnsupportedOperationError, when attempting to set a body on a GET request`, (): void => {
    const dummyBody = JSON.stringify({ data: { foo: 'bar' } });

    expect((): void => {
      new ApiRequest(m.httpMethods.GET)
        .addPathSegment('test')
        .setBody(dummyBody);
    }).toThrow(UnsupportedOperationError);
  });

  it(`executes with the correct Auth header, when a token is passed before execution`, (): void => {
    new ApiRequest(m.httpMethods.POST)
      .addPathSegment('test')
      .setToken('foobarToken')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: m.httpMethods.POST,
        headers: {
          ...defaultConfig.headers,
          'Authorization': 'Bearer foobarToken',
        },
        body: null,
      },
    );
  });

  it(`allows unsetting the Auth header by passing null as a token`, (): void => {
    new ApiRequest(m.httpMethods.POST)
      .addPathSegment('test')
      .setToken('foobarToken')
      .setToken(null)
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: m.httpMethods.POST,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

  it(`allows unsetting the Auth header by passing an empty string as a token`, (): void => {
    new ApiRequest(m.httpMethods.POST)
      .addPathSegment('test')
      .setToken('foobarToken')
      .setToken('')
      .execute();

    expect(dummyFetchApiResponseData).toHaveBeenCalledWith(
      `${API_URL}/test`,
      {
        method: m.httpMethods.POST,
        headers: defaultConfig.headers,
        body: null,
      },
    );
  });

});
