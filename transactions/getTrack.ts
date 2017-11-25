import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack } from '../types/ITrack';

export const getTrack = async (db: IDb, trackId: string | ObjectId): Promise<ITrack> => {
  const track = await db.collection('tracks').findOne<ITrack>({
    _id: new ObjectId(trackId),
  });

  return track;
};
