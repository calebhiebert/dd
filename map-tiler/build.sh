mkdir ./dist
GOOS=linux go build -ldflags '-w -s' -o ./dist/build
$GOPATH/bin/build-lambda-zip.exe -o dist.zip ./dist/build
rm -rf ./dist