import express from 'express';
import serverless from 'serverless-http';
import AppConfig from '../../src/server/app.config';
import ContactController from '../../src/server/controllers/contact.controller';
import { Routes } from '../../src/server/models/routes.model';

const app = express();
const config = AppConfig.getInstance().values;
const contactController = new ContactController(config);

app.use(express.json());
app.use(`${Routes.API}${Routes.CONTACT}`, contactController.getRouter());
app.use('/**', async (req, res, next) => {
  try {
    const { AngularNodeAppEngine, writeResponseToNodeResponse } = await import('@angular/ssr/node');
    const angularApp = new AngularNodeAppEngine();
    const response = await angularApp.handle(req);
    if (response) {
      return writeResponseToNodeResponse(response, res);
    }
    next();
  } catch (err) {
    next(err);
  }
});

export const handler = serverless(app);
