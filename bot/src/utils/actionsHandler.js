const sendMessageAction = require("./action-blueprints/sendMessage");
const sendEmbeddAction = require("./action-blueprints/sendEmbedd");
const collectMessagesAction = require("./action-blueprints/collectMessages");

async function sendMessage(action, message) {
  try {
    let p = await sendMessageAction.send(action, message);
    return {
      status: p.status,
      message: p.message,
      data: p.data,
    };
  } catch (err) {
    throw err;
  }
}

async function sendEmbedd(action, message) {
  try {
    let p = await sendEmbeddAction.send(action, message);
    return {
      status: p.status,
      message: p.message,
      data: p.data,
    };
  } catch (err) {
    throw err;
  }
}

async function collectMessages(action, message) {
  try {
    let p = await collectMessagesAction.send(action, message);
    return {
      status: p.status,
      message: p.message,
      data: p.data,
    };
  } catch (err) {
    throw err;
  }
}

//choose action

async function run(action, message) {
  try {
    if (action.blueprint[0] === undefined) {
      return {
        status: "error",
        message: "action is missing Blueprint",
      };
    } else if (
      action.blueprint[0]["__component"] === "action-blueprints.send-message"
    ) {
      let r = await sendMessage(action, message);
      return {
        status: r.status,
        message: r.message,
        data: r.data,
      };
    } else if (
      action.blueprint[0]["__component"] === "action-blueprints.send-embedd"
    ) {
      let r = await sendEmbedd(action, message);
      return {
        status: r.status,
        message: r.message,
        data: r.data,
      };
    } else if (
      action.blueprint[0]["__component"] === "action-blueprints.message-collector"
    ) {
      let r = await collectMessages(action, message);
      return {
        status: r.status,
        message: r.message,
        data: r.data,
      };
    } else {
      return {
        status: "error",
        message: "unable to find blueprint",
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: err,
    };
  }
}

module.exports = {
  run,
};
