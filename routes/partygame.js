const express = require('express');
const {
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
} = require('../controllers/partygame');

const router = express.Router();

// Fragen Routen
// Alle Fragen bekommmen
router.get('/ask/gameQuestions', getAllGameQuestions);
// Alle Fragen für Spezifische Game bekommen
router.get('/ask/gameQuestions/:game_id', getQuestionsForGame);
// Neue Frage erstellen
router.post('/ask/newQuestion', createQuestion);
// Frage bearbeiten
router.patch('/ask/editQuestion/:question_id', updateQuestion);

// User Routen
// Login Route
router.post('/user/login', loginUser);
// Logout Route
router.post('/user/logout', logoutUser);
// User erstellen
router.post('/user/create', createUser);
//Abfrage ob User Admin ist
router.get('/user/isadmin', isAdmin);

//Game Routen
// Alle Games
router.get('/game/allGames', GetAllGames);
// Ausgewähltes Game
router.get('/game/:game_id', getSelectedGame);
//Spiele mit Fragen bekommen
router.get('/game/allGames/question', getQuestionsGame);

//ActiveGame Routen
// Derzeit Aktive Game des Users bekommen
router.get('/activegame/getGame', getActiveGameByUser);
// Neues Aktives Spiel erstellen
router.post('/activegame/creategame', createNewActiveGame);

module.exports = router;
