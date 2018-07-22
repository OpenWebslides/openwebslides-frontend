// @flow

import * as React from 'react';

import NavigationBar from './helpers/NavigationBar';

type PassedProps = {|
  children: React.Node,
  className?: string,
|};

type Props = {| ...PassedProps |};

const PurePage = (props: Props): React.Node => {
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

const Page = PurePage;

export { PurePage };
export default Page;
