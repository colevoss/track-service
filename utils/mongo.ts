import { MongoClient, Db as IDb } from 'mongodb';

const env = process.env.NODE_ENV;

let MONGO_DB_URI: string = process.env.MONGO_DB_URI || '';
let MONGO_DB_NAME: string = process.env.MONGO_DB_NAME || '';
let MONGO_DB_PARAMS: string = process.env.MONGO_DB_PARAMS || '';

if (env === 'test') {
  MONGO_DB_URI = 'mongodb://localhost:27017';
  MONGO_DB_NAME = 'adio-tracks-test';
  MONGO_DB_PARAMS = '';
}

let dbCache: IDb;

const mongoConnectString = (): string => {
  let mongoString = `${MONGO_DB_URI}/${MONGO_DB_NAME}`;

  if (!!MONGO_DB_PARAMS) {
    mongoString += `?${MONGO_DB_PARAMS}`;
  }

  return mongoString;
};

export const mongo = async (): Promise<IDb> => {
  if (dbCache != null) return dbCache;

  const db = await MongoClient.connect(mongoConnectString());

  db.serverConfig;

  dbCache = db;

  return dbCache;
};
