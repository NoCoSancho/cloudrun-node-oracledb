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
ADD package.json server.js /myapp/
RUN npm install

#CMD exec node server.js

# Run the web service on container startup.
CMD [ "npm","start" ]

#CMD ["sqlplus", "-v"]
