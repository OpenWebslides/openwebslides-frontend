// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { dummyProviderProps, DummyProviders } from 'lib/testResources';

import Metadata, { PureMetadata } from '.';

describe(`Metadata`, (): void => {

  let dummyOnSubmit: any;
  let dummyOnCancel: any;
  let dummyTitle: string;
  let dummyDescription: string;

  beforeEach((): void => {
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
    dummyTitle = 'dummyTitle';
    dummyDescription = 'dummyDescription';
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureMetadata {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`calls the passed onSubmit callback when the submit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <Metadata
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
          title={dummyTitle}
          description={dummyDescription}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="metadata-submit-button"]').hostNodes().simulate('click');

    enzymeWrapper.find('PureMetadataForm').props().onSubmit();
    // Enzyme does not support event propagation yet, so we cannot test out the onSubmit callback by triggering the submit button
    // https://github.com/airbnb/enzyme/issues/308
    expect(dummyOnSubmit).toHaveBeenCalledTimes(1);
    expect(dummyOnCancel).not.toHaveBeenCalled();
  });

  it(`calls the passed onCancel callback when the cancel button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <Metadata
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
          title={dummyTitle}
          description={dummyDescription}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="metadata-cancel-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalled();
    expect(dummyOnCancel).toHaveBeenCalledTimes(1);
  });

});
