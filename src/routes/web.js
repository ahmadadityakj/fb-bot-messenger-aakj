import express from "express";
import homeController from "../controllers/home";
import chatController from "../controllers/chat";
import db from "../services/db";

let router = express.Router();

let webRoutes = (app)=> {
  router.get("/", homeController.showHome);
  router.get("/webhook", chatController.getWebhook);
  router.post("/webhook", chatController.postWebhook);
  router.get("/testdb", () => {
    db.push({'text':'tesasdsadsadsadsad'});
  });

  return app.use("/", router);
};

module.exports = webRoutes;