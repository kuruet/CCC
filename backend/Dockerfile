FROM node:20-slim

WORKDIR /app

# The "Root Directory" setting makes the context the /backend folder
# So we copy directly from there
COPY package*.json ./

RUN npm install

COPY . .

# Use Railway's dynamic port
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]