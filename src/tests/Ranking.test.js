import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componente <Ranking />', () => {
    it('Testando a renderização correta da tela de Ranking vazia', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/ranking');

        screen.getByRole('heading', { name: /ranking/i });
        screen.getByText('Não há jogadores no ranking ainda');
        const btn = screen.getByRole('button', { name: /voltar/i });

        userEvent.click(btn);
        expect(history.location.pathname).toBe('/');
    });

    it('Testando a renderização correta da tela de Ranking populada', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const mockStorage = [
            {
                name: 'exemplo1',
                score: 150,
                picture: "https://www.gravatar.com/avatar/b664fda36fc73a0592e4c2218c7b383c",
            },
            {
                name: 'exemplo2',
                score: 100,
                picture: "https://www.gravatar.com/avatar/b664fda36fc73a0592e4c2218c7b383c",
            },
            {
                name: 'exemplo3',
                score: 50,
                picture: "https://www.gravatar.com/avatar/b664fda36fc73a0592e4c2218c7b383c",
            },
            {
                name: '',
                score: 10,
                picture: "https://www.gravatar.com/avatar/b664fda36fc73a0592e4c2218c7b383c",
            },
        ]
        localStorage.setItem('ranking', JSON.stringify(mockStorage));
        history.push('/ranking');

        screen.getByRole('heading', { name: /ranking/i });
        screen.getByRole('button', { name: /voltar/i });
        mockStorage.forEach((jogador, index) => {
            if (index <= 2) {
                const playerName = screen.getByTestId(`player-name-${index}`);
                const playerScore = screen.getByTestId(`player-score-${index}`);
                expect(playerName).toHaveTextContent(jogador.name);
                expect(playerScore).toHaveTextContent(jogador.score);
            } else {
                const playerName = screen.getByTestId(`player-name-${index}`);
                const playerScore = screen.getByTestId(`player-score-${index}`);
                expect(playerName).toHaveTextContent('jogador anonimo');
                expect(playerScore).toHaveTextContent(jogador.score);
            }
        });
    });
});
