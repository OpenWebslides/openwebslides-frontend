// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { Topic } from '../model';
import { getById } from '../selectors';

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  topic: Topic,
};

type Props = TranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const topic = getById(state, { id: props.topicId });

  if (topic == null) {
    throw new Error(`Topic with id "${props.topicId}" could not be found.`);
  }

  return {
    topic,
  };
};

const PurePreview = (props: Props): React.Node => {
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

const Preview = connect(mapStateToProps)(translate()(PurePreview));

export { PurePreview };
export default Preview;
