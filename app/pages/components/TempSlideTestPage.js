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
import slideStyling from 'modules/slide-styling';
import Slide from 'core-components/slides/Slide';
import authentication from 'modules/authentication';
import type { Identifier } from 'types/model';

import VoicePlayerToggle from 'core-components/slides/VoicePlayerToggle';
import { addToState } from 'modules/slide-styling/actions';
import { generateId } from 'modules/slide-styling//model';


import Page from '../Page';
import { getAllSlideStylingIdsByUserId, getById } from '../../modules/slide-styling/selectors';
import type { SlideStyling } from '../../modules/slide-styling/model';


const { getAccount } = authentication.selectors;

type PassedProps = {};

type StateProps = {
  // Slide takes a denormalized root contentItem instead of a root contentItem id, because in a
  // later stage the contentItem tree passed to the slide needs to be transformed further
  // (for example, by splitting up sections and inserting repeated headers if a section is longer
  // than a single slide) and the contentItem tree can't just be extracted from the state directly.
  contentItemTreeRootItem: DenormalizedRootContentItem,

  slideStylingItem: SlideStyling,
  userId: Identifier,
  slideStylingId: Identifier,
};

type DispatchProps = {
  onAddToState: (
    id: Identifier, userId: Identifier
  ) => void,
};

type Props = CustomTranslatorProps & StateProps & PassedProps & DispatchProps;

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

  const account = getAccount(state);

  const currentUser = account != null ? account.id : 'akqmq5ds5';

  const slideStylingIds: Array<Identifier> = getAllSlideStylingIdsByUserId(state, currentUser);
  // todo: als er geen thema is gevonden voor de gebruiker een nieuw thema aanmaken
  const slideStylingItem: SlideStyling = getById(state, { id: slideStylingIds[0] });
  let slideStylingId: Identifier = slideStylingIds[0];
  if (slideStylingItem == null) {
    slideStylingId = generateId();
  }

  return {
    contentItemTreeRootItem,
    slideStylingItem,
    userId: currentUser,
    slideStylingId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onAddToState: (
      id: Identifier, userId: Identifier): void => {
      dispatch(
        addToState(id, userId),
      );
    },
  };
};

const EditColorComponent = slideStyling.components.EditColorComponent;

class PureTempSlideTestPage extends React.Component<Props, ComponentState> {
  constructor(props: Props): void {
    super(props);
    this.slideRef = React.createRef();
  }

  state: ComponentState = {
    contentToBeRead: '',
    toggle: false,
  };

  componentWillMount = (): void => {
    const {
      slideStylingItem,
      onAddToState,
      slideStylingId,
      userId } = this.props;

    if (slideStylingItem == null) {
      onAddToState(slideStylingId, userId);
    }
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
      this.setState(
        { toggle: true,
          // $FlowFixMe
          contentToBeRead: this.slideRef.current.innerText,
        },
      );
    }
  };

  render = (): React.Node => {
    const {
      contentItemTreeRootItem,
      slideStylingItem,
      userId } = this.props;
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
          <Slide
            contentItemTreeRootItem={contentItemTreeRootItem}
            slideStyling={slideStylingItem}
          />
        </div>
        <div className="Voice">
          {VoicePlayerToggleNode}
          <Segment compact={true}>
            <Checkbox slider={true} onClick={this.toggleRead} checked={this.state.toggle} />
          </Segment>
        </div>
        <EditColorComponent
          userId={userId}
          slideStyling={slideStylingItem}
        />
      </Page>
    );
  }
}

const TempSlideTestPage =
  connect(mapStateToProps, mapDispatchToProps)(translate()(PureTempSlideTestPage));

export { PureTempSlideTestPage };
export default TempSlideTestPage;
