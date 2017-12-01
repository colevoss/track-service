import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackInput } from '../../types/ITrack';
import { addRegion } from '../addRegion';
import { mongo } from '../../utils/mongo';

let db: IDb;

const clipId = '59e543bc28ac708271e5084d';
let trackId;

beforeAll(async () => {
  db = await mongo();

  const trackInsert = await db.collection('tracks').insertOne({ name: 'test track' });
  trackId = trackInsert.insertedId;
});

afterAll(async () => {
  await db.collection('tracks').deleteMany({});
  await db.close();
});

test('Adds a region id to the track', async () => {
  const track = await addRegion(db, trackId, clipId);

  const clipIds = track.regionIds;

  expect(clipIds).toHaveLength(1);
  expect(clipIds[0].toHexString()).toBe(clipId);
});

test('Adding a duplicate region id does not duplicate it', async () => {
  const track = await addRegion(db, trackId, clipId);

  const clipIds = track.regionIds;

  expect(clipIds).toHaveLength(1);
});
