FROM node:8-slim

COPY ./ ./
RUN yarn install --production

CMD ["node", "./index.js"]
