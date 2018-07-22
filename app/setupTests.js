// @flow
/* eslint-disable import/no-extraneous-dependencies */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Create Enzyme adapter.
configure({ adapter: new Adapter() });

// Mock fetch API
global.fetch = require('jest-fetch-mock');
