import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackInput } from '../../types/ITrack';
import { removeRegion } from '../removeRegion';
import { mongo } from '../../utils/mongo';

let db: IDb;

const regionId1 = '59e543bc28ac708271e5084d';
const regionId2 = '59e5527ad38f8cc0bf8c31a0';
let trackId;

beforeAll(async () => {
  db = await mongo();

  const trackInsert = await db.collection('tracks').insertOne({
    name: 'test track',
    regionIds: [new ObjectId(regionId1), new ObjectId(regionId2)],
  });

  trackId = trackInsert.insertedId;
});

afterAll(async () => {
  await db.collection('tracks').deleteMany({});
  await db.close();
});

test('Removes the given region id', async () => {
  const track = await removeRegion(db, trackId, regionId1);

  expect(track.regionIds).toHaveLength(1);
});
