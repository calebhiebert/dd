FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["net-api/net-api.csproj", "net-api/"]
RUN dotnet restore "net-api/net-api.csproj"
COPY . .
RUN ls -lah
RUN dotnet publish "net-api.sln" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=build /app .
CMD  ASPNETCORE_URLS=http://*:$PORT dotnet net-api.dll
