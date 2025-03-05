FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
COPY . .

RUN apt-get install gradle -y
RUN gradle build

FROM openjdk:21-jdk-slim

EXPOSE 8080

COPY --from=build /build/libs/market-control-0.0.1-SNAPSHOT-plain.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]