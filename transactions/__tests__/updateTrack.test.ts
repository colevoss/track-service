import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackInput, ITrackUpdateInput } from '../../types/ITrack';
import { updateTrack } from '../updateTrack';
import { mongo } from '../../utils/mongo';

let db: IDb;
const pid = '59e543bc28ac708271e5084d';
const oPid = new ObjectId(pid);

const trackInput = {
  name: 'test-track',
  projectId: oPid,
  volume: 0,
  color: '444444',
  regionIds: [new ObjectId(pid)],
  order: 1,
};

let updatedTrack;
let updateTrackData: ITrackUpdateInput;

let trackId: ObjectId;
let track: ITrack;

beforeAll(async () => {
  db = await mongo();

  const trackInsert = await db.collection('tracks').insertOne(trackInput);

  trackId = trackInsert.insertedId;

  updateTrackData = {
    name: 'test-track-updated',
    projectId: new ObjectId('59dc2f34eafc40e0d61b6297'),
    color: '000000',
    volume: -0.4,
    id: trackId.toHexString(),
    _id: trackId,
    regionIds: [new ObjectId(pid), new ObjectId(pid)],
    order: 10,
  };

  updatedTrack = await updateTrack(db, trackId, updateTrackData);
});

afterAll(async () => {
  await db.collection('tracks').deleteMany({});
  await db.close();
});

test('Updates the exisiting track by id', () => {
  expect(updatedTrack.color).toBe(updateTrackData.color);
  expect(updatedTrack.volume).toBe(updateTrackData.volume);
});

describe('Does not update certain keys', () => {
  test('.order', () => {
    expect(updatedTrack.order).toBe(1);
  });

  test('.regionIds', () => {
    expect(updatedTrack.regionIds).toHaveLength(1);
  });

  test('.projectId', () => {
    expect(updatedTrack.projectId.toHexString()).toBe(oPid.toHexString());
  });
});
