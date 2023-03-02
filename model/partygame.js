const { query } = require('../db/index');
const moment = require('moment');

// Fragen SQl Statements
const getAllGameQuestions = async () =>
  (await query('SELECT * FROM public."Fragen" ORDER BY "Fragen_ID" ASC')).rows;

const getQuestionsForGame = async (game_id) =>
  (await query('SELECT * FROM "Fragen" WHERE "Game_ID" =$1', [game_id])).rows;

const createQuestion = async (newQuestion) =>
  (
    await query(
      'INSERT INTO "Fragen" ("Frage", "Kategorie", "SingleFrage", "GruppenFrage", "Game_ID") VALUES ($1, $2, $3, $4, $5) returning *',
      [
        newQuestion.Frage,
        newQuestion.Kategorie,
        newQuestion.SingleFrage,
        newQuestion.GruppenFrage,
        newQuestion.Game_ID,
      ]
    )
  ).rows;

const updateQuestion = async (question_id, updateQuestion) =>
  (
    await query(
      'UPDATE "Fragen" SET "Frage" = $1, "Kategorie" = $2, "SingleFrage" = $3, "GruppenFrage" = $4 WHERE "Fragen_ID" = $5 returning *',
      [
        updateQuestion.Frage,
        updateQuestion.Kategorie,
        updateQuestion.SingleFrage,
        updateQuestion.GruppenFrage,
        question_id,
      ]
    )
  ).rows;

// User Statements
const loginUser = async (user) => {
  // User password hashen
  const res = (
    await query(
      'SELECT * FROM "User" WHERE "Username" = $1 AND "Password" = $2',
      [user.username, user.password]
    )
  ).rows;
  if (res.length === 0) {
    return false;
  }
  return res[0];
};

const createUser = async (user) =>
  (
    await query(
      'INSERT INTO "User" ("Password", "Username", "Admin") VALUES ($1, $2, $3) returning *',
      [user.password, user.username, user.admin]
    )
  ).rows;

// Game Statements
const GetAllGames = async () =>
  (await query('SELECT * FROM "Games" WHERE "Public" = true')).rows;
const GetAllGameAdmin = async () => (await query('SELECT * FROM "Games"')).rows;

const getSelectedGame = async (game_id) =>
  (await query('SELECT * FROM "Games" WHERE  "Game_ID" =$1', [game_id])).rows;

const getQuestionsGame = async () =>
  (await query('SELECT * FROM "Games" WHERE "questionGame" = true')).rows;

// Active Game Statements
const getActiveGameByUser = async (user_id) =>
  (
    await query(
      'SELECT * FROM "ActiveGame" WHERE "User_Created" = $1 AND "isActive" = true',
      [user_id]
    )
  ).rows;

const createNewActiveGame = async (newActiveGame) =>
  (await query(
    'UPDATE "ActiveGame" SET "isActive" = false WHERE "User_Created" = $1',
    [newActiveGame.user_created]
  ),
  await query(
    'INSERT INTO "ActiveGame" ("Game_ID", "User_Created", "isActive", "Players", "Kategorie", "CreationDate") VALUES ($1,$2,$3,$4,$5,$6) returning *',
    [
      newActiveGame.game_id,
      newActiveGame.user_created,
      true,
      newActiveGame.players,
      newActiveGame.kategorie,
      moment().format('YYYY-MM-DD HH:mm:ss'),
    ]
  )).rows;

module.exports = {
  getAllGameQuestions,
  getQuestionsForGame,
  createQuestion,
  updateQuestion,
  loginUser,
  createUser,
  GetAllGames,
  getSelectedGame,
  getActiveGameByUser,
  createNewActiveGame,
  GetAllGameAdmin,
  getQuestionsGame,
};
