import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack } from '../types/ITrack';
import { getTrack } from './getTrack';

export const addRegion = async (db: IDb, trackId: string | ObjectId, regionId: string | ObjectId): Promise<ITrack> => {
  const regionOId = new ObjectId(regionId);
  const trackOId = new ObjectId(trackId);

  const trackUpdate = await db.collection('tracks').findOneAndUpdate(
    {
      _id: trackOId,
    },
    {
      $addToSet: {
        regionIds: regionOId,
      },
    }
  );

  return await getTrack(db, trackOId);
};
