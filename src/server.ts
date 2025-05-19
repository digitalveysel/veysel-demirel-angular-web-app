import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Logger from './server/utils/logger.utils';
import { Routes } from './server/models/routes.model';
import ContactController from './server/controllers/contact.controller';
import AppConfig from './server/app.config';

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

if (isMainModule(import.meta.url)) {
  const port = config.PORT;
  app.listen(port, () => {
    Logger.info(`[Server] Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
