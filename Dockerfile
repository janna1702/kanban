FROM mhart/alpine-node
WORKDIR /app
COPY . .
RUN npm run install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run start"]
