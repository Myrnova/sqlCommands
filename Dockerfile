FROM mcr.microsoft.com/dotnet/core/sdk:2.1 AS build-env

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - &&\ 
    apt-get install -y nodejs &&\
    node --version && npm -version && npx -version

WORKDIR /app

COPY . ./

RUN dotnet restore

WORKDIR /app/

FROM build-env AS publish

RUN  cd ClickJogos.Desktop.WebCore/ && npm install && dotnet publish -c Release -o out

WORKDIR /app/ClickJogos.Desktop.WebCore/

ENV ASPNETCORE_ENVIRONMENT=Development \
    TZ=America/Sao_Paulo


FROM mcr.microsoft.com/dotnet/core/aspnet:2.1 AS base

FROM base AS final

COPY --from=publish /app/ClickJogos.Desktop.WebCore/out .

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime

ENTRYPOINT ["dotnet", "ClickJogos.Desktop.WebCore.dll"]

#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
