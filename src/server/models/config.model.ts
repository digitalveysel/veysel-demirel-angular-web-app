import Joi from 'joi';

export interface Config {
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
}

export const ConfigSchema = Joi.object<Config>({
  SMTP_HOST: Joi.string().hostname().required(),
  SMTP_PORT: Joi.number().port().required(),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
}).required();
