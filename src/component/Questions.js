import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addScore, addAssertions } from '../redux/actions';
import { correto, errado } from '../redux/actions/actionTypes';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      answers: [],
      seconds: 30,
      idQuestion: 0,
      classWrongOptions: 'options',
      classCorrectOption: 'options',
      clicked: false,
    };
  }

  componentDidMount() {
    const tokenGame = localStorage.getItem('token');
    const oneSecond = 1000;
    this.getQuestions(tokenGame);
    setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds > 0 ? prevState.seconds - 1 : prevState.seconds,
      }));
    }, oneSecond);
  }

  handleClickRightAnswer = () => {
    const { addAssertionss } = this.props;
    this.setState({
      classCorrectOption: correto,
      classWrongOptions: errado,
      clicked: true,
    });
    addAssertionss();
  }

  handleClickWrongAnswer = () => {
    this.setState({
      classCorrectOption: 'correct-option',
      classWrongOptions: 'wrong-options',
      clicked: true,
    });
  }

    getQuestions = async (token) => {
      const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const requestJson = await request.json();
      const number05 = 0.5;
      const { history } = this.props;
      try {
        this.setState({
          questions: requestJson.results,
          answers: requestJson.results[0].incorrect_answers
            .concat(requestJson.results[0].correct_answer)
            .sort(() => number05 - Math.random()),
        });
      } catch {
        history.push('/');
      }
      return requestJson;
    };

    getAnswers = () => {
      const { questions, idQuestion } = this.state;
      const { history, setLocalStorage } = this.props;
      const TRES = 3;
      if (idQuestion <= TRES) {
        const number05 = 0.5;
        this.setState({
          answers: questions[idQuestion + 1].incorrect_answers
            .concat(questions[idQuestion + 1].correct_answer)
            .sort(() => number05 - Math.random()),
          idQuestion: idQuestion + 1,
          classWrongOptions: 'options',
          classCorrectOption: 'options',
          seconds: 30,
          clicked: false,
        });
      } else {
        setLocalStorage();
        history.push('/feedback');
      }
    };

    somaScore = (timer, difficulty) => {
      const { addScoreDispatch } = this.props;
      const TRES = 3;
      const DEZ = 10;
      if (difficulty === 'easy') return addScoreDispatch(DEZ + (timer * 1));
      if (difficulty === 'medium') return addScoreDispatch(DEZ + (timer * 2));
      if (difficulty === 'hard') return addScoreDispatch(DEZ + (timer * TRES));
    };

    render() {
      const { questions, seconds, classWrongOptions,
        classCorrectOption, answers, idQuestion, clicked } = this.state;
      const testReponse = 'correct-option';
      if (questions.length !== 0) {
        return (
          <div className="questions">
            <p className="timer-questions" data-testid="seconds">
              Timer:
              { seconds }
            </p>
            <div key={ questions[idQuestion].index } className="card_question">
              <p
                data-testid="question-category"
                className="question-category"
              >
                { questions[idQuestion].category }
              </p>
              <p
                data-testid="question-text"
                className="question-text"
              >
                { questions[idQuestion].question }
              </p>
              <div data-testid="answer-options">
                {
                  answers.map((element, index) => (
                    element === questions[idQuestion].correct_answer
                      ? (
                        <button
                          type="button"
                          key={ index }
                          name="correct-answer"
                          data-testid="correct-answer"
                          disabled={ seconds === 0
                            || classCorrectOption === testReponse || clicked }
                          className={ classCorrectOption }
                          onClick={ () => {
                            this.handleClickRightAnswer();
                            this.somaScore(seconds, questions[idQuestion].difficulty);
                          } }
                        >
                          { element }
                        </button>)
                      : (
                        <button
                          type="button"
                          key={ index }
                          name="wrong-answer"
                          data-testid="wrong-answer"
                          disabled={ seconds === 0
                            || classCorrectOption === testReponse || clicked }
                          className={ classWrongOptions }
                          onClick={ () => this.handleClickWrongAnswer() }
                        >
                          { element }
                        </button>)))
                }
                <br />
                { seconds === 0
                || classWrongOptions === 'wrong-options'
                  ? (
                    <button
                      type="button"
                      data-testid="btn-next"
                      className="btn-next"
                      onClick={ () => this.getAnswers() }
                    >
                      Next
                    </button>) : <> </>}
              </div>
            </div>
          </div>);
      }
      return (<div />);
    }
}

Questions.propTypes = {
  addAssertionss: propTypes.func.isRequired,
  addScoreDispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  setLocalStorage: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addScoreDispatch: (score) => dispatch(addScore(score)),
  addAssertionss: () => dispatch(addAssertions()),
});

export default connect(null, mapDispatchToProps)(Questions);
