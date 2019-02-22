import Koa from 'koa';
import KoaRouter from 'koa-router';
import path from 'path';
import koaBody from 'koa-bodyparser';
import convert from 'koa-convert';
import mount from 'koa-mount';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-koa';

import koaStatic from 'koa-static';
import send from 'koa-send';
import { MongoClient } from 'mongodb';
import createConfig from './config';
import createLogger from './logger';
import routers from './routers';

const app = new Koa();
const router = new KoaRouter({
  prefix: '/api',
});

const logger = createLogger('server');

const config = createConfig();

const DB_NAME = 'short-links';

process.on('unhandledRejection', err => {
  logger.error(`unhandledRejection - ${err.message} - ${err.stack}`);
});

process.on('uncaughtException', err => {
  logger.error(`Caught exception: ${err}\n`);
});

const options = {
  swaggerDefinition: {
    info: {
      title: 'Swagger API for project shortlink',
      version: '1.0.0',
      description: 'Example of work with Swagger',
    },
    host: `${config.get('host')}:${config.get('http.port')}`,
    paths: {},
    basePath: '/api',
    tags: [
      {
        name: 'url',
        description: 'Work with URL',
      },
    ],
  },
  apis: ['./src/server/routers/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
async function start() {
  logger.info('Connecting to mongodb.');
  const client = await MongoClient.connect(config.get('mongodb'), { useNewUrlParser: true });
  const db = client.db(DB_NAME);

  router.use(koaBody());

  app.context.db = db;
  app.context.logger = logger;
  app.context.config = config;
  routers(router, logger, db);
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(koaStatic(path.resolve(__dirname, '..', '..')));

  app.use(swaggerUi.serve);
  app.use(convert(mount('/swagger', swaggerUi.setup(swaggerSpec))));
  app.use(async ctx => {
    await send(ctx, path.join(__dirname, '..', '..', '/public', 'index.html'));
  });
  await app.listen(config.get('http.port'));
  logger.info(`HTTP server started at port ${config.get('http.port')}.`);

  db.collection('url').createIndex({ url: 1, shortUrl: 1 });
}

start();
