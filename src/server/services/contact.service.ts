import { Contact } from '../models/contact.model';
import nodemailer from 'nodemailer';
import Logger from '../utils/logger.utils';

export default class ContactService {
  private HOST_MAIL: string;
  private HOST_NAME: string;
  private transporter;

  constructor(
    host: string,
    port: number,
    user: string,
    pass: string,
    hostMail: string,
    hostName: string,
  ) {
    this.HOST_MAIL = hostMail;
    this.HOST_NAME = hostName;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: { user, pass },
    });
  }

  public async send(payload: Contact): Promise<void> {
    const { name, email, message } = payload;

    Logger.info('[ContactService] Sending started');

    await Promise.all([
      this.transporter.sendMail({
        from: `${this.HOST_MAIL}`,
        to: email,
        subject: `Your Message Received <${this.HOST_NAME}>`,
        text: `Hello ${name},\n\nThank you for reaching out.\nI have received your message.\n\nBest regards,\n${this.HOST_NAME}`,
      }),
      this.transporter.sendMail({
        from: this.HOST_MAIL,
        to: this.HOST_MAIL,
        replyTo: email,
        subject: `Contact Form Message ${name} <${email}>`,
        text: message,
      }),
    ]);
  }
}
