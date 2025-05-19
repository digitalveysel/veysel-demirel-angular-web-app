import Joi from 'joi';

export interface Contact {
  name: string;
  email: string;
  message: string;
}

export const contactSchema = Joi.object<Contact>({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).required(),
});
