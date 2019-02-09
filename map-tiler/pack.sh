docker run --rm -it --name mt_build -v `pwd -W`:/go/b golang:1.11-stretch sh -c 'cd b && ./build.sh'
$GOPATH/bin/build-lambda-zip.exe -o dist.zip dist/build
rm -rf dist