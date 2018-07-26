// @flow

import { InvalidArgumentError } from 'errors';

import makeRoute from '.';

describe(`makeRoute`, (): void => {

  it(`replaces parameter strings in the passed route with the values from the passed parameter object`, (): void => {
    const dummyRoute = '/dummy/:firstparam/route/:secondparam';
    const dummyValues = { firstparam: 'lorem', secondparam: 'ipsum' };
    expect(makeRoute(dummyRoute, dummyValues)).toBe('/dummy/lorem/route/ipsum');
  });

  it(`returns the route unchanged, when no parameters are passed`, (): void => {
    const dummyRoute = '/dummy/:firstparam/route/:secondparam';
    expect(makeRoute(dummyRoute, {})).toBe(dummyRoute);
  });

  it(`throws an InvalidArgumentError, when one of the passed params are not present in the passed route`, (): void => {
    const dummyRoute = '/dummy/:firstparam/route/:secondparam';
    const dummyValues = { firstparam: 'lorem', secondparam: 'ipsum', invalidparam: 'test' };
    expect((): void => {
      makeRoute(dummyRoute, dummyValues);
    }).toThrow(InvalidArgumentError);
  });

});
