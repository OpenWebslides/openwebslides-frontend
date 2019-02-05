// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Button, Grid, Header } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import MetadataForm, { type MetadataFormValues } from 'forms/MetadataForm';
import { type AccessLevelFormValues } from 'forms/AccessLevelForm';

import actions from '../../../actions';
import * as m from '../../../model';
import ForkInfo from '../../ForkInfo';
import AccessControl from '../AccessControl';

type PassedProps = {|
  topic: m.Topic,
|};

type DispatchProps = {|
  onUpdate: (title: ?string, description: ?string, access: ?m.AccessType) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

type ComponentState = {|
  isEditing: boolean,
|};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { topic } = props;

  return {
    onUpdate: (title: ?string, description: ?string, access: ?m.AccessType): void => {
      dispatch(actions.update(topic.id, title, description, access));
    },
  };
};

class PureMetadata extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    isEditing: false,
  };

  edit = (): void => {
    this.setState({ isEditing: true });
  };

  handleMetadataSubmit = (values: MetadataFormValues): void => {
    const { onUpdate } = this.props;
    onUpdate(values.title, values.description, undefined);
    this.setState({ isEditing: false });
  };

  handleMetadataCancel = (): void => {
    this.setState({ isEditing: false });
  };

  handleAccessLevelSubmit = (values: AccessLevelFormValues): void => {
    const { onUpdate } = this.props;
    onUpdate(undefined, undefined, values.access);
  };

  render(): React.Node {
    const { t, topic } = this.props;
    const { isEditing } = this.state;

    if (isEditing) {
      return (
        <Grid verticalAlign="middle">
          <Grid.Column width={12}>
            <MetadataForm
              onSubmit={this.handleMetadataSubmit}
              title={topic.title}
              description={topic.description}
              data-test-id="topic-metadata-metadata-form"
            />
          </Grid.Column>
          <Grid.Column width={4} style={{ whiteSpace: 'nowrap' }}>
            <Button
              type="submit"
              form="metadata-form"
              basic={true}
              compact={true}
              data-test-id="topic-metadata-submit-button"
            >
              {t('common:button.save')}
            </Button>
            &nbsp; {t('common:or')} &nbsp;
            <Button
              className="link"
              onClick={this.handleMetadataCancel}
              data-test-id="topic-metadata-cancel-button"
            >
              {t('common:button.cancel').toLowerCase()}
            </Button>
          </Grid.Column>
        </Grid>
      );
    }
    else {
      return (
        <Grid>
          <Grid.Column width={13}>
            <Header as="h1" style={{ display: 'inline-block' }}>
              <span data-test-id="topic-metadata-title">
                {topic.title}
                {(topic.isDirty ? '*' : '')}
              </span>
              <Button
                basic={true}
                size="tiny"
                compact={true}
                style={{ margin: '.5em 1em', float: 'right' }}
                onClick={this.edit}
                data-test-id="topic-metadata-edit-button"
              >
                {t('common:button.edit')}
              </Button>
              <Header.Subheader>
                {topic.description == null ? (
                  <p data-test-id="topic-metadata-no-description"><em>{t('topics:props.noDescription')}</em></p>
                )
                  : <p data-test-id="topic-metadata-description">{topic.description}</p>
                }
                {(topic.upstreamTopicId !== null
                  ? (
                    <small>
                      <ForkInfo upstreamTopicId={topic.upstreamTopicId} />
                    </small>
                  ) : null)}
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column width={3} textAlign="right" verticalAlign="middle">
            <AccessControl
              onSubmit={this.handleAccessLevelSubmit}
              access={topic.access}
            />
          </Grid.Column>
        </Grid>
      );
    }
  }
}

const Metadata = connect(null, mapDispatchToProps)(withNamespaces()(PureMetadata));

export { PureMetadata };
export default Metadata;
