import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackInput } from '../../types/ITrack';
import { getManyTracks } from '../getManyTracks';
import { mongo } from '../../utils/mongo';

let db: IDb;
let tracks;
let trackIds: ObjectId[];

const trackInputs = [
  { name: 'test track 1', order: 3 },
  { name: 'test track 2', order: 1 },
  { name: 'test track 1', order: 2 },
];

beforeAll(async () => {
  const db = await mongo();

  const tracksInsert = await db.collection('tracks').insertMany(trackInputs);

  trackIds = tracksInsert.insertedIds;

  tracks = await getManyTracks(db, trackIds);
});

afterAll(async () => {
  await db.collection('tracks').deleteMany({});
  await db.close();
});

test('Gets all tracks for provided ids', () => {
  expect(tracks).toHaveLength(trackInputs.length);
});

test('Sorts tracks by order', () => {
  expect(tracks[0]).toHaveProperty('order', 1);
  expect(tracks[1]).toHaveProperty('order', 2);
  expect(tracks[2]).toHaveProperty('order', 3);
});
