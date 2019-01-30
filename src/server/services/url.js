import shortid from 'shortid';

/**
 * @description
 * @param {*} ctx
 */
const findUrl = async ctx => {
  const { db } = ctx;
  const { url } = ctx.request.body;
  const find = { url };
  const option = {
    projection: {
      url: 1,
      shortUrl: 1,
      _id: 0,
    },
  };
  const sort = { url: 1, shortUrl: 1 };
  const result = await db
    .collection('url')
    .find(find, option)
    .sort(sort)
    .toArray();
  if (result.length) {
    return result[0];
  }
  return false;
};

/**
 * @description
 * @param {Object} ctx
 */
export const exist = async ctx => {
  ctx.response.body = { result: await findUrl(ctx) };
};

/**
 * @description
 * @param {*} ctx
 */
export const add = async ctx => {
  let result = await findUrl(ctx);
  const { db } = ctx;
  if (!result) {
    const { url } = ctx.request.body;
    const shortUrl = shortid.generate();
    result = { url, shortUrl };
    await db.collection('url').insertOne(result);
  }
  ctx.response.body = { result };
};

/**
 * @description
 * @param {*} ctx
 */
export const list = async ctx => {
  const { db } = ctx;
  const find = {};
  const option = {
    projection: {
      url: 1,
      shortUrl: 1,
    },
  };
  const sort = { url: 1, shortUrl: 1 };
  const result = await db
    .collection('url')
    .find(find, option)
    .sort(sort)
    .toArray();

  ctx.response.body = { result };
};

export const get = async ctx => {
  const { db } = ctx;
  const { shortUrl } = ctx.params;
  const find = { shortUrl };
  const option = {
    projection: {
      url: 1,
      shortUrl: 1,
      _id: 0,
    },
  };
  const sort = { url: 1, shortUrl: 1 };
  const result = await db
    .collection('url')
    .find(find, option)
    .sort(sort)
    .toArray();
  ctx.response.body = { result: result.length ? result[0] : false };
};
