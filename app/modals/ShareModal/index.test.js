// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { dummyProviderProps, DummyProviders } from 'lib/testResources';

import ShareModal, { PureShareModal } from '.';

describe(`ShareModal`, (): void => {

  let dummyOnSubmit: any;
  let dummyOnCancel: any;

  beforeEach((): void => {
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureShareModal {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the tabs, when the passed isOpen prop is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={true} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="share-modal-tabs"]')).toHaveLength(1);
  });

  it(`does not render the tabs, when the passed isOpen prop is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={false} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="share-modal-tabs"]')).toHaveLength(0);
  });

  it(`calls the passed onCancel callback when the close button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={true} onSubmit={dummyOnSubmit} onCancel={dummyOnCancel} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="share-modal-close-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalled();
    expect(dummyOnCancel).toHaveBeenCalledTimes(1);
  });

});
