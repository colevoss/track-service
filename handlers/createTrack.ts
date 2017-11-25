import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { createTrack } from '../transactions/createTrack';
import { getTrack } from '../transactions/getTrack';
import { ITrackInput } from '../types/ITrack';

export const createTrackHandler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: ProxyCallback
): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const trackInput: ITrackInput = JSON.parse(event.body);

  try {
    const db = await mongo();

    const trackId = await createTrack(db, trackInput);

    const track = await getTrack(db, trackId);

    cb(null, makeResponse(200, { track }));
  } catch (e) {
    console.error(e);

    cb(e, makeResponse(500, { error: e.toString() }));
  }
};
