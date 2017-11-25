import { Db as IDb, ObjectId } from 'mongodb';

export const deleteTrack = async (db: IDb, trackId: string | ObjectId): Promise<boolean> => {
  const trackDelete = await db.collection('tracks').deleteOne({ _id: new ObjectId(trackId) });

  return trackDelete.result.ok === 1 && trackDelete.result.n === 1;
};
