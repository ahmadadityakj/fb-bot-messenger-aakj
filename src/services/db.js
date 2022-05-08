import StormDB from "stormdb";

const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);
db.default({ messages: [] });

const push = (data) => {
  db.get('messages').push(data).save();
};

const updateNameById = (id, newName) => {
  const prevMessages = stormDb.db.get('messages').value();
  const newMessages = prevMessages.map(x => x.user === id ? { ...x, name: newName } : x);
  stormDb.db.get('messages').set(newMessages).save();
};

module.exports = {
  db: db,
  push: push,
  updateNameById: updateNameById
};