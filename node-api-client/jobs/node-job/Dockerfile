FROM alpine
USER root
RUN apk add --update nodejs npm
RUN apk add --no-cache git
RUN apk add --no-cache curl


RUN apk update
RUN apk fetch openjdk8
RUN apk add openjdk8
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
ENV PATH="$JAVA_HOME/bin:${PATH}"

# RUN npm i -g @angular/cli


WORKDIR /work

# ///
COPY ./package.json /work/package.json
RUN npm install
COPY ./ /work/


CMD node app.js
