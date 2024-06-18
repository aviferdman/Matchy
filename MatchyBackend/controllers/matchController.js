class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }

    async createMatch(req, res) {
        try {
            const match = await this.matchService.createMatch(req.body);
            res.status(201).json(match);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the match' });
        }
    }

    async getAllMatches(req, res) {
        try {
            const matches = await this.matchService.getAllMatches();
            res.status(200).json(matches);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the matches' });
        }
    }

    async getMatchById(req, res) {
        try {
            const match = await this.matchService.getMatchById(req.params.id);
            if (!match) {
                return res.status(404).json({ message: 'Match not found' });
            }
            res.status(200).json(match);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the match' });
        }
    }

    async updateMatch(req, res) {
        try {
            const result = await this.matchService.updateMatch(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while updating the match' });
        }
    }

    async deleteMatch(req, res) {
        try {
            const result = await this.matchService.deleteMatch(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the match' });
        }
    }
}

module.exports = MatchController;
