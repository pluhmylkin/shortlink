import Koa from 'koa';
import KoaRouter from 'koa-router';
import path from 'path';
import koaStatic from 'koa-static';
import send from 'koa-send';
import { MongoClient } from 'mongodb';
import createConfig from './config';
import createLogger from './logger';

const app = new Koa();
const router = new KoaRouter();
const logger = createLogger('server');
const config = createConfig();

process.on('unhandledRejection', err => {
  logger.error(`unhandledRejection - ${err.message} - ${err.stack}`);
});

process.on('uncaughtException', err => {
  logger.error(`Caught exception: ${err}\n`);
});

async function start() {
  app.context.logger = logger;
  app.context.config = config;
  logger.info('Connecting to mongodb.');
  const db = await MongoClient.connect(config.get('mongodb'), { useNewUrlParser: true });
  app.context.db = db;
  // router.post('/graphql', authCheckMiddleware(logger));

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(koaStatic(path.resolve(__dirname, '..', '..')));

  app.use(async ctx => {
    await send(ctx, path.join(__dirname, '..', '..', '/public', 'index.html'));
  });
  await app.listen(config.get('http.port'));
  logger.info(`HTTP server started at port ${config.get('http.port')}.`);
}

start();
