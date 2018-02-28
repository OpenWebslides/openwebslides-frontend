// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import type { State } from 'types/state';
import type { Topic } from '../model';
import { getById } from '../selectors';

type PassedProps = {
  topicId: string,
};

type StateProps = {
  topic: Topic,
};

type Props = TranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    topic: getById(state, props.topicId),
  };
};

const Preview = (props: Props): React.Node => {
  const { t, topic } = props;

  return (
    <section>
      <header>
        <h1>{topic.title}</h1>
      </header>
      {(topic.description != null) && (
        <div>
          <dl>
            <div>
              <dt>{t('model:topic.id')}</dt>
              <dd>{topic.id}</dd>
            </div>
            {(topic.description !== '') && (
              <div>
                <dt>{t('model:topic.description')}</dt>
                <dd>{topic.description}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </section>
  );
};

export default connect(mapStateToProps)(translate()(Preview));
