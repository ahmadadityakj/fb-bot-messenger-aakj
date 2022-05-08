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
  router.get("/overwrite", (req, res) => {
    stormDb.db.get('messages').set([
      {
        user: '12345', name: '', messages: []
      },
      {
        user: '45678', name: '', messages: []
      }
    ]).save();
    res.status(200).send('ok');
  });
  router.get("/update", (req, res) => {
    const allMessages = stormDb.db.get('messages').value();
    const newMessages = allMessages.map(x => x.user === '45678' ? { ...x, name: 'tes'} : x);
    stormDb.db.get('messages').set(newMessages).save();
    res.status(200).send('ok');
  });
  router.get("/messages", (req, res) => {
    const allMessages = stormDb.db.get('messages').value();
    res.status(200).json(allMessages);
  });

  return app.use("/", router);
};

module.exports = webRoutes;