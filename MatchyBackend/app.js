const express = require('express');
const mongodb = require('mongodb');
const config = require('./config/config');
const cors = require('cors');

const app = express();

app.use(cors()); 

app.use(express.json());

mongodb.MongoClient.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        const db = client.db(dbName = "Matchy");

        const userRoutes = require('./routes/userRoutes')(db);
        const matchRoutes = require('./routes/matchRoutes')(db);

        app.use('/api', userRoutes);
        app.use('/api', matchRoutes);

        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    })
    .catch(err => {
        console.error('Database connection error', err);
    });
