FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["net-api/net-api.csproj", "net-api/"]
RUN dotnet restore "net-api/net-api.csproj"
COPY . .
WORKDIR "/src/net-api"
RUN dotnet build "net-api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "net-api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
CMD  ASPNETCORE_URLS=http://*:$PORT dotnet net-api.dll