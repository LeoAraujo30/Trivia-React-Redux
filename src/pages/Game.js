import React from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Questions from '../component/Questions';

class Game extends React.Component {
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

  handleSetLocalStorage = () => {
    const { username, score } = this.props;
    const { gravatarImageUrl } = this.state;
    if (localStorage.getItem('ranking')) {
      const item = [
        ...JSON.parse(localStorage.getItem('ranking')),
        { name: username, score, picture: gravatarImageUrl },
      ];
      localStorage.setItem('ranking', JSON.stringify(item));
    } else {
      const item = [
        { name: username, score, picture: gravatarImageUrl },
      ];
      localStorage.setItem('ranking', JSON.stringify(item));
    }
  }

  render() {
    const { username, score, history } = this.props;
    const { gravatarImageUrl } = this.state;
    const altText = `Imagem de ${username}`;
    return (
      <div>
        <header className="game-header">
          <div>
            <img
              src={ gravatarImageUrl }
              data-testid="header-profile-picture"
              alt={ altText }
            />
            <h2 data-testid="header-player-name">{username}</h2>
          </div>
          <h2 data-testid="header-score">{ `Score = ${score}` }</h2>
        </header>
        <Questions
          setLocalStorage={ () => this.handleSetLocalStorage() }
          history={ history }
        />
      </div>
    );
  }
}

Game.propTypes = {
  username: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Game);
