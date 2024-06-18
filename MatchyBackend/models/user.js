const { ObjectId } = require('mongodb');
const isValidObjectId = require('../utils/isValidObjectId');

class User {
    constructor(db) {
        this.collection = db.collection('users');
    }

    async create(data) {
        data._id = new ObjectId().toHexString();
        data.partition = data.email;
        data.type = "users";
        const result = await this.collection.insertOne(data);
        return result.ops[0];
    }

    async findAll() {
        const users = await this.collection.find().toArray();
        return users;
    }

    async findAllByGender(gender) {
        const users = await this.collection.find({ gender }).toArray();
        return users;
    }
    
    async findById(id) {
        if (!isValidObjectId(id)) {
            throw new Error('Invalid ID format');
        }
        const user = await this.collection.findOne({ _id: new ObjectId(id) });
        return user;
    }

    async findByEmail(email) {
        const user = await this.collection.findOne({ email });
        return user;
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

module.exports = User;
