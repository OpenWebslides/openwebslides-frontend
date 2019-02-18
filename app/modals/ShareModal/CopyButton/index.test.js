// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import copy from 'copy-to-clipboard';

import { DummyProviders } from 'lib/testResources';

import CopyButton, { PureCopyButton } from '.';

jest.mock('copy-to-clipboard');

describe(`CopyButton`, (): void => {

  let dummyValue: string;
  let dummyCopy: any;

  beforeEach((): void => {
    dummyValue = 'dummyValue';

    dummyCopy = jest.fn();
    (copy: any).mockImplementation(dummyCopy);
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureCopyButton />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the copy button`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <CopyButton value={dummyValue} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="copy-button"]')).not.toHaveLength(0);
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
