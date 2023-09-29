const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const jobController = require('../controllers/jobController');

class Routes {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        // this.router.get('/jobs', authMiddleware.verifyToken, jobController.jobList);
        // this.router.get('/jobs/:id', authMiddleware.verifyToken, jobController.jobDetail);

        this.router.get('/jobs', jobController.jobList);
        this.router.get('/jobs/:id', jobController.jobDetail);
    }
}

const routes = new Routes().router;

module.exports = routes;