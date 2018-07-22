// @flow

import * as React from 'react';
import { render, shallow } from 'enzyme';

import { PureInlineMarkdown } from '..';

describe(`InlineMarkdown`, (): void => {

  const dummyText = 'Lorem *ipsum* [dolor](https://google.be) `sit` **amet**, consectetur *adipiscing* [elit](https://wikipedia.org). Ut `interdum` est et nibh **venenatis**.';
  const dummyTextPlain = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum est et nibh venenatis.';
  const dummyTextEm = ['ipsum', 'adipiscing'];
  const dummyTextStrong = ['amet', 'venenatis'];
  const dummyTextCode = ['sit', 'interdum'];
  const dummyTextAnchor = ['dolor', 'elit'];

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureInlineMarkdown
        text={dummyText}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders an element with class 'inline-markdown'`, (): void => {
    const enzymeWrapper = render(
      <PureInlineMarkdown
        text={dummyText}
      />,
    );
    expect(enzymeWrapper.hasClass('inline-markdown')).toEqual(true);
  });

  it(`renders only inline HTML elements`, (): void => {
    const enzymeWrapper = render(
      <PureInlineMarkdown
        text={dummyText}
      />,
    );
    const whitelist = 'span, em, strong, code, a';
    expect(enzymeWrapper.not(whitelist)).toHaveLength(0);
    expect(enzymeWrapper.children().not(whitelist)).toHaveLength(0);
  });

  it(`converts its text prop to text without markdown syntax`, (): void => {
    const enzymeWrapper = render(
      <PureInlineMarkdown
        text={dummyText}
      />,
    );
    expect(enzymeWrapper.text()).toEqual(dummyTextPlain);
  });

  it(`converts text surrounded by single asterisks to em tags`, (): void => {
    const enzymeWrapper = render(
      <PureInlineMarkdown
        text={dummyText}
      />,
    );
    const emElements = enzymeWrapper.children().filter('em');

    expect(emElements).toHaveLength(dummyTextEm.length);

    for (let i: number = 0; i < emElements.length; i += 1) {
      expect(emElements.eq(i).text()).toEqual(dummyTextEm[i]);
    }
  });

  it(`converts text surrounded by double asterisks to strong tags`, (): void => {
    const enzymeWrapper = render(
      <PureInlineMarkdown
        text={dummyText}
      />,
    );
    const strongElements = enzymeWrapper.children().filter('strong');

    expect(strongElements).toHaveLength(dummyTextStrong.length);

    for (let i: number = 0; i < strongElements.length; i += 1) {
      expect(strongElements.eq(i).text()).toEqual(dummyTextStrong[i]);
    }
  });

  it(`converts text surrounded by backticks to code tags`, (): void => {
    const enzymeWrapper = render(
      <PureInlineMarkdown
        text={dummyText}
      />,
    );
    const codeElements = enzymeWrapper.children().filter('code');

    expect(codeElements).toHaveLength(dummyTextCode.length);

    for (let i: number = 0; i < codeElements.length; i += 1) {
      expect(codeElements.eq(i).text()).toEqual(dummyTextCode[i]);
    }
  });

  it(`converts text surrounded by square brackets and followed by an url between round brackets to anchor tags`, (): void => {
    const enzymeWrapper = render(
      <PureInlineMarkdown
        text={dummyText}
      />,
    );
    const anchorElements = enzymeWrapper.children().filter('a');

    expect(anchorElements).toHaveLength(dummyTextAnchor.length);

    for (let i: number = 0; i < anchorElements.length; i += 1) {
      expect(anchorElements.eq(i).text()).toEqual(dummyTextAnchor[i]);
    }
  });

});
