FROM node:8-slim

COPY ./ ./
RUN yarn install --production

CMD ["node", "./public/server.js"]
EXPOSE 3008