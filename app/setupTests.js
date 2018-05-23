// @flow

/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
/* eslint-enable */

// Create Enzyme adapter.
configure({ adapter: new Adapter() });

// Mock localStorage
// eslint-disable-next-line flowtype/no-weak-types
const localStorageMock = (): Object => {
// eslint-disable-next-line flowtype/no-weak-types
  let store: Object = {};
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

