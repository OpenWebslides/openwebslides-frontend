// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, Prompt } from 'react-router-dom';
import { type Dispatch } from 'redux';
import { Button, Header, Icon, Grid } from 'semantic-ui-react';

import { type AppState, type ModulesAction } from 'types/redux';
import { USER_PROFILE_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  topicId: string,
|};

type StateProps = {|
  topic: ?m.Topic,
|};

type DispatchProps = {|
  onSave: () => void,
  setDirty: (dirty: boolean) => void,
  discard: () => void,
  beforeUnloadHandler: () => boolean,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const { EditableDisplay: ContentItemEditableDisplay } = contentItems.components;

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { topicId } = props;

  return {
    topic: selectors.getById(state, { id: topicId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { topicId } = props;

  return {
    onSave: (): void => {
      dispatch(actions.patchWithContent(topicId));
    },
    setDirty: (dirty: boolean): void => {
      // TODO: execute this piece of code based on topic's root content item dirtiness
      // Catch window refresh events with a prompt when topic is dirty
      window.onbeforeunload = dirty ? () => true : null;
    },
    discard: (): void => {
      dispatch(actions.discard(topicId));
    },
    beforeUnloadHandler: () => true,
  };
};

class PureEditor extends React.Component<Props> {
  handleSaveButtonClick = (): void => {
    const { onSave } = this.props;
    onSave();
  };

  componentWillUnmount = (): void => {
    const { topic, discard } = this.props;

    if (topic.isDirty) discard(topic.id);
  };

  fetchCondition = (topic: ?m.Topic): boolean => {
    return (topic == null || !topic.isContentFetched);
  };

  renderEditor = (topic: m.Topic): React.Node => {
    const { t } = this.props;

    return (
      <div data-test-id="topic-editor">
        {/* Prompt when user navigates away from the page with unsaved changes */}
        {/* TODO: actually discard the changes when the user wants to leave */}
        {/* TODO: show this when topic's root content item is dirty */}
        <Prompt
          when={false}
          message={t('topics:modals.unsavedChanges.message')}
        />

        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column width={1}>
              <Button
                circular={true}
                basic={true}
                floated="left"
                icon={true}
                data-test-id="topic-editor-back-button"
                as={Link}
                to={USER_PROFILE_ROUTE}
              >
                <Icon name="arrow left" />
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Header floated="left" as="h1" data-test-id="topic-editor-title">
                {topic.title}
                {/* TODO: show asterisk when topic root content item is dirty */}
                {(false ? '*' : '')}
              </Header>
            </Grid.Column>
            <Grid.Column width={2}>
              {/* TODO: enable button when topic is dirty */}
              <Button
                floated="right"
                disabled={!false}
                primary={true}
                icon={true}
                labelPosition="left"
                onClick={this.handleSaveButtonClick}
                data-test-id="topic-editor-save-button"
              >
                <Icon name="save" />
                {t('common:button.save')}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <ContentItemEditableDisplay
          contentItemId={topic.rootContentItemId}
        />
      </div>
    );
  };

  render(): React.Node {
    const { topicId } = this.props;

    return (
      <FetchWrapper
        render={this.renderEditor}
        renderPropsAndState={this.props}
        fetchId={topicId}
        fetchAction={actions.fetchWithContent}
        fetchedPropSelector={selectors.getById}
        fetchCondition={this.fetchCondition}
      />
    );
  }
}

const Editor = connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(PureEditor));

export { PureEditor };
export default Editor;
