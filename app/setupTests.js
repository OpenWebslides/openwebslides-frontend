// @flow

/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
/* eslint-enable */

// Create Enzyme adapter.
configure({ adapter: new Adapter() });
