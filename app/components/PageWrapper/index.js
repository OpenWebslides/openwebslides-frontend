// @flow

import * as React from 'react';

import NavigationBar from './NavigationBar';

type PassedProps = {|
  children: React.Node,
  className?: string,
|};

type Props = {| ...PassedProps |};

const PurePageWrapper = (props: Props): React.Node => {
  const { children, className } = props;

  return (
    <div className={`page ${className || ''}`}>
      <div className="page__header">
        <NavigationBar />
      </div>
      <div className="page__main">
        {children}
      </div>
    </div>
  );
};

const PageWrapper = PurePageWrapper;

export { PurePageWrapper };
export default PageWrapper;
