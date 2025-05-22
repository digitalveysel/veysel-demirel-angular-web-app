import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import serverless from 'serverless-http';
import AppConfig from '../../src/server/app.config';
import { Routes } from '../../src/server/models/routes.model';
import ContactController from '../../src/server/controllers/contact.controller';

const app = express();
const config = AppConfig.getInstance().values;
const contactController = new ContactController(config);

app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (origin !== config.ALLOWED_ORIGIN) {
        callback(new Error('CORS policy: This origin is not allowed!'));
        return;
      }

      callback(null, true);
    },
    methods: 'POST',
    allowedHeaders: ['Content-Type'],
  }),
);
app.use(express.json());
app.use(`${Routes.API}${Routes.CONTACT}`, contactController.getRouter());

export const handler = serverless(app);
