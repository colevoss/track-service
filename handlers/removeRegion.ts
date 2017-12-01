import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { removeRegion } from '../transactions/removeRegion';

export const removeRegionHandler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: ProxyCallback
): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const trackId = event.pathParameters.id;
  const regionId = event.pathParameters.clipId;

  try {
    const db = await mongo();

    const track = await removeRegion(db, trackId, regionId);

    cb(null, makeResponse(200, { track }));
  } catch (e) {
    console.error(e);

    cb(e, makeResponse(500, { error: e.toString() }));
  }
};
