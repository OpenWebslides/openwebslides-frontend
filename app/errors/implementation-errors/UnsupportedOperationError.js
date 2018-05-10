// @flow
/**
 * An error caused by a developer attempting to use functionality in a way that was not intended.
 */

import ImplementationError from '../ImplementationError';

class UnsupportedOperationError extends ImplementationError {}

export default UnsupportedOperationError;
