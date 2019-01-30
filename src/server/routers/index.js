import { exist, add, list, get } from '../services/url';

/**
 * @description routes
 */
export default router => {
  router.post('/url/exist/', exist);
  router.post('/url/', add);
  router.get('/url/', list);
  router.get('/url/:shortUrl', get);
};
