import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack } from '../types/ITrack';
import { getTrack } from './getTrack';

export const addClip = async (db: IDb, trackId: string | ObjectId, clipId: string | ObjectId): Promise<ITrack> => {
  const clipOId = new ObjectId(clipId);
  const trackOId = new ObjectId(trackId);

  const trackUpdate = await db.collection('tracks').findOneAndUpdate(
    {
      _id: trackOId,
    },
    {
      $addToSet: {
        clipIds: clipOId,
      },
    }
  );

  return await getTrack(db, trackOId);
};
