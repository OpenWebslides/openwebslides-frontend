// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, Prompt } from 'react-router-dom';
import { type Dispatch } from 'redux';
import { Button, Header, Icon, Grid } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import { USER_PROFILE_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  topicId: string,
|};

type DispatchProps = {|
  onSave: () => void,
  setDirty: (dirty: boolean) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

const { EditableDisplay: ContentItemEditableDisplay } = contentItems.components;

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
      dispatch(actions.setDirtyInState(topicId, dirty));
    },
  };
};

class PureEditor extends React.Component<Props> {
  handleSaveButtonClick = (): void => {
    const { onSave } = this.props;
    onSave();
  };

  fetchCondition = (topic: ?m.Topic): boolean => {
    return (topic == null || !topic.isContentFetched);
  };

  renderEditor = (topic: m.Topic): React.Node => {
    const { t, setDirty } = this.props;

    return (
      <div data-test-id="topic-editor">
        {/* Prompt when user navigates away from the page with unsaved changes */}
        {/* TODO: actually discard the changes when the user wants to leave */}
        <Prompt
          when={topic.isDirty}
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
              <Header floated="left" as="h1">{topic.title}</Header>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button
                floated="right"
                disabled={!topic.isDirty}
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
          setTopicDirty={setDirty}
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

const Editor = connect(null, mapDispatchToProps)(withNamespaces()(PureEditor));

export { PureEditor };
export default Editor;
