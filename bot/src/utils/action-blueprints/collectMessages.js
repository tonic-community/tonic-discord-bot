const axios = require("axios");
const Api = require("../apiHandler");

async function send2(action, message) {
  try {
    const msg = action.blueprint[0]["message"];
    const time = action.blueprint[0]["time"];
    const filter = (m) => m.content.includes(action.blueprint[0]["filter"]);

    const startCollecting = () => {
      return new Promise((resolve, reject) => {
        const collector = message.channel.createMessageCollector(filter, {
          time: time,
        });

        collector.on("collect", (m) => {
          console.log(`Collected ${m.content}`);
        });

        collector.on("end", (collected) => {
          console.log(`Collected ${collected.size} items`);
          resolve({
            message: "collection successful",
            data: { collected: collected.map((message) => message.content) },
          });
        });
      });
    };

    startCollecting()
      .then((result) => {
        console.log("waitingg");
        return new Promise((resolve, reject) => {
          resolve({
            status: "success",
            actionId: action.id,
            message: "action id: " + action.id + ": success",
            data: result.data,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    return {
      status: "error",
      actionId: action.id,
      message: "action id: " + action.id + ": error",
      origin: this,
      data: {},
    };
  }
}

async function send(action, message) {
  const msg = action.blueprint[0]["message"];
  const time = action.blueprint[0]["time"];
  const filter = (m) => m.content.includes(action.blueprint[0]["filter"]);
  const collector = message.channel.createMessageCollector(filter, {
    time: time,
  });
  const result = [];
  const resultMsg = "no messages collected";

  collector.on("collect", (m) => {
    console.log(`Collected ${m.content}`);
  });

  collector.on("end", (collected) => {
    const result = collected.map((message) => message.content);
    const resultMsg = `Collected ${collected.size} items`;
  });

  let p = new Promise((res) =>
    setTimeout(
      () =>
        res({
          status: "success",
          actionId: action.id,
          message: resultMsg,
          data: { collected: result },
        }),
      time
    )
  );
  return p;
}

module.exports = {
  send,
};
