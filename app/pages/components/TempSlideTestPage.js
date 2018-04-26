// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

// import Color, { TwitterPicker } from 'react-color';
import type { CustomTranslatorProps } from 'types/translator';

import type { State } from 'types/state';
import contentItems, { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';
import Slide from 'core-components/slides/Slide';

// import VoicePlayerToggle from 'core-components/slides/VoicePlayerToggle';


import Page from '../Page';

type PassedProps = {};

type StateProps = {
  // Slide takes a denormalized root contentItem instead of a root contentItem id, because in a
  // later stage the contentItem tree passed to the slide needs to be transformed further
  // (for example, by splitting up sections and inserting repeated headers if a section is longer
  // than a single slide) and the contentItem tree can't just be extracted from the state directly.
  contentItemTreeRootItem: DenormalizedRootContentItem,
};

type Props = CustomTranslatorProps & StateProps & PassedProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const contentItemTreeRootItemId = 'qyrgv0bcd6'; // 'w4lg2u0p1h'; // #TODO stub
  const contentItemTreeRootItem = contentItems.selectors.getDenormalizedById(
    state,
    { id: contentItemTreeRootItemId },
  );

  if (contentItemTreeRootItem == null) {
    throw new Error(`ContentItem with id "${contentItemTreeRootItemId}" could not be found.`);
  }
  else if (contentItemTreeRootItem.type !== contentItemTypes.ROOT) {
    throw new Error('Not a ROOT contentItem.');
  }

  return {
    contentItemTreeRootItem,
  };
};

class PureTempSlideTestPage extends React.Component<Props, State> {
  constructor(props: Props): void {
    super(props);
    this.slideRef = React.createRef();
  }

  componentDidMount = (): void => {
    this.render();
    console.log(this.slideRef.current);
  };

  handleClick = (): void => {
    console.log(this.slideRef.current.innerText);
  };

  render = (): React.Node => {
    const { contentItemTreeRootItem } = this.props;

    return (
      <Page>
        <div ref={this.slideRef}>
          <Slide contentItemTreeRootItem={contentItemTreeRootItem} />
        </div>
        <button onClick={this.handleClick}>click</button>
      </Page>
    );
    /* <VoicePlayerToggle /> */
  }
}

const TempSlideTestPage = connect(mapStateToProps)(translate()(PureTempSlideTestPage));

export { PureTempSlideTestPage };
export default TempSlideTestPage;
