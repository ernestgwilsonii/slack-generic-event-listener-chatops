require("dotenv").config();
const { createEventAdapter } = require("@slack/events-api");
const { slackGetUsersInfo } = require("./lib/slackGetUsersInfo");
const { slackGetChannelsInfo } = require("./lib/slackGetChannelsInfo");
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const port = process.env.INCOMING_WEBHOOKS_PORT || 3080;
let localDebug = true;
////////////////////////////////////////////////////////////////////////////////

// Attach listeners to events by Slack Event "type"
// REF: https://api.slack.com/events/message.im
slackEvents.on("message", async event => {
  if (localDebug) {
    // Review the raw event
    console.log("event: " + JSON.stringify(event, null, 2));
  }

  // If the event is a normal message
  // TODO: Do more than just console log this data (like send to MQTT for Node-RED to take action)
  if (event.type == "message" && !event.subtype) {
    // Get the User info
    let slackUserId = event.user;
    let personDetails = await slackGetUsersInfo(slackUserId);
    console.log("personDetails: " + JSON.stringify(personDetails, null, 2));
    // Get the Channel Info
    let slackChannelId = event.channel;
    let channelDetails = await slackGetChannelsInfo(slackChannelId);
    console.log("channelDetails: " + JSON.stringify(channelDetails, null, 2));
  }

  // If the event is a deleted message
    // TODO: Do more than just console log this data (like send to MQTT for Node-RED to take action)
  if (event.type == "message" && event.subtype == "message_deleted") {
    // Get the Channel Info
    let slackChannelId = event.channel;
    let channelDetails = await slackGetChannelsInfo(slackChannelId);
    console.log("channelDetails: " + JSON.stringify(channelDetails, null, 2));
  }

});

// TODO: Consider better error handling - https://github.com/slackapi/node-slack-events-api/blob/f836d1217ca0e742877765f12e714841b0dc8099/examples/greet-and-react/index.js
slackEvents.on("error", console.error);

// Start a basic HTTP server for incoming Webhooks
//////////////////////////////////////////////////
// For local development use ngrok:
// ngrok http 3080
// REF: https://dashboard.ngrok.com/get-started
// REF: https://api.slack.com/apps/AF4AAEHEF/event-subscriptions?
// TODO: Use encrypted HTTPS (instead of insecure HTTP) for Webhooks
// TODO: Consider using Express as the web server - https://github.com/slackapi/node-slack-events-api/blob/f836d1217ca0e742877765f12e714841b0dc8099/examples/greet-and-react/index.js
slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});
////////////////////////////////////////////////////////////////////////////////
