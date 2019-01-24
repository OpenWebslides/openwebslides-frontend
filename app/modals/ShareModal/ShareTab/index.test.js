// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { dummyProviderProps, DummyProviders } from 'lib/testResources';

import ShareTab from '.';

describe(`ShareTab`, (): void => {

  let dummyValue: string;
  let dummySelect: any;

  beforeEach((): void => {
    dummyValue = 'dummyValue';
    dummySelect = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <ShareTab value={dummyValue} {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the copy button with the passed value`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareTab value={dummyValue} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureCopyButton')).toHaveLength(1);
    expect(enzymeWrapper.find('PureCopyButton').props().value).toStrictEqual(dummyValue);
  });

  it(`selects the input field when it is focused`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareTab value={dummyValue} />
      </DummyProviders>,
    );

    // Enzyme does not support event propagation yet, so we cannot test out
    // the onFocus callback by simulating the focus event
    enzymeWrapper.find('[data-test-id="share-tab-input"] input').props().onFocus({ target: { select: dummySelect } });
    expect(dummySelect).toHaveBeenCalledTimes(1);
  });

});
