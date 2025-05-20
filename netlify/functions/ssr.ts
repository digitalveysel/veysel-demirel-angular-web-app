import { AngularNodeAppEngine, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import serverless from 'serverless-http';
import AppConfig from '../../src/server/app.config';
import ContactController from '../../src/server/controllers/contact.controller';
import { Routes } from '../../src/server/models/routes.model';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const config = AppConfig.getInstance().values;
const contactController = new ContactController(config);

app.use(express.json());
app.use(`${Routes.API}${Routes.CONTACT}`, contactController.getRouter());
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

export const handler = serverless(app);
