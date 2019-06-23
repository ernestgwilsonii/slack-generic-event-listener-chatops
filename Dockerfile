FROM node:12.4.0-alpine
# REF: https://hub.docker.com/_/node

# Install Utils
RUN apk update && apk upgrade && \
    apk add bash && \
    mkdir -p /opt/slack-generic-event-listener-chatops && \
    mkdir -p /opt/slack-generic-event-listener-chatops/lib && \
    addgroup nodejs && \
    adduser -D -h /opt/slack-generic-event-listener-chatops -H -G nodejs -s /bin/bash nodejs && \
    chown -R nodejs:nodejs /opt/slack-generic-event-listener-chatops

# Default un-encrypted TCP port for HTTP incoming Webhooks from Slack
EXPOSE 3080

# Run as user nodejs (not as root)
USER nodejs

# Set Docker working directory
WORKDIR /opt/slack-generic-event-listener-chatops

# Copy in app dependencies
COPY .env /opt/slack-generic-event-listener-chatops/.env
COPY *.js /opt/slack-generic-event-listener-chatops/
COPY *.json /opt/slack-generic-event-listener-chatops/
COPY lib/*.js /opt/slack-generic-event-listener-chatops/lib/

# Install Node.js modules
RUN npm install

CMD [ "npm", "start" ]