// @flow

/* eslint-disable import/no-extraneous-dependencies */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactI18next from 'react-i18next';

// Create Enzyme adapter
configure({ adapter: new Adapter() });

// Mock fetch API
global.fetch = require('jest-fetch-mock');

// Mock react-i18next useTranslation() hook so that shallow rendering doesn't throw a warning
jest.doMock('react-i18next', (): mixed => ({
  ...reactI18next,
  useTranslation: (): $ReadOnlyArray<mixed> => ([
    (key: string): string => key,
    { languages: [] },
  ]),
}));
