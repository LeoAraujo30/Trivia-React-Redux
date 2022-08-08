import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { addScore } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      teste: '',
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
    const { seconds } = this.state;
    const tokenGame = localStorage.getItem('token');
    const oneSecond = 1000;
    this.getQuestions(tokenGame);
    if (seconds > 0) {
      setInterval(() => {
        this.setState((prevState) => ({
          seconds: prevState.seconds > 0 ? prevState.seconds - 1 : prevState.seconds,
        }));
      }, oneSecond);
    }
  }

  handleClickAnswer = () => {
    const { clicked } = this.state;
    if (!clicked) {
      this.setState({
        classCorrectOption: 'correct-option',
        classWrongOptions: 'wrong-options',
        clicked: true,
      });
    }
  }

    getQuestions = async (token) => {
      const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const requestJson = await request.json();
      console.log(requestJson);
      const number05 = 0.5;
      this.setState({
        questions: requestJson.results,
        answers: requestJson.results[0].incorrect_answers
          .concat(requestJson.results[0].correct_answer)
          .sort(() => number05 - Math.random()),
        teste: requestJson,
      });
      return requestJson;
    };

    getAnswers = () => {
      const { questions, idQuestion } = this.state;
      const number05 = 0.5;
      this.setState({
        answers: questions[idQuestion + 1].incorrect_answers
          .concat(questions[idQuestion + 1].correct_answer)
          .sort(() => number05 - Math.random()),
        idQuestion: idQuestion + 1,
      });
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
      const { teste, questions, seconds, classWrongOptions,
        classCorrectOption, answers, idQuestion } = this.state;
      const number3 = 3;
      const testReponse = 'correct-option';

      if (teste.response_code === number3) {
        return <Redirect to="/" />;
      }
      if (questions.length !== 0) {
        return (
          <div>
            <p>
              Timer:
              { seconds }
            </p>
            <div key={ questions[idQuestion].index } className="card_question">
              <p data-testid="question-category">{ questions[idQuestion].category }</p>
              <p data-testid="question-text">{ questions[idQuestion].question }</p>
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
                            || classCorrectOption === testReponse }
                          className={ classCorrectOption }
                          onClick={ () => {
                            this.handleClickAnswer();
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
                            || classCorrectOption === testReponse }
                          className={ classWrongOptions }
                          onClick={ () => this.handleClickAnswer() }
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
                      // onClick={ () => this.getAnswers() }
                    >
                      Next
                    </button>) : ''}
              </div>
            </div>
          </div>);
      }
      return (<div />);
    }
}

Questions.propTypes = {
  addScoreDispatch: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addScoreDispatch: (score) => dispatch(addScore(score)),
});

export default connect(null, mapDispatchToProps)(Questions);
