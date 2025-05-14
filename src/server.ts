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
import ArticleController from './server/controllers/article.controller';
import Config from './server/config';
import Database from './server/database';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const articleController = new ArticleController();

app.use(express.json());
app.use('/api/articles', articleController.router);

const bootstrap = async (): Promise<void> => {
  const cInstance = Config.getInstance();
  const dInstance = Database.getInstance();
  const { PORT } = cInstance.values;

  await dInstance.connect();
  app.listen(PORT, () => {
    Logger.info(`[Server] Express server listening on http://localhost:${PORT}`);
  });
};

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
  bootstrap().catch((error) => {
    Logger.error(`[Server] Bootstrap failed: ${error}`);
    process.exit(1);
  });
}

export const reqHandler = createNodeRequestHandler(app);
