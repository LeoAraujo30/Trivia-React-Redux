import * as actionTypes from './actionTypes';

export const playGame = (name, gravatarEmail) => (
  { type: actionTypes.PLAY, name, gravatarEmail }
);

export const addScore = (score) => (
  { type: actionTypes.ADD_SCORE, score }
);

export const qualquercoisa = () => ({});
