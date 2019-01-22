import convict from 'convict';
import path from 'path';
import { bind } from 'ramda';

const SCHEMA = {
  env: {
    doc: 'The application environment.',
    format: ['local'],
    default: 'local',
    env: 'NODE_ENV',
  },
  mongodb: { doc: 'Mongo connection string', format: String, default: '', env: 'MONGODB' },
  http:{
    doc: 'Http listening port',
    format: 'port',
    port: 3008,
    env: 'HTTP_PORT',
    arg: 'http-port',
  }
};

export default () => {
  const conf = convict(SCHEMA);
  const filePath = path.resolve(__dirname, '..', '..', 'cfg', `${conf.get('env')}.json`);
  conf.loadFile(filePath);
  conf.validate();
  return {
    get: bind(conf.get, conf),
  };
};
