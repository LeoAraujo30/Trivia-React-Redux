import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      gravatarImageUrl: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const UrlEnd = md5(email).toString();
    this.setState({
      gravatarImageUrl: `https://www.gravatar.com/avatar/${UrlEnd}`,
    });
  }

  getFeedback = () => {
    const { assertions } = this.props;
    const MIN_ASSERTIONS = 3;
    if (assertions >= MIN_ASSERTIONS) {
      return 'Well Done!';
    } return 'Could be better...';
  }

  handlePlayAgainButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleRankingButton = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { gravatarImageUrl } = this.state;
    const { username, scores, assertions } = this.props;
    const altText = `Imagem de ${username}`;
    const feedback = this.getFeedback();
    return (
      <div>
        <header>
          <img
            src={ gravatarImageUrl }
            data-testid="header-profile-picture"
            alt={ altText }
          />

          <h1 data-testid="feedback-text">
            { feedback }
          </h1>
          <p data-testid="header-player-name">{ username }</p>
          <p data-testid="header-score">{ scores }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </header>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.handlePlayAgainButton() }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.handleRankingButton() }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  username: store.player.name,
  scores: store.player.score,
  email: store.player.gravatarEmail,
  feedbackText: store.player.feedback,
  assertions: store.player.assertions,
});

Feedback.propTypes = {
  username: PropTypes.string.isRequired,
  scores: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

};

export default connect(mapStateToProps)(Feedback);
