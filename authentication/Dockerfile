FROM golang:latest

# Add DEP
RUN curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh

# Change the directory
WORKDIR $GOPATH/src/authentication

# Copy the project content
COPY . $GOPATH/src/authentication

# Install project dependencies
RUN dep ensure --vendor-only

# Install the app
RUN go install authentication
COPY .env $GOPATH/bin

# Change the directory
WORKDIR $GOPATH/bin

# Command to run
ENTRYPOINT ["authentication"]

# Expose the app port
EXPOSE 80
