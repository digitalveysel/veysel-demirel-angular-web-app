import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import { Config, configSchema } from './models/config.model';
import Logger from './utils/logger.utils';

export default class AppConfig {
  public readonly values: Config;
  private static instance: AppConfig;

  private constructor(envPath = '.env') {
    loadEnv({ path: resolve(process.cwd(), envPath) });

    const { value, error } = configSchema.validate(process.env, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      Logger.error('[Config] Validation error');
      process.exit(1);
    }

    this.values = { ...value };
    Logger.info('[Config] Loaded configuration');
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}
