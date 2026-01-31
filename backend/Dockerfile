FROM node:20-slim

WORKDIR /app

# Copy package files from the current context (which will be /backend)
COPY package.json package-lock.json* ./

RUN npm install

# Copy everything else from /backend into /app
COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]