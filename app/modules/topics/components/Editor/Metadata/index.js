// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Button, Grid, Header, Popup, Icon } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import { type ModulesAction } from 'types/redux';
import { type DropdownValue } from 'types/forms';
import MetadataForm, { type MetadataFormValues } from 'forms/MetadataForm';

import actions from '../../../actions';
import * as m from '../../../model';
import ForkInfo from '../../ForkInfo';

type PassedProps = {|
  topic: m.Topic,
|};

type DispatchProps = {|
  onUpdate: (title: ?string, description: ?string, access: ?m.AccessType) => void,
|};

type Props = {| ...PassedProps, ...DispatchProps |};

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
    onUpdate(values.title, values.description, values.access);
    this.setState({ isEditing: false });
  };

  handleMetadataCancel = (): void => {
    this.setState({ isEditing: false });
  };

  render(): React.Node {
    const { topic } = this.props;
    const { isEditing } = this.state;

    // TODO: allow updating metadata and content independently
    if (isEditing && !topic.isDirty) {
      return (
        <Translation>
          {(t: TFunction): React.Node => (
            <MetadataForm
              onSubmit={this.handleMetadataSubmit}
              onCancel={this.handleMetadataCancel}
              title={topic.title}
              description={topic.description}
              access={topic.access}
              availableAccess={Object.keys(m.accessTypes).map(
                (g: string): DropdownValue => {
                  const accessType = m.accessTypes[g];

                  return { key: accessType, value: accessType, text: t(`topics:props.access.accessForType.${accessType}`) };
                },
              )}
              data-test-id="topic-metadata-metadata-form"
            />
          )}
        </Translation>
      );
    }
    else {
      return (
        <Translation>
          {(t: TFunction): React.Node => (
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
                    /* TODO: find a permanent fix for issue #218,
                       where a topic gets marked as clean, though only the metadata gets updated */
                    disabled={topic.isDirty}
                    onClick={this.edit}
                    data-test-id="topic-metadata-edit-button"
                  >
                    {t('common:button.edit')}
                  </Button>
                  <Header.Subheader>
                    {topic.description == null || topic.description === ''
                      ? <p data-test-id="topic-metadata-no-description"><em>{t('topics:props.noDescription')}</em></p>
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
                <Popup
                  inverted={true}
                  position="bottom center"
                  trigger={<strong><Icon name="lock" /> {t(`topics:props.access.accessForType.${topic.access}`)}</strong>}
                  content={t(`topics:props.access.accessDescriptionForType.${topic.access}`)}
                />
              </Grid.Column>
            </Grid>
          )}
        </Translation>
      );
    }
  }
}

const Metadata = connect(null, mapDispatchToProps)(PureMetadata);

export { PureMetadata };
export default Metadata;
