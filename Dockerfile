# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

RUN apt-get update && apt-get install -y libaio1 wget unzip

# Create and change to the app directory.
WORKDIR /opt/oracle

RUN wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip && \
    unzip instantclient-basiclite-linuxx64.zip && rm -f instantclient-basiclite-linuxx64.zip && \
    cd /opt/oracle/instantclient* && rm -f *jdbc* *occi* *mysql* *mql1* *ipc1* *jar uidrvci genezi adrci && \
    echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

WORKDIR /myapp

# Make all the necessary directories
RUN mkdir services
RUN mkdir db_apis
RUN mkdir controllers
RUN mkdir config

# Add files to their respective directories
ADD package.json *.js /myapp/
ADD services /myapp/services
ADD config /myapp/config
ADD db_apis /myapp/db_apis
ADD controllers /myapp/controllers

RUN npm install

# Run the web service on container startup.
CMD [ "npm","start" ]
