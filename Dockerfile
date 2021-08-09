FROM mcr.microsoft.com/dotnet/core/sdk:2.1 AS build-env

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - &&\ 
    apt-get install -y nodejs &&\
    node --version && npm -version && npx -version

WORKDIR /app

COPY . ./

RUN dotnet restore

WORKDIR /app/

FROM build-env AS publish

RUN  cd Programa && npm install && dotnet publish -c Release -o out

WORKDIR /app/Programa/

ENV ASPNETCORE_ENVIRONMENT=Development

FROM mcr.microsoft.com/dotnet/core/aspnet:2.1 AS base

FROM base AS final

COPY --from=publish /app/Programa/out .

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime

ENTRYPOINT ["dotnet", "Programa.dll"]
