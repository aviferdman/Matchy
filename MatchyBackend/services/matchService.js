class MatchService {
    constructor(matchModel) {
        this.matchModel = matchModel;
    }

    createMatch(data) {
        return this.matchModel.create(data);
    }

    getAllMatches() {
        return this.matchModel.findAll();
    }

    getMatchById(id) {
        return this.matchModel.findById(id);
    }

    updateMatch(id, data) {
        return this.matchModel.update(id, data);
    }

    deleteMatch(id) {
        return this.matchModel.delete(id);
    }
}

module.exports = MatchService;
