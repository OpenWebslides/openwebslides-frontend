// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import MarkdownToolbar, { PureMarkdownToolbar } from '.';

describe(`Toolbar`, (): void => {

  let dummyOnIndent: any;
  let dummyOnUnindent: any;

  beforeEach((): void => {
    dummyOnIndent = jest.fn();
    dummyOnUnindent = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureMarkdownToolbar
        onIndent={dummyOnIndent}
        onUnindent={dummyOnUnindent}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`calls the passed onIndent function when the INDENT button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <MarkdownToolbar
          onIndent={dummyOnIndent}
          onUnindent={dummyOnUnindent}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="markdown-toolbar-indent-button"]').hostNodes().simulate('click');
    expect(dummyOnIndent).toHaveBeenCalledTimes(1);
  });

  it(`calls the passed onUnindent function when the UNINDENT button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <MarkdownToolbar
          onIndent={dummyOnIndent}
          onUnindent={dummyOnUnindent}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="markdown-toolbar-unindent-button"]').hostNodes().simulate('click');
    expect(dummyOnUnindent).toHaveBeenCalledTimes(1);
  });

});
