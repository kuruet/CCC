# 1. Use an official Node.js image that includes npm
FROM node:20-slim

# 2. Set the working directory
WORKDIR /app

# 3. Copy package files first (better for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your backend code
COPY . .

# 6. Railway provides the PORT environment variable
ENV PORT=8080
EXPOSE 8080

# 7. Start the server
CMD ["npm", "start"]