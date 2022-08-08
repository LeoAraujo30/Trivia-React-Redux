import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      teste: '',
      questions: '',
      seconds: 30,
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

  // Função para randomizar array
 shuffleArray = (arr) => {
   // Loop em todos os elementos
   for (let i = arr.length - 1; i > 0; i -= 1) {
     // Escolhendo elemento aleatório
     const j = Math.floor(Math.random() * (i + 1));
     // Reposicionando elemento
     [arr[i], arr[j]] = [arr[j], arr[i]];
   }
   // Retornando array com aleatoriedade
   return arr;
 }

    getQuestions = async (token) => {
      const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const requestJson = await request.json();
      console.log(requestJson);
      this.setState({
        questions: requestJson.results,
        teste: requestJson,
      });
      return requestJson;
    };

    render() {
      const { teste, questions, seconds, classWrongOptions,
        classCorrectOption } = this.state;
      const number3 = 3;
      const number05 = 0.5;
      const testReponse = 'correct-option';

      if (teste.response_code === number3) {
        return <Redirect to="/" />;
      }
      if (questions.length !== 0) {
        const array = questions[0].incorrect_answers.concat(questions[0].correct_answer);
        const arrayRandom = this.shuffleArray(array);
        return (
          <div>
            <p>
              Timer:
              { seconds }
            </p>
            <div key={ questions[0].index } className="card_question">
              <p data-testid="question-category">{ questions[0].category }</p>
              <p data-testid="question-text">{ questions[0].question }</p>
              <div data-testid="answer-options">
                {
                  arrayRandom.map((element) => (
                    element === questions[0].correct_answer
                      ? (
                        <button
                          type="button"
                          name="correct-answer"
                          data-testid="correct-answer"
                          disabled={ seconds === 0
                            || classCorrectOption === testReponse }
                          className={ classCorrectOption }
                          onClick={ () => this.handleClickAnswer() }
                        >
                          { element }
                        </button>)
                      : (
                        <button
                          type="button"
                          key={ element.index }
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
                  ? <button type="button" data-testid="btn-next">Next</button> : ''}
              </div>
            </div>
          </div>);
      }
      return (<div />);
    }
}

export default Questions;
