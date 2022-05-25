const { Router } = require('express');
const DeslikeController = require('../controllers/DeslikeController');
const DevController = require('../controllers/DevController');
const LikeController = require('../controllers/LikeController');
const routes = Router();

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);
routes.post("/devs/:devId/likes", LikeController.store);
routes.post("/devs/:devId/deslikes", DeslikeController.store)

module.exports = routes;