import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import Logger from '../utils/logger.utils';
import Config from '../config';

class Database {
  private client: MongoClient;
  private db!: Db;
  private static instance: Database;

  private constructor() {
    const { MONGO_URI, DB_NAME } = Config.getInstance().values;
    this.client = new MongoClient(MONGO_URI, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    this.db = this.client.db(DB_NAME);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<Db> {
    await this.client.connect();
    Logger.info(`[Database] Connected to MongoDB: ${this.db.databaseName}`);
    return this.db;
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
    Logger.info('[Database] Disconnected from MongoDB');
  }

  public getDb(): Db {
    return this.db;
  }
}

export default Database;
