import express from "express";
import homeController from "../controllers/home";
import chatController from "../controllers/chat";
import stormDb from "../services/db";

let router = express.Router();

let webRoutes = (app)=> {
  router.get("/", homeController.showHome);
  router.get("/webhook", chatController.getWebhook);
  router.post("/webhook", chatController.postWebhook);
  router.get("/testdb", (req, res) => {
    stormDb.db.get('messages').push({
      user: '12313123', name: '', messages: []
    }).save();
    res.status(200).send('ok');
  });

  return app.use("/", router);
};

module.exports = webRoutes;