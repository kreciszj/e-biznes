FROM ubuntu:24.04

ENV TZ=Europe/Warsaw
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get -y install software-properties-common tzdata curl unzip zip

# Python 3.10 & Java 8
RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt-get -y install python3.10 openjdk-8-jdk

# SDKMAN + Kotlin + Gradle
RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin && sdk install gradle"

ENV PATH=$PATH:/root/.sdkman/candidates/gradle/current/bin:/root/.sdkman/candidates/kotlin/current/bin

WORKDIR /app
COPY . .

CMD ["/bin/bash", "-c", "python3.10 --version && java -version && kotlinc -version && gradle run"]
