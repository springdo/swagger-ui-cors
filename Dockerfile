# Use the official Node.js image as the base image
FROM node:18.14.0-alpine 
# If you're using M1, M2 Mac, try this: 
# FROM  --platform=linux/amd64 node:16.14.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN sed -i 's#\.\/swagger-initializer\.js#\/swagger-init\/swagger-initializer\.js#g' ./node_modules/swagger-ui-dist/index.html && \
    cat ./node_modules/swagger-ui-dist/index.html

# Copy the application files
COPY . .

# Expose the port
EXPOSE 8080

# Start the application
CMD [ "node", "app.js" ]