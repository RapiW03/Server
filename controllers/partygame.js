const asyncHandler = require('express-async-handler');
const model = require('../model/partygame');

// Fragen calls
// Alle Fragen bekommmen
const getAllGameQuestions = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getAllGameQuestions());
});

// Alle Fragen für Spezifische Game bekommen
const getQuestionsForGame = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getQuestionsForGame(req.params.game_id));
});

// Neue Frage erstellen
const createQuestion = asyncHandler(async (req, res) => {
  res.status(200).json(await model.createQuestion(req.body));
});

// Frage bearbeiten
const updateQuestion = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(await model.updateQuestion(req.params.question_id, req.body));
});

// User calls
// Login Route
const loginUser = asyncHandler(async (req, res) => {
  const user = await model.loginUser(req.body);
  if (!user) {
    req.session.user = null;
    res.status(402).json('User not Found');
    return;
  }
  console.log('user Logged in');
  console.log(req.session);
  req.session.user = user;
  res.status(200).json(user);
});
// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  req.session.user = null;
  console.log('user logged out');
  res.status(200).send('User logged Out');
});
// User erstellen
const createUser = asyncHandler(async (req, res) => {
  res.status(200).json(await model.createUser(req.body));
});
//Abfrage ob User Admin ist
const isAdmin = asyncHandler(async (req, res) => {
  res.status(200).json(req.session.user);
});

// Game Calls
// Alle Games bekommen
const GetAllGames = asyncHandler(async (req, res) => {
  if (req.session.user.Admin == true) {
    res.status(200).json(await model.GetAllGameAdmin());
  } else {
    res.status(200).json(await model.GetAllGames());
  }
});

// Ausgewähltes Spiel bekommen
const getSelectedGame = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getSelectedGame(req.params.game_id));
});

// Spiele mit Fragen bekommen
const getQuestionsGame = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getQuestionsGame());
});

// ActiveGame Calls
// Derzeit Aktive Game des Users bekommen
const getActiveGameByUser = asyncHandler(async (req, res) => {
  console.log(await model.getActiveGameByUser(req.session.user.User_ID));
  res
    .status(200)
    .json(await model.getActiveGameByUser(req.session.user.User_ID));
});
// Neues Aktives Spiel erstellen
const createNewActiveGame = asyncHandler(async (req, res) => {
  req.body.user_created = req.session.user.User_ID;
  console.log(req.body);
  res.status(200).json(await model.createNewActiveGame(req.body));
});

module.exports = {
  getAllGameQuestions,
  getQuestionsForGame,
  createQuestion,
  updateQuestion,
  loginUser,
  logoutUser,
  createUser,
  GetAllGames,
  getSelectedGame,
  getActiveGameByUser,
  createNewActiveGame,
  getQuestionsGame,
  isAdmin,
};
