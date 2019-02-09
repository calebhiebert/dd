mkdir dist
GOOS=linux CGO_ENABLED=1 go build -ldflags '-w -s' -o ./dist/build