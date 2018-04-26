// @flow

import ApiRequest from '../ApiRequest';
import { API_URL, MEDIA_TYPE } from '../constants';

import type { Request } from '../model';
import { methodTypes } from '../model';

const defaultHeaders = {
  'Content-Type': MEDIA_TYPE,
  Accept: MEDIA_TYPE,
};

describe(`ApiRequest`, (): void => {
  let request: Request;

  beforeEach((): void => {
    request = new ApiRequest();
  });

  describe(`config`, (): void => {
    it(`has a default config`, (): void => {
      expect(request.config.url).toEqual(API_URL);
      expect(request.config.endpoint).toEqual('');
      expect(request.config.resource).toEqual(null);
      expect(request.config.headers).toEqual(defaultHeaders);
      expect(request.config.parameters).toEqual({});
      expect(request.config.method).toEqual(methodTypes.GET);
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

  describe(`setMethod`, (): void => {
    it(`sets method`, (): void => {
      request.setMethod(methodTypes.DELETE);

      expect(request.config.method).toEqual(methodTypes.DELETE);
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
      expect(request.config.headers.Authorization).toEqual(undefined);

      request.setToken('foobar');

      expect(request.config.headers.Authorization).toEqual('Bearer foobar');
    });

    it(`unsets null token`, (): void => {
      request.config.headers.Authorization = 'Bearer foobar';

      request.setToken(null);

      expect(request.config.headers.Authorization).toEqual(undefined);
    });

    it(`unsets empty token`, (): void => {
      request.config.headers.Authorization = 'Bearer foobar';

      request.setToken('');

      expect(request.config.headers.Authorization).toEqual(undefined);
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
  });

  describe(`getOptions`, (): void => {
    it(`generates correct options with POST request`, (): void => {
      request.setMethod(methodTypes.POST);
      request.setBody('foobar');
      request.setHeader('User-Agent', 'jest');

      expect(request.getOptions()).toEqual({
        method: methodTypes.POST,
        body: 'foobar',
        headers: {
          ...defaultHeaders,
          'User-Agent': 'jest',
        },
      });
    });

    it(`generates correct options with GET request`, (): void => {
      request.setMethod(methodTypes.GET);
      request.setBody('foobar');
      request.setHeader('User-Agent', 'jest');

      // No body in GET requests
      expect(request.getOptions()).toEqual({
        method: methodTypes.GET,
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
