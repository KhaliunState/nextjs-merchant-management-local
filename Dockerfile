# Use Node.js official image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies (this will install Next.js along with other dependencies)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Set the default command to run the Next.js dev server (with hot reloading)
CMD ["npm", "run", "dev"]
