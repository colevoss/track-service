import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackInput } from '../../types/ITrack';
import { removeClip } from '../removeClip';
import { mongo } from '../../utils/mongo';

let db: IDb;

const clipId1 = '59e543bc28ac708271e5084d';
const clipId2 = '59e5527ad38f8cc0bf8c31a0';
let trackId;

beforeAll(async () => {
  db = await mongo();

  const trackInsert = await db.collection('tracks').insertOne({
    name: 'test track',
    clipIds: [new ObjectId(clipId1), new ObjectId(clipId2)],
  });

  trackId = trackInsert.insertedId;
});

afterAll(async () => {
  await db.collection('tracks').deleteMany({});
  await db.close();
});

test('Removes the given clip id', async () => {
  const track = await removeClip(db, trackId, clipId1);

  expect(track.clipIds).toHaveLength(1);
});
