import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackInput } from '../../types/ITrack';
import { createTrack } from '../createTrack';
import { mongo } from '../../utils/mongo';

let db: IDb;
const pid = '59e543bc28ac708271e5084d';
const oPid = new ObjectId(pid);

const trackInput: ITrackInput = {
  name: 'test-track',
  projectId: pid,
};

let trackId;
let track: ITrack;

const createABunchOfTracksForProject = async (db: IDb) => {
  await db
    .collection('tracks')
    .insertMany([{ name: 'test-track1', projectId: oPid }, { name: 'test-track2', projectId: oPid }]);
};

beforeAll(async () => {
  db = await mongo();

  await createABunchOfTracksForProject(db);

  trackId = await createTrack(db, trackInput);

  track = await db.collection('tracks').findOne<ITrack>({ _id: trackId });
});

afterAll(async () => {
  await db.collection('tracks').deleteMany({});
  await db.close();
});

test('Creates a track in the database', () => {
  expect(track.name).toBe(trackInput.name);
});

test('Transforms projectId to an ObjectId', () => {
  expect(track.projectId).toBeInstanceOf(ObjectId);
});

test('Sets order to be next track in project', () => {
  expect(track.order).toBe(3);
});

test('Generates defaults for other values', () => {
  expect(track).toHaveProperty('vol', 0);
  expect(track).toHaveProperty('muted', false);
  expect(track).toHaveProperty('soloed', false);
  expect(track).toHaveProperty('color', 'FFFFFF');
  expect(track).toHaveProperty('clipIds', []);
});
