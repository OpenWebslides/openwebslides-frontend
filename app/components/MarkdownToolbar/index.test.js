// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import MarkdownToolbar, { PureMarkdownToolbar } from '.';

describe(`Toolbar`, (): void => {

  let dummyContentItemId: string;

  let dummyOnIndent: any;
  let dummyOnUnindent: any;

  beforeEach((): void => {
    dummyContentItemId = 'dummyContentItemId';

    dummyOnIndent = jest.fn();
    dummyOnUnindent = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureMarkdownToolbar
        contentItemId={dummyContentItemId}
        onIndent={dummyOnIndent}
        onUnindent={dummyOnUnindent}
        canIndent={true}
        canUnindent={true}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`calls the passed onIndent function when the INDENT button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PureMarkdownToolbar
          contentItemId={dummyContentItemId}
          onIndent={dummyOnIndent}
          onUnindent={dummyOnUnindent}
          canIndent={true}
          canUnindent={true}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="markdown-toolbar-indent-button"]').hostNodes().simulate('click');
    expect(dummyOnIndent).toHaveBeenCalledTimes(1);
  });

  it(`calls the passed onUnindent function when the UNINDENT button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PureMarkdownToolbar
          contentItemId={dummyContentItemId}
          onIndent={dummyOnIndent}
          onUnindent={dummyOnUnindent}
          canIndent={true}
          canUnindent={true}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="markdown-toolbar-unindent-button"]').hostNodes().simulate('click');
    expect(dummyOnUnindent).toHaveBeenCalledTimes(1);
  });

  it(`disables the INDENT button when the contentItem cannot be indented`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <MarkdownToolbar
          contentItemId={dummyContentItemId}
          onIndent={dummyOnIndent}
          onUnindent={dummyOnUnindent}
          canIndent={false}
          canUnindent={true}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="markdown-toolbar-indent-button"][disabled]').hostNodes()).toHaveLength(1);
  });

  it(`disables the UNINDENT button when the contentItem cannot be unindented`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <MarkdownToolbar
          contentItemId={dummyContentItemId}
          onIndent={dummyOnIndent}
          onUnindent={dummyOnUnindent}
          canIndent={true}
          canUnindent={false}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="markdown-toolbar-unindent-button"][disabled]').hostNodes()).toHaveLength(1);
  });

});
