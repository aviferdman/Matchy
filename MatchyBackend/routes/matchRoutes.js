const express = require('express');
const router = express.Router();

module.exports = function (db) {
    const Match = require('../models/match');
    const MatchService = require('../services/matchService');
    const MatchController = require('../controllers/matchController');

    const matchModel = new Match(db);
    const matchService = new MatchService(matchModel);
    const matchController = new MatchController(matchService);

    router.post('/matches', (req, res) => matchController.createMatch(req, res));
    router.get('/matches', (req, res) => matchController.getAllMatches(req, res));
    router.get('/matches/:id', (req, res) => matchController.getMatchById(req, res));
    router.put('/matches/:id', (req, res) => matchController.updateMatch(req, res));
    router.delete('/matches/:id', (req, res) => matchController.deleteMatch(req, res));

    return router;
};
