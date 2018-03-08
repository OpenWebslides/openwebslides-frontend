// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

type Props = TranslatorProps;

const Editor = (props: Props): React.Node => {
  const { t } = props;

  return (
    <div>
      <p>{t('common:lipsum.long')}</p>
    </div>
  );
};

export { Editor as PureEditor };
export default translate()(Editor);
