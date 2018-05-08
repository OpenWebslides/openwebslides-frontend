// @flow
/**
 * An error caused by a developer passing an invalid argument to a function.
 */

import ImplementationError from '../ImplementationError';

class InvalidArgumentError extends ImplementationError {}

export default InvalidArgumentError;
