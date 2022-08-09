import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { screen } from '@testing-library/react';

describe('Testando a pagina de feedback', () => {
    it('Testando se o path está correto', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback')

        const { pathname } = history.location;
        console.log(screen.logTestingPlaygroundURL());
        expect(pathname).toBe('/feedback');
    })

    it('Testando se os elementos estão na tela', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback')

        const imagem = screen.getByRole('img', { name: /imagem de/i })
        const fraseFeedback = screen.getByTestId('feedback-text');
        const name = screen.getByTestId('header-player-name');
        const score = screen.getByTestId('header-score');
        const scoreTotal = screen.getByTestId('feedback-total-score');
        const assertions = screen.getByTestId('feedback-total-question');
        const playAgain = screen.getByTestId('btn-play-again');
        const ranking = screen.getByTestId('btn-ranking');

        expect(imagem).toBeInTheDocument();
        expect(fraseFeedback).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(score).toBeInTheDocument();
        expect(scoreTotal).toBeInTheDocument();
        expect(assertions).toBeInTheDocument();
        expect(playAgain).toBeInTheDocument();
        expect(ranking).toBeInTheDocument();
    })

    it('Testando o click no botão playagain', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback')

        const playAgain = screen.getByTestId('btn-play-again');

        userEvent.click(playAgain);

        const { pathname } = history.location;
        expect(pathname).toBe('/');
    })

    it('Testando o click no botão ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback')

        const ranking= screen.getByTestId('btn-ranking');

        userEvent.click(ranking);

        const { pathname } = history.location;
        expect(pathname).toBe('/ranking');
    })
})