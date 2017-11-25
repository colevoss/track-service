import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackInput } from '../../types/ITrack';
import { addClip } from '../addClip';
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

test('Adds a clip id to the track', async () => {
  const track = await addClip(db, trackId, clipId);

  const clipIds = track.clipIds;

  expect(clipIds).toHaveLength(1);
  expect(clipIds[0].toHexString()).toBe(clipId);
});

test('Adding a duplicate clip id does not duplicate it', async () => {
  const track = await addClip(db, trackId, clipId);

  const clipIds = track.clipIds;

  expect(clipIds).toHaveLength(1);
});
