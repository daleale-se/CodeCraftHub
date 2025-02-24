# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for npm installation
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app will run on (usually 5000 for your app)
EXPOSE 5000

# Set the environment variable for MongoDB URI (you can override this in your docker-compose file)
ENV DB_URI=mongodb://mongodb:27017/user-management

# Start the application using `npm run dev` or `npm start`
CMD ["npm", "run", "dev"]
