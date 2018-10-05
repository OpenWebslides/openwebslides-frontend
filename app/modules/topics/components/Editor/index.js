// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { type Dispatch } from 'redux';
import { Button, Header, Icon } from 'semantic-ui-react';

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
    const { t } = this.props;

    return (
      <div data-test-id="topic-editor">
        <div style={{ overflow: 'hidden' }}>
          <Header floated="left" as="h1">{topic.title}</Header>
          <Button
            floated="right"
            primary={true}
            icon={true}
            labelPosition="left"
            onClick={this.handleSaveButtonClick}
            data-test-id="topic-editor-save-button"
          >
            <Icon name="save" />
            {t('common:button.save')}
          </Button>
          <Button
            floated="right"
            icon={true}
            labelPosition="left"
            data-test-id="topic-editor-cancel-button"
            as={Link}
            to={USER_PROFILE_ROUTE}
          >
            <Icon name="cancel" />
            {t('common:button.cancel')}
          </Button>
        </div>
        <ContentItemEditableDisplay contentItemId={topic.rootContentItemId} />
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

const Editor = connect(null, mapDispatchToProps)(translate()(PureEditor));

export { PureEditor };
export default Editor;
