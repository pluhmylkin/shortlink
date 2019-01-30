import NotFound from '../components/NotFound';
import Main from '../pages/Main';
import UrlRedirect from '../pages/UrlRedirect';

/**
 * @description Routes
 */
export default [
  {
    path: '/url/:shortUrl',
    component: UrlRedirect,
  },
  {
    path: '/',
    component: Main,
  },
  {
    component: NotFound,
  },
];
