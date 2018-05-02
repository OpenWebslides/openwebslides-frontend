// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Checkbox, Segment } from 'semantic-ui-react';

// import Color, { TwitterPicker } from 'react-color';
import type { CustomTranslatorProps } from 'types/translator';

import type { State } from 'types/state';
import contentItems, { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';
import Slide from 'core-components/slides/Slide';

import VoicePlayerToggle from 'core-components/slides/VoicePlayerToggle';


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

type ComponentState = {
  contentToBeRead: string,
  toggle: boolean,
};

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

class PureTempSlideTestPage extends React.Component<Props, ComponentState> {
  constructor(props: Props): void {
    super(props);
    this.slideRef = React.createRef();
  }

  state: ComponentState = {
    contentToBeRead: '',
    toggle: false,
  };


  componentDidMount = (): void => {
    // console.log(`initieel ${this.state.toggle}`);
  };
  slideRef;

  toggleRead = (): void => {
    if (this.state.toggle) {
      this.setState({ toggle: false });
    }
    else {
      // const contentBlocks: [] =
      // this.slideRef.current.getElementsByClassName('ows_container--heading');

      /* const currentHeader: string = this.state.lastReadTitle;
      let text: string = '';
      // Look if the header is different */
      /* for (let i: number = 0; i < contentBlocks.length; i += 1) {
      // hieruit header halen en tekst
        if (contentBlocks[i].classList.contains('ows_heading')
        && this.state.lastReadTitle !== contentBlocks[i].innerText) {
          console.log(`header, ${contentBlocks[i].innerText}`);
          this.state.lastReadTitle = contentBlocks[i].innerText;
          text += contentBlocks[i].innerText;
        }
        console.log(contentBlocks[i]);
      } */
      // $FlowFixMe
      this.setState(
        { toggle: true,
          // $FlowFixMe
          contentToBeRead: this.slideRef.current.innerText,
        },
      );
    }
  };

  render = (): React.Node => {
    const { contentItemTreeRootItem } = this.props;

    let VoicePlayerToggleNode: typeof VoicePlayerToggle;
    if (this.state.toggle) {
      VoicePlayerToggleNode = (
        <VoicePlayerToggle
          content={this.state.contentToBeRead}
        />);
    }
    else {
      // $FlowFixMe
      VoicePlayerToggleNode = null;
    }
    return (
      <Page>
        <div ref={this.slideRef}>
          <Slide contentItemTreeRootItem={contentItemTreeRootItem} />
        </div>
        <div className="Voice">
          {VoicePlayerToggleNode}
          <Segment compact={true}>
            <Checkbox slider={true} onClick={this.toggleRead} checked={this.state.toggle} />
          </Segment>
        </div>
      </Page>
    );
  }
}

const TempSlideTestPage = connect(mapStateToProps)(translate()(PureTempSlideTestPage));

export { PureTempSlideTestPage };
export default TempSlideTestPage;
