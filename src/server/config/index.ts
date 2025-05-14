import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import Joi from 'joi';
import Logger from '../utils/logger.utils';

interface AppConfig {
  MONGO_URI: string;
  DB_NAME: string;
  PORT: number;
}

const schema = Joi.object<AppConfig>({
  MONGO_URI: Joi.string().uri().required(),
  DB_NAME: Joi.string().min(1).required(),
  PORT: Joi.number().port().required(),
})
  .unknown()
  .required();

class Config {
  public readonly values: AppConfig;
  private static instance: Config;

  private constructor() {
    loadEnv({ path: resolve(process.cwd(), '.env') });
    const { value, error } = schema.validate(process.env, { abortEarly: false });
    if (error) {
      Logger.error('[Config] Validation error');
      process.exit(1);
    }
    Logger.info('[Config] Loaded configuration');
    this.values = {
      MONGO_URI: value.MONGO_URI,
      DB_NAME: value.DB_NAME,
      PORT: value.PORT,
    };
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config;
