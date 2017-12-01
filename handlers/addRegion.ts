import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { addRegion } from '../transactions/addRegion';

export const addRegionHandler = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const trackId = event.pathParameters.id;
  const { regionId } = JSON.parse(event.body);

  try {
    const db = await mongo();

    const track = await addRegion(db, trackId, regionId);

    cb(null, makeResponse(200, { track }));
  } catch (e) {
    console.error(e);

    cb(e, makeResponse(500, { error: e.toString() }));
  }
};
