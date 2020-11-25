FROM node:latest

# Install angular globally
RUN npm install -g @angular/cli@latest

# Change the directory
WORKDIR /app

# Copy the project content
COPY . .

# Install project dependencies
RUN npm i

# Command to run
ENTRYPOINT ["npm", "run", "start"]

# Expose the port for HTTP access
EXPOSE 4200 49153
