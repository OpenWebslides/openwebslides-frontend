// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

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
      <ShareTab value={dummyValue} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the copy button with the passed value`, (): void => {
    const enzymeWrapper = mount(
      <ShareTab value={dummyValue} />,
    );

    expect(enzymeWrapper.find('CopyButton')).toHaveLength(1);
    expect(enzymeWrapper.find('PureCopyButton').props().value).toStrictEqual(dummyValue);
  });

  it(`selects the input field when it is focused`, (): void => {
    const enzymeWrapper = mount(
      <ShareTab value={dummyValue} />,
    );

    enzymeWrapper.find('[data-test-id="share-tab-input"]').simulate('focus', { target: { select: dummySelect } });
    expect(dummySelect).toHaveBeenCalledTimes(1);
  });

});
