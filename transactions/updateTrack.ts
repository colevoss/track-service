import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack, ITrackUpdateInput } from '../types/ITrack';
import { getTrack } from './getTrack';

export const updateTrack = async (
  db: IDb,
  trackId: string | ObjectId,
  trackData: ITrackUpdateInput
): Promise<ITrack> => {
  const { id, _id, projectId, order, regionIds, ...trackUpdateData } = trackData;

  const trackOId = new ObjectId(trackId);

  const trackUpdate = await db.collection('tracks').findOneAndUpdate(
    {
      _id: trackOId,
    },
    { $set: trackUpdateData }
  );

  return await getTrack(db, trackId);
};
