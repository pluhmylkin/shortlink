FROM node:8-slim

COPY ./ ./
RUN npm install
RUN npm run build

CMD ["node", "./public/server.js"]
EXPOSE 3008