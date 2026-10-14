FROM node:22-slim
WORKDIR /app
COPY . .
RUN npm install --omit=dev || true
ENV DATA_DIR=/data PORT=3000
VOLUME /data
EXPOSE 3000
CMD ["node", "server.js"]
