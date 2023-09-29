const express = require('express');
const authController = require('../controllers/authController');

class Routes {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.post('/auth/login', authController.login);

    }
}

const routes = new Routes().router;

module.exports = routes;