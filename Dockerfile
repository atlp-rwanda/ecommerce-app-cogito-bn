FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV PORT 9090
EXPOSE $PORT
CMD [ "npm","run","dev" ]