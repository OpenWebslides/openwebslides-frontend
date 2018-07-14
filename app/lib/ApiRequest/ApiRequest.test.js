// @flow

import { API_URL } from 'config/api';

import ApiRequest from './ApiRequest';
import { MEDIA_TYPE } from './constants';
import * as m from './model';

const defaultHeaders = {
  'Content-Type': MEDIA_TYPE,
  Accept: MEDIA_TYPE,
};

describe(`ApiRequest`, (): void => {
  let request: m.Request;

  beforeEach((): void => {
    request = new ApiRequest();
  });

  describe(`config`, (): void => {
    it(`has a default config`, (): void => {
      expect(request.config.url).toEqual(API_URL);
      expect(request.config.endpoint).toEqual('');
      expect(request.config.resource).toBeNull();
      expect(request.config.headers).toEqual(defaultHeaders);
      expect(request.config.parameters).toEqual({});
      expect(request.config.method).toEqual(m.httpMethods.GET);
      expect(request.config.body).toEqual('');
    });
  });

  describe(`setEndpoint`, (): void => {
    it(`sets endpoint without slash`, (): void => {
      request.setEndpoint('foobar');

      expect(request.config.endpoint).toEqual('/foobar');
    });

    it(`sets endpoint with slash`, (): void => {
      request.setEndpoint('/foobar');

      expect(request.config.endpoint).toEqual('/foobar');
    });
  });

  describe(`setResource`, (): void => {
    it(`sets resource`, (): void => {
      request.setResource('foobar');

      expect(request.config.resource).toEqual('foobar');
    });
  });

  describe(`setSubEndpoint`, (): void => {
    it(`sets subEndpoint without slash`, (): void => {
      request.setSubEndpoint('foobar');

      expect(request.config.subEndpoint).toEqual('/foobar');
    });

    it(`sets subEndpoint with slash`, (): void => {
      request.setSubEndpoint('/foobar');

      expect(request.config.subEndpoint).toEqual('/foobar');
    });
  });

  describe(`setSubResource`, (): void => {
    it(`sets subResource`, (): void => {
      request.setSubResource('foobar');

      expect(request.config.subResource).toEqual('foobar');
    });
  });

  describe(`setMethod`, (): void => {
    it(`sets method`, (): void => {
      request.setMethod(m.httpMethods.DELETE);

      expect(request.config.method).toEqual(m.httpMethods.DELETE);
    });
  });

  describe(`setParameter`, (): void => {
    it(`sets parameter`, (): void => {
      request.setParameter('foo', 'bar');

      expect(request.config.parameters).toEqual({
        foo: 'bar',
      });
    });
  });

  describe(`setHeader`, (): void => {
    it(`sets header`, (): void => {
      request.setHeader('Accept', 'application/json');

      expect(request.config.headers.Accept).toEqual('application/json');
    });

    it(`adds header`, (): void => {
      request.setHeader('Host', 'localhost');

      expect(request.config.headers).toEqual({
        ...defaultHeaders,
        Host: 'localhost',
      });
    });
  });

  describe(`setBody`, (): void => {
    it(`sets body`, (): void => {
      request.setBody('foobar');

      expect(request.config.body).toEqual('foobar');
    });
  });

  describe(`setToken`, (): void => {
    it(`sets token`, (): void => {
      expect(request.config.headers.Authorization).toBeUndefined();

      request.setToken('foobar');

      expect(request.config.headers.Authorization).toEqual('Bearer foobar');
    });

    it(`unsets null token`, (): void => {
      request.config.headers.Authorization = 'Bearer foobar';

      request.setToken(null);

      expect(request.config.headers.Authorization).toBeUndefined();
    });

    it(`unsets empty token`, (): void => {
      request.config.headers.Authorization = 'Bearer foobar';

      request.setToken('');

      expect(request.config.headers.Authorization).toBeUndefined();
    });
  });

  describe(`getUrl`, (): void => {
    it(`generates correct url without parameters`, (): void => {
      request.setEndpoint('/endpoint');

      expect(request.getUrl()).toEqual(`${API_URL}/endpoint`);
    });

    it(`generates correct url with one parameter`, (): void => {
      request.setEndpoint('/endpoint');
      request.setParameter('param1', 'value1');

      expect(request.getUrl()).toEqual(`${API_URL}/endpoint?param1=value1`);
    });

    it(`generates correct url with two parameters`, (): void => {
      request.setEndpoint('/endpoint');
      request.setParameter('param1', 'value1');
      request.setParameter('param2', 'value2');

      expect(request.getUrl()).toEqual(`${API_URL}/endpoint?param1=value1&param2=value2`);
    });

    it(`generates correct url with resource`, (): void => {
      request.setEndpoint('/endpoint');
      request.setResource('1');
      request.setParameter('param', 'value');

      expect(request.getUrl()).toEqual(`${API_URL}/endpoint/1?param=value`);
    });

    it(`generates correct url with resource and subEndpoint`, (): void => {
      request.setEndpoint('/endpoint');
      request.setResource('1');
      request.setSubEndpoint('/subendpoint');
      request.setParameter('param', 'value');

      expect(request.getUrl()).toEqual(`${API_URL}/endpoint/1/subendpoint?param=value`);
    });

    it(`generates correct url with resource, subEndpoint and subResource`, (): void => {
      request.setEndpoint('/endpoint');
      request.setResource('1');
      request.setSubEndpoint('/subendpoint');
      request.setSubResource('2');
      request.setParameter('param', 'value');

      expect(request.getUrl()).toEqual(`${API_URL}/endpoint/1/subendpoint/2?param=value`);
    });

    it(`generates correct url with resource and subResource`, (): void => {
      request.setEndpoint('/endpoint');
      request.setResource('1');
      request.setSubResource('2');
      request.setParameter('param', 'value');

      expect(request.getUrl()).toEqual(`${API_URL}/endpoint/1?param=value`);
    });

    it(`generates correct url with subEndpoint and subResource`, (): void => {
      request.setSubEndpoint('/subendpoint');
      request.setSubResource('2');
      request.setParameter('param', 'value');

      expect(request.getUrl()).toEqual(`${API_URL}?param=value`);
    });
  });

  describe(`getOptions`, (): void => {
    it(`generates correct options with POST request`, (): void => {
      request.setMethod(m.httpMethods.POST);
      request.setBody('foobar');
      request.setHeader('User-Agent', 'jest');

      expect(request.getOptions()).toEqual({
        method: m.httpMethods.POST,
        body: 'foobar',
        headers: {
          ...defaultHeaders,
          'User-Agent': 'jest',
        },
      });
    });

    it(`generates correct options with GET request`, (): void => {
      request.setMethod(m.httpMethods.GET);
      request.setBody('foobar');
      request.setHeader('User-Agent', 'jest');

      // No body in GET requests
      expect(request.getOptions()).toEqual({
        method: m.httpMethods.GET,
        headers: {
          ...defaultHeaders,
          'User-Agent': 'jest',
        },
      });
    });

    describe(`execute`, (): void => {
      // TODO
    });
  });
});
