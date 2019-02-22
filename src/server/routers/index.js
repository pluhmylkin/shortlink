import { exist, add, list, get } from '../services/url';

/**
 * @description routes
 */
export default router => {
  /**
   * @swagger
   *
   *  /api/url/exist:
   *   post:
   *     summary: "Check the presence of the URL in the database"
   *     description: Check the presence of the URL in the database, if successful, the object is returned, otherwise false
   *     tags:
   *     - "url"
   *     parameters:
   *     - name: "url"
   *       in: "body"
   *       description: "URL to check"
   *       required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: If the object is not found, returns false.
   *         schema:
   *           $ref: '#/definitions/Result'
   */
  router.post('/url/exist/', exist);
  /**
   * @swagger
   *  /api/url/:
   *   post:
   *     summary: "Create a new URL in the database"
   *     description: If the sent URL is not in the database, a new URL is created
   *     tags:
   *     - "url"
   *     parameters:
   *     - name: "url"
   *       in: "body"
   *       description: "URL to create"
   *       required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the created object.
   *         schema:
   *           $ref: '#/definitions/Result'
   */
  router.post('/url/', add);
  /**
   * @swagger
   *  /api/url/:
   *   get:
   *     summary: "List of URLs"
   *     description: Getting a list of existing URLs in the database
   *     tags:
   *     - "url"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns a list of URLs.
   *         schema:
   *           $ref: '#/definitions/ResultArray'
   */
  router.get('/url/', list);
  /**
   * @swagger
   *  /api/url/{shortUri}:
   *   get:
   *     summary: "Getting the URL with short URL"
   *     description: Search the URL with short URL
   *     tags:
   *     - "url"
   *     parameters:
   *     - name: "shortUrl"
   *       in: "query"
   *       description: "Short URL"
   *       required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: If the object is not found, returns false.
   *         schema:
   *           $ref: '#/definitions/Result'
   */
  router.get('/url/:shortUrl', get);
};

/**
 * @swagger
 *  definitions:
 *   Url:
 *     type: "object"
 *     properties:
 *       url:
 *        type: "string"
 *        description: "Original URL"
 *       shortUrl:
 *        type: "string"
 *        description: "Short URL"
 *   Result:
 *     type: "object"
 *     properties:
 *       result:
 *        $ref: "#/definitions/Url"
 *   ResultArray:
 *     type: "object"
 *     properties:
 *       result:
 *        type: "array"
 *        items:
 *          $ref: "#/definitions/Url"
 */
