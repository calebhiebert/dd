mkdir dist
setx GOOS linux
go build -o dist\build -ldflags "-w -s"
%GOPATH%\bin\build-lambda-zip.exe -o dist.zip dist\build
del dist /F /Q
rmdir dist
aws lambda update-function-code --function-name TileIngest --zip-file fileb://dist.zip
pause
aws lambda update-function-code --function-name TileProcessor --zip-file fileb://dist.zip