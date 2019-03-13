// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import CommitModal, { PureCommitModal } from '.';

describe(`CommitModal`, (): void => {

  let dummyOnSubmit: any;
  let dummyOnCancel: any;

  beforeEach((): void => {
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureCommitModal
        isOpen={true}
        onSubmit={dummyOnSubmit}
        onCancel={dummyOnCancel}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the commit modal form and submit/cancel buttons, when the passed isOpen prop is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <CommitModal
          isOpen={true}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureCommitForm')).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="commit-modal-submit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="commit-modal-cancel-button"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the commit modal form and submit/cancel buttons, when the passed isOpen prop is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <CommitModal
          isOpen={false}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureCommitForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="commit-modal-submit-button"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="commit-modal-cancel-button"]').hostNodes()).toHaveLength(0);
  });

  it(`calls the passed onSubmit callback when the submit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <CommitModal
          isOpen={true}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="commit-modal-submit-button"]').hostNodes().simulate('click');

    enzymeWrapper.find('PureCommitForm').props().onSubmit();
    // Enzyme does not support event propagation yet, so we cannot test out the onSubmit callback by triggering the submit button
    // https://github.com/airbnb/enzyme/issues/308
    expect(dummyOnSubmit).toHaveBeenCalledTimes(1);

    expect(dummyOnCancel).not.toHaveBeenCalled();
  });

  it(`calls the passed onCancel callback when the cancel button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <CommitModal
          isOpen={true}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="commit-modal-cancel-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalled();
    expect(dummyOnCancel).toHaveBeenCalledTimes(1);
  });

});
