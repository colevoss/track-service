import { ObjectId } from 'mongodb';

export interface ITrack {
  _id: ObjectId;

  name: string;

  muted: boolean;
  soloed: boolean;

  vol: number;
  color: string;

  clipIds: ObjectId[];
  projectId: ObjectId;

  order: number;
}

export interface ITrackInput {
  name: string;
  projectId: string;
}

export interface ITrackUpdateInput extends Partial<ITrack> {
  id: string;
}
