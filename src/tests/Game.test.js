import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const sucessToken1 = {
  "response_code":0,
  "results":[
      {
        "category":"Entertainment: Video Games fps",
        "type":"multiple",
        "difficulty":"medium",
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

const sucessToken2 = {
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

const sucessToken3 = {
  "response_code":0,
  "results":[
      {
        "category":"Entertainment: Video Games fps",
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
        "difficulty":"medium",
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
        "difficulty":"hard",
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

afterEach((() => jest.clearAllMocks));

describe('Testando o componente <Game />', () => {
  it('Testando a tela de jogo', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(sucessToken1),
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
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    expect(history.location.pathname).toBe('/feedback');
  });
  it('Testando a tela de jogo 2 vezes', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(sucessToken2),
      });
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId('input-player-name'), 'nickName1');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'alguem1@alguem1.com');
    userEvent.click(await screen.findByRole('button', { name: 'Play' }));
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('wrong-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('wrong-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.getByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    expect(history.location.pathname).toBe('/feedback');
    userEvent.click(await screen.findByRole('button', { name: 'Play Again' }));

    userEvent.type(screen.getByTestId('input-player-name'), 'nickName2');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'alguem2@alguem2.com');
    userEvent.click(await screen.findByRole('button', { name: 'Play' }));
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('wrong-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('wrong-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.getByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    expect(history.location.pathname).toBe('/feedback');
    userEvent.click(await screen.findByRole('button', { name: 'Play Again' }));
  });

  // O codigo abaixo foi retirado como referencia desse link: 
  //https://stackoverflow.com/questions/45478730/jest-react-testing-check-state-after-delay

  jest.setTimeout(35000);

  it('Testando a tela de jogo ao esperar 30s', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(sucessToken3),
      });
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    await new Promise((r) => setTimeout(r, 30000));
    await screen.findByTestId('btn-next');
  });

  it('Testando a cor dos botões na tela de jogo', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(sucessToken3),
      });
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');

    // const correctAnswer = await screen.findByTestId('correct-answer');
    // console.log(correctAnswer);
    expect(await screen.findByTestId('correct-answer')).toHaveProperty('className', 'options');
    userEvent.click((await screen.findByTestId('correct-answer')));
    expect((await screen.findByTestId('correct-answer'))).toHaveProperty('className', 'correct-option');
    
  });
});
