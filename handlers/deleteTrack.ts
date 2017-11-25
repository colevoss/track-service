import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { deleteTrack } from '../transactions/deleteTrack';

export const deleteTrackHandler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: ProxyCallback
): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const trackId = event.pathParameters.id;

  try {
    const db = await mongo();

    const deleteTrackResult = await deleteTrack(db, trackId);

    cb(null, makeResponse(200, { success: deleteTrackResult }));
  } catch (e) {
    console.error(e);

    cb(e, makeResponse(500, { error: e.toString() }));
  }
};
