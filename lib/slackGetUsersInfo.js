////////////////////////////////////////////////////////////////////////////////
require("dotenv").config();
const Slack = require("slack"); // https://www.npmjs.com/package/slack
let token = process.env.SLACK_BOT_TOKEN;
let localDebug = false;
////////////////////////////////////////////////////////////////////////////////

async function slackGetUsersInfo(slackUserId) {
  try {
    if (localDebug) {
      console.log("slackGetUsersInfo slackUserId: " + slackUserId);
    }
    let slack = new Slack({ token });
    let user = slackUserId;
    let res = await slack.users.info({ token, user }); // https://api.slack.com/methods/users.info

    if (localDebug) {
      console.log("slackGetUsersInfo res: " + JSON.stringify(res, null, 2));
    }

    return res;
  } catch (err) {
    console.error(err);
  }
}
module.exports.slackGetUsersInfo = slackGetUsersInfo;
////////////////////////////////////////////////////////////////////////////////
