// @flow
/* eslint-disable import/no-extraneous-dependencies */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Create Enzyme adapter.
configure({ adapter: new Adapter() });

// Mock fetch API
global.fetch = require('jest-fetch-mock');

/* commenting this out because it's not clear what the use is #TODO
// Mock localStorage
const localStorageMock = (): * => {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string): string {
      return store[key];
    },
    setItem(key: string, value: string): void {
      store[key] = value.toString();
    },
    clear(): void {
      store = {};
    },
    removeItem(key: string): void {
      delete store[key];
    },
  };
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });
*/
