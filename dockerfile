FROM node:11-alpine

# Copy files.
WORKDIR /bong
COPY . /bong

# Install required packages.
RUN ["npm", "install"]

# Run command.
CMD ["node", "main.js"]
