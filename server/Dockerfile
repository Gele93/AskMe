FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY AskMe.csproj ./AskMe.csproj
RUN dotnet restore

COPY . . 
RUN dotnet publish AskMe.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build-env /app/out .

EXPOSE 8080

ENTRYPOINT ["dotnet", "AskMe.dll"]
