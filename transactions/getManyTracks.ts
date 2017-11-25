import { Db as IDb, ObjectId } from 'mongodb';
import { ITrack } from '../types/ITrack';

const mapToObjectIds = (ids: Array<string | ObjectId>): ObjectId[] => ids.map(id => new ObjectId(id));

export const getManyTracks = async (db: IDb, trackIds: Array<string | ObjectId>): Promise<ITrack[]> => {
  const tracks = await db
    .collection('tracks')
    .find<ITrack>({
      _id: {
        $in: mapToObjectIds(trackIds),
      },
    })
    .sort({ order: 1 })
    .toArray();

  return tracks;
};
