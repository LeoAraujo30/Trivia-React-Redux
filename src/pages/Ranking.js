import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('ranking')) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      this.setState({
        ranking: ranking.sort((a, b) => b.score - a.score),
      });
    }
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <div>
        <header className="game-header">
          <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
        </header>
        <main className="ranking-page">
          {
            (ranking !== null && ranking.length > 0)
              ? (
                <ol className="ranking-list">
                  {
                    ranking.map((person, index) => (
                      <li key={ index }>
                        <img src={ person.picture } alt="imagem da pessoa jogadora" />
                        <h4 data-testid={ `player-name-${index}` }>
                          {
                            (person.name === '') ? 'jogador anonimo' : person.name
                          }
                        </h4>
                        <p data-testid={ `player-score-${index}` }>{person.score}</p>
                      </li>
                    ))
                  }
                </ol>
              )
              : <p>Não há jogadores no ranking ainda</p>
          }
          <form>
            <button
              type="button"
              className="btn-next"
              data-testid="btn-go-home"
              onClick={ () => history.push('/') }
            >
              Voltar
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Ranking;
