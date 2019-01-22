// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';

import MetadataForm from 'forms/MetadataForm';

type PassedProps = {|
  onSubmit: () => void,
  onCancel: () => void,
  title: string,
  description: ?string,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureMetadata = (props: Props): React.Node => {
  const { t, onSubmit, onCancel, title, description } = props;

  return (
    <Grid verticalAlign="middle">
      <Grid.Column width={13}>
        <MetadataForm
          onSubmit={onSubmit}
          title={title}
          description={description}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <Button
          type="submit"
          form="metadata-form"
          basic={true}
          compact={true}
          data-test-id="metadata-submit-button"
        >
          {t('common:button.save')}
        </Button>
        &nbsp; {t('common:or')} &nbsp;
        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
        <a
          href="#"
          onClick={onCancel}
          data-test-id="metadata-cancel-button"
        >
          {t('common:button.cancel').toLowerCase()}
        </a>
      </Grid.Column>
    </Grid>
  );
};

const Metadata = withNamespaces()(PureMetadata);

export { PureMetadata };
export default Metadata;
