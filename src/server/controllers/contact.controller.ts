import { Router, Request, Response, NextFunction } from 'express';
import { Contact, contactSchema } from '../models/contact.model';
import ContactService from '../services/contact.service';
import { Config } from '../models/config.model';
import Logger from '../utils/logger.utils';

export default class ContactController {
  private readonly router = Router();
  private readonly service: ContactService;

  constructor(config: Config) {
    this.service = new ContactService(
      config.SMTP_HOST,
      config.SMTP_PORT,
      config.SMTP_USER,
      config.SMTP_PASS,
      config.HOST_MAIL,
      config.HOST_NAME,
    );
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes(): void {
    this.router.post('/', this.send.bind(this));
  }

  private async send(
    req: Request<Contact>,
    res: Response<Contact>,
    next: NextFunction,
  ): Promise<void> {
    Logger.info('[ContactController] New send call');
    try {
      const { value, error } = contactSchema.validate(req.body, { abortEarly: false });

      if (error) {
        const eMessages = error.details.map((detail) => detail.message);
        throw new Error(`[ContactService] Validation failed: ${eMessages}`);
      }

      await this.service.send(value);
      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  }
}
