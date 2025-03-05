FROM ubuntu:latest AS build

RUN apt-get update && \
    apt-get install -y openjdk-21-jdk wget unzip

COPY . /app
WORKDIR /app

RUN chmod +x gradlew
RUN ./gradlew build

FROM openjdk:21-jdk-slim

EXPOSE 8080

COPY --from=build /app/build/libs/market-control-0.0.1-SNAPSHOT-plain.jar /app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]