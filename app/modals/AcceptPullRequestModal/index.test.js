// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyTopicData } from 'lib/testResources';
import topics from 'modules/topics';

import AcceptPullRequestModal, { PureAcceptPullRequestModal } from '.';

describe(`AcceptPullRequestModal`, (): void => {

  let dummyFeedback: string;
  let dummySource: topics.model.Topic;
  let dummyTarget: topics.model.Topic;
  let dummyOnSubmit: any;
  let dummyOnCancel: any;

  beforeEach((): void => {
    dummyFeedback = 'dummyFeedback';
    dummySource = dummyTopicData.topic;
    dummyTarget = dummyTopicData.topic;
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAcceptPullRequestModal
        source={dummySource}
        target={dummyTarget}
        isOpen={true}
        onSubmit={dummyOnSubmit}
        onCancel={dummyOnCancel}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the modal form and submit/cancel buttons, when the passed isOpen prop is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AcceptPullRequestModal
          isOpen={true}
          source={dummySource}
          target={dummyTarget}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureFeedbackForm')).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="accept-pull-request-modal-submit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="accept-pull-request-modal-cancel-button"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the modal form and submit/cancel buttons, when the passed isOpen prop is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AcceptPullRequestModal
          isOpen={false}
          source={dummySource}
          target={dummyTarget}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureFeedbackForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="PullRequest-modal-submit-button"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="PullRequest-modal-cancel-button"]').hostNodes()).toHaveLength(0);
  });

  it(`calls the passed onSubmit callback when the submit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AcceptPullRequestModal
          isOpen={true}
          source={dummySource}
          target={dummyTarget}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="accept-pull-request-modal-submit-button"]').hostNodes().simulate('click');

    enzymeWrapper.find('PureFeedbackForm').props().onSubmit({ feedback: dummyFeedback });
    // Enzyme does not support event propagation yet, so we cannot test out the onSubmit callback by triggering the submit button
    // https://github.com/airbnb/enzyme/issues/308
    expect(dummyOnSubmit).toHaveBeenCalledTimes(1);
    expect(dummyOnCancel).not.toHaveBeenCalledWith(dummyFeedback);
  });

  it(`calls the passed onCancel callback when the cancel button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AcceptPullRequestModal
          isOpen={true}
          source={dummySource}
          target={dummyTarget}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="accept-pull-request-modal-cancel-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalled();
    expect(dummyOnCancel).toHaveBeenCalledTimes(1);
  });

});
