const { ObjectId } = require('mongodb');
const isValidObjectId = require('../utils/isValidObjectId');

class Match {
    constructor(db) {
        this.collection = db.collection('matches');
    }

    async create(data) {
        data.type = "matches";
        const result = await this.collection.insertOne(data);
        return result.ops[0];
    }

    async findAll() {
        const matches = await this.collection.find().toArray();
        return matches;
    }

    async findById(id) {
        if (!isValidObjectId(id)) {
            throw new Error('Invalid ID format');
        }
        const match = await this.collection.findOne({ _id: new ObjectId(id) });
        return match;
    }

    async update(id, data) {
        if (!isValidObjectId(id)) {
            throw new Error('Invalid ID format');
        }
        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        return result;
    }

    async delete(id) {
        if (!isValidObjectId(id)) {
            throw new Error('Invalid ID format');
        }
        const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
        return result;
    }
}

module.exports = Match;
