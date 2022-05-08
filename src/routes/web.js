import express from "express";
import homeController from "../controllers/home";
import chatController from "../controllers/chat";
import stormDb from "../services/db";
import dayjs from 'dayjs';
import dateHelper from '../helpers/date';

let router = express.Router();

let webRoutes = (app)=> {
  router.get("/", homeController.showHome);
  router.get("/webhook", chatController.getWebhook);
  router.post("/webhook", chatController.postWebhook);
  router.get("/emptydb", (req, res) => {
    stormDb.emptyDatabase();
    res.status(200).send('ok');
  });
  router.get("/dummydata", (req, res) => {
    stormDb.db.get('messages').set([
      { user: '12345', name: 'john', messages: [], state: 'welcome', birthDate: '' },
      { user: '45678', name: 'robert', messages: [], state: 'birthdate', birthDate: '1990-01-30' },
    ]);
    res.status(200).send('ok');
  });
  router.get("/messages", (req, res) => {
    const allMessages = stormDb.db.get('messages').value();
    res.status(200).json(allMessages);
  });
  router.get("/summary", (req, res) => {
    const allMessages = stormDb.db.get('messages').value();
    const summary = allMessages.map(x => {
      return {
        user: x.user,
        name: x.name,
        messages: x.messages
      }
    });
    res.status(200).json(summary);
  });
  router.get("/messages/:id", (req, res) => {
    const params = req.params;
    const message = stormDb.getMessageById(params.id);
    res.status(200).json(message);
  });
  router.get("/datediff", (req, res) => {
    res.status(200).json(dateHelper.countNextBirthDay('1989-04-22'));
  });

  return app.use("/", router);
};

module.exports = webRoutes;