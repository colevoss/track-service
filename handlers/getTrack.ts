import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { getTrack } from '../transactions/getTrack';

export const getTrackHandler = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const trackId = event.pathParameters.id;

  try {
    const db = await mongo();

    const track = await getTrack(db, trackId);

    if (track == null) {
      cb(
        null,
        makeResponse(400, {
          error: `A track with ID of ${trackId} could not be found`,
        })
      );

      return;
    }

    cb(null, makeResponse(200, { track }));
  } catch (e) {
    console.error(e);

    cb(e, makeResponse(500, { error: e.toString() }));
  }
};
