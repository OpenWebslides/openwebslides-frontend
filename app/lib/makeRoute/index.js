// @flow

/**
 * Takes a route string and parameter key => value mapping, and returns the route with the params
 * merged into it.
 */

import _ from 'lodash';

import { InvalidArgumentError } from 'errors';
import { APP_URL } from 'config/url';

const makeRoute = (
  route: string,
  params: { [name: string]: string },
  qualified: boolean = false,
): string => {
  let mergedRoute: string = route;
  let paramKey: string;

  _.keys(params).forEach((key: string): void => {
    paramKey = `:${key}`;
    if (!route.includes(paramKey)) throw new InvalidArgumentError(`No param of that name found in the route`);
    mergedRoute = mergedRoute.replace(paramKey, params[key]);
  });

  if (qualified === true) {
    mergedRoute = `${APP_URL}${mergedRoute}`;
  }

  return mergedRoute;
};

export default makeRoute;
