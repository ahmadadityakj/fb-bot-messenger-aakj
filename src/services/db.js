import StormDB from "stormdb";

const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);
db.default({ messages: [] });

const push = (data) => {
  db.get('messages').push(data).save();
};

module.exports = {
  db: db
};