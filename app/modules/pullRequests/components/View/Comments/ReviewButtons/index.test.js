// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import ReviewButtons, { PureReviewButtons } from '.';

describe(`ReviewButtons`, (): void => {

  let dummyOnAccept: any;
  let dummyOnReject: any;

  beforeEach((): void => {
    dummyOnAccept = jest.fn();
    dummyOnReject = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureReviewButtons onAccept={dummyOnAccept} onReject={dummyOnReject} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders accept and reject buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ReviewButtons onAccept={dummyOnAccept} onReject={dummyOnReject} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="review-buttons-reject-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="review-buttons-accept-button"]').hostNodes()).toHaveLength(1);
  });

});
