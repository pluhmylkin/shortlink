import axios from 'axios';

/**
 * @description Validation for component GenerateUrl
 * @param {Object} values
 */
export default async (values) => {
  const check = await axios.post(`/api/url/exist/`, {url: values.url});
  if (check.data.result) {
    return new Promise(() => {
      /* eslint-disable */
      throw { url: `Url already exist, short url: ${check.data.result.shortUrl}` };
    });
  }
  return Promise.resolve();
};
