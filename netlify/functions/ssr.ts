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

export const handler = serverless(app);
