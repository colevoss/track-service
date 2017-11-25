import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackInput } from '../../types/ITrack';
import { deleteTrack } from '../deleteTrack';
import { mongo } from '../../utils/mongo';

let db: IDb;
const trackInput = {
  name: 'test-track',
};

let trackId;

let deleteResult;
let badDeleteResult;

beforeAll(async () => {
  db = await mongo();

  const trackInsert = await db.collection('tracks').insertOne(trackInput);

  trackId = trackInsert.insertedId;

  deleteResult = await deleteTrack(db, trackId);

  badDeleteResult = await deleteTrack(db, trackId);
});

afterAll(async () => {
  await db.collection('tracks').deleteMany({});
  await db.close();
});

test('Delete result is true if it works', () => {
  expect(deleteResult).toBeTruthy();
});

test('Delete result is false if it does not work', () => {
  expect(badDeleteResult).toBeFalsy();
});
