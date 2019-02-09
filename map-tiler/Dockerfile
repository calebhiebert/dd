# Start with a golang image
FROM golang:1.11-stretch as build

# Create a user to run the app as
RUN useradd --shell /bin/bash maptiler

# Set the workdir to the application path
WORKDIR /usr/src

# Copy all application files
COPY . .

# Install Packages
RUN go get ./...

# Build the app
RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -a -ldflags="-w -s" -o /go/bin/map-tiler

# Start from a scratch container for a nice and small image
FROM golang

# Copy the binary build
COPY --from=build /go/bin/map-tiler /go/bin/map-tiler

# Copy the password file (with the maptiler user) from the build container
COPY --from=build /etc/passwd /etc/passwd

# Set the user to the previously created user
USER maptiler

# Expose the API port
EXPOSE 8080

CMD [ "/go/bin/map-tiler" ]