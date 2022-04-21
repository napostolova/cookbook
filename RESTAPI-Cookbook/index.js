const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeController = require('./controllers/recipeController');
const userController = require('./controllers/userController');

const auth = require('./middlewares/auth');
let MONGODB_URI = `mongodb+srv://napostolova:Cookbook2022@cookbook.emh2t.mongodb.net/CookBook?retryWrites=true&w=majority`
const port = process.env.PORT || 4000;
const SECRET = 'Secret SoftUni';

start();

async function start() {
    await new Promise((resolve, reject) => {
        mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        db.once('open', () => {
            console.log('Database connected');
            resolve();
        });
        db.on('error', (err) => reject(err));
    });

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(auth());

    app.use('/recipes', recipeController);
    app.use('/user', userController);

    app.listen(port, () => console.log(`REST Service lisetening on port ${port}`));
}