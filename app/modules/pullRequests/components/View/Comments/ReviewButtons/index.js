// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Button } from 'semantic-ui-react';

type PassedProps = {|
  onAccept: () => void,
  onReject: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureReviewButtons = (props: Props): React.Node => {
  const { t, onAccept, onReject } = props;

  return (
    <Button.Group>
      <Button
        color="red"
        onClick={onReject}
        data-test-id="review-buttons-reject-button"
      >
        {t('pullRequests:button.reject')}
      </Button>
      <Button.Or />
      <Button
        type="submit"
        color="green"
        onClick={onAccept}
        data-test-id="review-buttons-accept-button"
      >
        {t('pullRequests:button.accept')}
      </Button>
    </Button.Group>
  );
};

const ReviewButtons = withNamespaces()(PureReviewButtons);

export { PureReviewButtons };
export default ReviewButtons;
