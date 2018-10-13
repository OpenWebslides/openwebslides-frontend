// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Switch, Route } from 'react-router-dom';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import ConditionalWrapper, { PureConditionalWrapper } from '.';

describe(`ConditionalWrapper`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureConditionalWrapper {...dummyProviderProps.routerProps} renderChildren={true}>
        <p>Secure text</p>
      </PureConditionalWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders its children, when renderChildren is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ConditionalWrapper renderChildren={true}>
          <p>Secure text</p>
          <p>More secure text</p>
        </ConditionalWrapper>
      </DummyProviders>,
    );
    const conditionalWrapperChildren = enzymeWrapper.find('PureConditionalWrapper').children();

    expect(conditionalWrapperChildren).toHaveLength(2);
    expect(conditionalWrapperChildren.at(0).text()).toBe('Secure text');
    expect(conditionalWrapperChildren.at(1).text()).toBe('More secure text');
  });

  it(`does not render its children, when renderChildren is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ConditionalWrapper renderChildren={false}>
          <p>Secure text</p>
          <p>More secure text</p>
        </ConditionalWrapper>
      </DummyProviders>,
    );
    const conditionalWrapperChildren = enzymeWrapper.find('PureConditionalWrapper').children();

    expect(conditionalWrapperChildren).toHaveLength(0);
  });

  it(`renders the passed componentIfNotChildren, when renderChildren is FALSE and a componentIfNotChildren is passed`, (): void => {
    const DummyConditionalComponent = (): React.Node => <p>Access denied</p>;

    const enzymeWrapper = mount(
      <DummyProviders dummyRouterEntries={['/test']}>
        <ConditionalWrapper renderChildren={false} componentIfNotChildren={DummyConditionalComponent}>
          <p>Secure text</p>
          <p>More secure text</p>
        </ConditionalWrapper>
      </DummyProviders>,
    );
    const conditionalWrapperChildren = enzymeWrapper.find('PureConditionalWrapper').children();

    expect(conditionalWrapperChildren).toHaveLength(1);
    expect(conditionalWrapperChildren.text()).toContain('Access denied');
    expect(conditionalWrapperChildren.text()).not.toContain('Secure text');
  });

  it(`redirects the user to the passed redirectIfNotChildren path, when renderChildren is FALSE and a redirectIfNotChildren path is passed`, (): void => {
    const ConditionalWrapperComponent = (): React.Node => (
      <ConditionalWrapper {...dummyProviderProps.routerProps} renderChildren={false} redirectIfNotChildren="/dummyUrl">
        <p>Secure text</p>
      </ConditionalWrapper>
    );

    const enzymeWrapper = mount(
      <DummyProviders dummyRouterEntries={['/test']}>
        <Switch>
          <Route path="/test" exact={true} component={ConditionalWrapperComponent} />
          <Route path="/dummyUrl" component={(): React.Node => (<p>Access denied</p>)} />
        </Switch>
      </DummyProviders>,
    );

    expect(enzymeWrapper.text()).toContain('Access denied');
    expect(enzymeWrapper.text()).not.toContain('Secure text');
  });

});
