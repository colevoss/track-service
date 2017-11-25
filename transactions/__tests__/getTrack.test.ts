import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackInput } from '../../types/ITrack';
import { getTrack } from '../getTrack';
import { mongo } from '../../utils/mongo';

let db: IDb;
let track;
let trackId: ObjectId;

beforeAll(async () => {
  db = await mongo();

  const trackInsert = await db.collection('tracks').insertOne({
    name: 'test-track',
    vol: 0,
    muted: false,
    soloed: true,
    color: 'FFFFFF',
  });

  trackId = trackInsert.insertedId;

  track = await getTrack(db, trackId);
});

afterAll(async () => {
  await db.collection('tracks').deleteMany({});
  await db.close();
});

test('Gets project from database by id', () => {
  expect(track.name).toBe('test-track');
  expect(track.vol).toBe(0);
  expect(track.muted).toBe(false);
  expect(track.soloed).toBe(true);
  expect(track.color).toBe('FFFFFF');
});

test('Track has matching id', () => {
  expect(trackId.toHexString()).toBe(track._id.toHexString());
});
