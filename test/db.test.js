import StormDB from "stormdb";
import differenceBy from 'lodash/differenceBy';
import stormDb from "../src/services/db";

const dummyData = [
  { user: '12345', name: 'john', messages: [], state: 'welcome', birthDate: '' },
  { user: '45678', name: 'robert', messages: [], state: 'birthdate', birthDate: '1990-01-30' },
];

beforeAll(() => {
  stormDb.db.default({ messages: [] });
  stormDb.db.get('messages').set(dummyData);
});

describe('Database Test', () => {
  test('Initiate Data Test', () => {
    const data = stormDb.db.get('messages').value();
    expect(differenceBy(data, dummyData)).toStrictEqual([]);
  })
  test('Get Message By Id Test', () => {
    const data = stormDb.getMessageById('12345');
    expect(differenceBy(data, dummyData[0])).toStrictEqual([]);
  })
  test('Update Name By Id Test', () => {
    stormDb.updateNameById('12345', 'aditya');
    const data = stormDb.getMessageById('12345');
    expect(differenceBy(data, { ...dummyData[0], name:  'aditya'} )).toStrictEqual([]);
  })
})
