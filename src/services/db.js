import StormDB from "stormdb";

const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);
db.default({ messages: [] });

const push = (data) => {
  db.get('messages').push(data).save();
};

const updateNameById = (id, newName) => {
  const prevMessages = db.get('messages').value();
  const newMessages = prevMessages.map(x => x.user === id ? { ...x, name: newName } : x);
  db.get('messages').set(newMessages).save();
};

const updateDateById = (id, newDate) => {
  const prevMessages = db.get('messages').value();
  const newMessages = prevMessages.map(x => x.user === id ? { ...x, birthDate: newDate } : x);
  db.get('messages').set(newMessages).save();
};

const getDateById = (id) => {
  const messages = db.get('messages').value();
  const message = messages.find(x => x.user === id);
  return message.birthDate;
};

const updateStateById = (id, newState) => {
  const prevMessages = db.get('messages').value();
  const newMessages = prevMessages.map(x => x.user === id ? { ...x, state: newState } : x);
  db.get('messages').set(newMessages).save();
};

const getStateById = (id) => {
  const messages = db.get('messages').value();
  const message = messages.find(x => x.user === id);
  return message?.state;
};

module.exports = {
  db: db,
  push: push,
  updateNameById: updateNameById,
  updateDateById: updateDateById,
  getDateById: getDateById,
  updateStateById: updateStateById,
  getStateById: getStateById
};