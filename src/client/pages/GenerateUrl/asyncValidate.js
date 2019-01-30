import axios from 'axios';

/**
 * @description Asynchronous validation for component GenerateUrl
 * @param {Object} values - params from ReduxForm
 */
export default async values => {
  const check = await axios.post(`/api/url/exist/`, { url: values.url });
  if (check.data.result) {
    return new Promise(() => {
      /* eslint-disable */
      throw { url: `Url already exist, short url: ${check.data.result.shortUrl}` };
    });
  }
  return Promise.resolve();
};
