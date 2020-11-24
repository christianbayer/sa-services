FROM node:latest

# Create app directory
WORKDIR /app

# Copy the packages definition
COPY package*.json ./

# Install packages
RUN npm install

# Bundle app source
COPY . .

# Start server
CMD [ "npm", "run", "dev" ]

# Expose the app port
EXPOSE 80