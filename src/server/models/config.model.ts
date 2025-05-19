import Joi from 'joi';

export interface Config {
  PORT: number;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  HOST_MAIL: string;
  HOST_NAME: string;
}

export const configSchema = Joi.object<Config>({
  PORT: Joi.number().port().required(),
  SMTP_HOST: Joi.string().hostname().required(),
  SMTP_PORT: Joi.number().port().required(),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
  HOST_MAIL: Joi.string().required(),
  HOST_NAME: Joi.string().required(),
}).required();
