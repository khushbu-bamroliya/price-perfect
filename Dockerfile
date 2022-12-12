FROM node:18-alpine

ENV SHOPIFY_API_KEY d53f798c2609a33772145823e94789cb
EXPOSE 8081
WORKDIR /app
COPY web .
RUN npm install
RUN cd frontend && npm install && npm run build
CMD ["npm", "run", "serve"]