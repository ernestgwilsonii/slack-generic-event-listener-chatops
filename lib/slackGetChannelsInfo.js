////////////////////////////////////////////////////////////////////////////////
require("dotenv").config();
const Slack = require("slack"); // https://www.npmjs.com/package/slack
let token = process.env.SLACK_BOT_TOKEN;
let localDebug = false;
////////////////////////////////////////////////////////////////////////////////

async function slackGetChannelsInfo(slackChannelId) {
  try {
    if (localDebug) {
      console.log("slackGetChannelsInfo slackChannelId: " + slackChannelId);
    }
    let slack = new Slack({ token });
    let channel = slackChannelId;
    let res;

    // Regular channels start with Cxxxxxxxx
    if (/^C/.test(channel)) {
      res = await slack.channels.info({ token, channel }); // https://api.slack.com/methods/channels.info
    }

    // Group private channels start with Gxxxxxxxx
    if (/^G/.test(channel)) {
      res = await slack.groups.info({ token, channel }); // https://api.slack.com/methods/channels.info
    }

    // Direct messages start with Dxxxxxxxx
    if (/^D/.test(channel)) {
      res = await slack.conversations.info({ token, channel }); // https://api.slack.com/methods/channels.info
    }

    if (localDebug) {
      console.log("slackGetChannelsInfo res: " + JSON.stringify(res, null, 2));
    }

    return res;
  } catch (err) {
    console.error(err);
  }
}
module.exports.slackGetChannelsInfo = slackGetChannelsInfo;
////////////////////////////////////////////////////////////////////////////////
