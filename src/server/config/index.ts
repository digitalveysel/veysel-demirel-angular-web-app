import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import Joi from 'joi';
import Logger from '../utils/logger.utils';

interface AppConfig {}

const schema = Joi.object<AppConfig>({}).unknown().required();

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
    this.values = {};
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config;
