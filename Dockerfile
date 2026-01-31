FROM node:20-slim
WORKDIR /app
# Tell Docker to look inside the backend folder for these files
COPY backend/package*.json ./
RUN npm install
COPY backend/ . 
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]