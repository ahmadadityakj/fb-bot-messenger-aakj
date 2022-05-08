import StormDB from "stormdb";

const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);
db.default({ messages: [], states: [] });

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

const pushState = (data) => {
  db.get('states').push(data).save();
};

const updateStateById = (id, newState) => {
  const prevStates = db.get('states').value();
  const newStates = prevStates.map(x => x.user === id ? { ...x, state: newState } : x);
  db.get('states').set(newStates).save();
};

const getStateById = (id) => {
  const states = db.get('states').value();
  const state = states.find(x => x.user === id);
  return state.state;
};

module.exports = {
  db: db,
  push: push,
  updateNameById: updateNameById,
  updateDateById: updateDateById,
  getDateById: getDateById,
  pushState: pushState,
  updateStateById: updateStateById,
  getStateById: getStateById
};