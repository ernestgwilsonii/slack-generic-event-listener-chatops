### This is a basic "Slack Event Listener"
- Listens to Slack events (like messages) and currently only console logs them
- Next steps could be: Send this data to Node-RED or other system for action
- This basic building block could be used to build a ChatOps bot

### Prerequisites
- Add a ["bot" application to your Slack workspace](https://api.slack.com/apps) see [screen capture example settings](https://github.com/ernestgwilsonii/slack-generic-event-listener-chatops/docs)
- For local development have [Node.js installed](https://nodejs.org/en/download/)
- For local development have [ngrok installed](https://dashboard.ngrok.com/get-started) to forward the Webhook port (TCP 3080) to your PC
- For cloud development have port TCP 3080 allowed inbound to receive the Webhook
- Optional: Have [Docker installed](https://docs.docker.com/install/) if you want to build a container
  
### Installation
```
# Download the repository and install
cd /tmp
git clone https://github.com/ernestgwilsonii/slack-generic-event-listener-chatops.git
npm install

# Edit .env file and update with your bot's app settings
# REF: https://api.slack.com/apps (see screen captures in docs directory)
vi .env
:wq!

# Launch it
npm start
# Message your bot, you should see console log output


# OPTIONAL: Docker
##################

# Build standard container
docker build -t slack-generic-events-listener:1.0.0 .
#docker images
#docker system prune -af
# Run the standard container
docker run -it --name slack-generic-events-listener -p 3080:3080 slack-generic-events-listener:1.0.0
#docker run -d --name slack-generic-events-listener -p 3080:3080 slack-generic-events-listener:1.0.0
#docker stop slack-generic-events-listener && docker rm slack-generic-events-listener

# Build Raspberry Pi container
time docker build -t slack-generic-events-listener:1.0.0 -f Dockerfile.armhf .
#docker images
#docker system prune -af
# Run the standard container
docker run -it --name slack-generic-events-listener -p 3080:3080 slack-generic-events-listener:1.0.0
#docker run -d --name slack-generic-events-listener -p 3080:3080 slack-generic-events-listener:1.0.0
#docker stop slack-generic-events-listener && docker rm slack-generic-events-listener
```
