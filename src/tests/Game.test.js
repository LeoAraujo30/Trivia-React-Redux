import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Questions from '../component/Questions';

const sucessToken = {
  "response_code":0,
  "results":[
      {
        "category":"Entertainment: Video Games fps",
        "type":"multiple",
        "difficulty":"hard",
        "question":"What is the first weapon you acquire in Half-Life?",
        "correct_answer":"A crowbar",
        "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
        ]
      },
      {
        "category":"Entertainment: Video Games",
        "type":"boolean",
        "difficulty":"hard",
        "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
        "correct_answer":"False",
        "incorrect_answers":[
            "True"
        ]
      },
      {
        "category":"Entertainment: Video Games",
        "type":"multiple",
        "difficulty":"easy",
        "question":"What is the first weapon you acquire in Half-Life?",
        "correct_answer":"A crowbar",
        "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
        ]
      },
      {
        "category":"Entertainment: Video Games",
        "type":"boolean",
        "difficulty":"hard",
        "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
        "correct_answer":"False",
        "incorrect_answers":[
            "True"
        ]
      },
      {
        "category":"Entertainment: Video Games",
        "type":"multiple",
        "difficulty":"easy",
        "question":"What is the first weapon you acquire in Half-Life?",
        "correct_answer":"A crowbar",
        "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
        ]
      },
  ]
};

// const failToken = {
//     "response_code":3,
//     "results":[]
// };

afterEach((() => jest.clearAllMocks));

describe('Testando o componente <Game />', () => {
  it('Testando a tela de jogo', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(sucessToken),
      });
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    
    expect(await screen.findByTestId('question-category') && await screen
      .findByTestId('question-text')).toBeInTheDocument();
    expect(await screen.findByTestId('question-category'))
    .toHaveTextContent('Entertainment: Video Games fps');
    expect(await screen.findByTestId('question-text'))
    .toHaveTextContent('What is the first weapon you acquire in Half-Life?');
    expect(await screen.findByTestId('correct-answer')).toHaveTextContent('A crowbar');
    expect(await screen.findAllByTestId('wrong-answer')).toHaveLength(3);
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));

    expect(await screen.findByTestId('question-category'))
    .toHaveTextContent('Entertainment: Video Games');
    expect(await screen.findByTestId('question-text'))
    .toHaveTextContent(/TF2: Sentry rocket damage falloff is calculated based on the distance/i);
    expect(await screen.findByTestId('correct-answer')).toHaveTextContent('False');
    expect(await screen.findAllByTestId('wrong-answer')).toHaveLength(1);
    userEvent.click(await screen.findByTestId('wrong-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('wrong-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.getByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    expect(history.location.pathname).toBe('/feedback');
  });
  it('Testando a tela de jogo ao esperar 5', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(sucessToken),
      });
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    setTimeout(async () => {
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(await screen.findByTestId('btn-next'));
    }, 5000);

    // await waitFor(async () => {
    //     expect(await screen.findByTestId('seconds')).toHaveTextContent('Timer:25');
    // });
    // userEvent.click(await screen.findByTestId('correct-answer'));
    // userEvent.click(await screen.findByTestId('btn-next'));

  });
});
