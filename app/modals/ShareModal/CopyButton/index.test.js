// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import copy from 'copy-to-clipboard';

import { dummyProviderProps, DummyProviders } from 'lib/testResources';

import CopyButton, { PureCopyButton } from '.';

describe(`CopyButton`, (): void => {

  let dummyValue: string;
  let dummyCopy: any;

  beforeEach((): void => {
    dummyValue = 'dummyValue';
    dummyCopy = jest.fn();

    jest.mock('copy-to-clipboard', () => dummyCopy);
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureCopyButton {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the copy button`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <CopyButton value={dummyValue} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="copy-button"]')).toHaveLength(1);
  });

  it(`calls the copy function with the passed value when the copy button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <CopyButton value={dummyValue} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="copy-button"]').hostNodes().simulate('click');
    expect(dummyCopy).toHaveBeenCalledWith(dummyValue);
  });

});
