import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { updateTrack } from '../transactions/updateTrack';
import { ITrackUpdateInput } from '../types/ITrack';

export const updateTrackHandler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: ProxyCallback
): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const trackId = event.pathParameters.id;
  const updateTrackData: ITrackUpdateInput = JSON.parse(event.body);

  try {
    const db = await mongo();

    const updatedTrack = await updateTrack(db, trackId, updateTrackData);

    cb(null, makeResponse(200, { track: updatedTrack }));
  } catch (e) {
    console.error(e);

    cb(e, makeResponse(500, { error: e.toString() }));
  }
};
