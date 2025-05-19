import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import { Config, configSchema } from './models/config.model';
import Logger from './utils/logger.utils';

export default class AppConfig {
  public readonly values: Config;
  private static instance: AppConfig;

  private constructor() {
    loadEnv({ path: resolve(process.cwd(), '.env') });

    const { value, error } = configSchema.validate(process.env, {
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
      PORT: value.PORT,
      SMTP_HOST: value.SMTP_HOST,
      SMTP_PORT: value.SMTP_PORT,
      SMTP_USER: value.SMTP_USER,
      SMTP_PASS: value.SMTP_PASS,
      HOST_MAIL: value.HOST_MAIL,
      HOST_NAME: value.HOST_NAME,
    };
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}
