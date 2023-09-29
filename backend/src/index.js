const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const sequelize = require('./database/sequelize')

const authRouter = require('./routes/authRoutes');
const jobRouter = require('./routes/jobRoutes');

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001; // Use Heroku's assigned port or 3001 as a fallback
        this.message = "server started on port " + this.port;

        this.setup();
    }
    async setup() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use("/api", authRouter);
        this.app.use("/api", jobRouter);

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

const { app, port, message } = new App();

app.listen(port, () => {
    console.log(message)
})
