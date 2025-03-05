FROM ubuntu:latest AS build

RUN apt-get update && \
    apt-get install -y openjdk-21-jdk wget unzip

COPY . /app
WORKDIR /app

RUN chmod +x gradlew
RUN ./gradlew bootJar

FROM openjdk:21-jdk-slim

RUN apt-get update && apt-get install -y postgresql-client

EXPOSE 8080

COPY --from=build /app/build/libs/market-control-0.0.1-SNAPSHOT.jar /app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]