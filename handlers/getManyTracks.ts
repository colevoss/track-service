import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { getManyTracks } from '../transactions/getManyTracks';

export const getManyTracksHandler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: ProxyCallback
): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const trackIdsParam = event.queryStringParameters.ids;

  const trackIds = trackIdsParam.split(',');

  try {
    const db = await mongo();

    const tracks = await getManyTracks(db, trackIds);

    cb(null, makeResponse(200, { tracks }));
  } catch (e) {
    console.error(e);

    cb(
      e,
      makeResponse(500, {
        error: e.toString(),
      })
    );
  }
};
