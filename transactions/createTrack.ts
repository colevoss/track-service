import { Db as IDb, ObjectId } from 'mongodb';
import { ITrackInput } from '../types/ITrack';

const generateDefaultTrackData = () => ({
  volume: 0,
  color: 'FFFFFF',
  muted: false,
  soloed: false,
  regionIds: [],
  name: 'untitled',
});

export const createTrack = async (db: IDb, trackInput: ITrackInput): Promise<ObjectId> => {
  const projectId = new ObjectId(trackInput.projectId);

  const tracksCollection = db.collection('tracks');

  const projectTrackCount = await tracksCollection.find({ projectId }).count();

  const trackData = {
    ...generateDefaultTrackData(),
    ...trackInput,
    projectId,
    order: projectTrackCount + 1,
  };

  const trackInsert = await db.collection('tracks').insertOne(trackData);

  if (trackInsert.insertedCount === 0) {
    throw 'A track was not created';
  }

  const trackId = trackInsert.insertedId;

  return trackId;
};
