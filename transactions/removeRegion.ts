import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack } from '../types/ITrack';
import { getTrack } from './getTrack';

export const removeRegion = async (
  db: IDb,
  trackId: string | ObjectId,
  regionId: string | ObjectId
): Promise<ITrack> => {
  const regionOid = new ObjectId(regionId);
  const trackOId = new ObjectId(trackId);

  const trackUpdate = await db.collection('tracks').findOneAndUpdate(
    {
      _id: trackOId,
    },
    {
      $pull: {
        regionIds: regionOid,
      },
    }
  );

  return await getTrack(db, trackOId);
};
