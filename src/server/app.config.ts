import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import { Config, ConfigSchema } from './models/config.model';
import Logger from './utils/logger.utils';

export default class AppConfig {
  public readonly values: Config;
  private static instance: AppConfig;

  private constructor() {
    loadEnv({ path: resolve(process.cwd(), '.env') });

    const { value, error } = ConfigSchema.validate(process.env, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      Logger.error('[Config] Validation error');
      process.exit(1);
    }

    Logger.info('[Config] Loaded configuration');
    this.values = {
      SMTP_HOST: value.SMTP_HOST,
      SMTP_PORT: Number(value.SMTP_PORT),
      SMTP_USER: value.SMTP_USER,
      SMTP_PASS: value.SMTP_PASS,
    };
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}
