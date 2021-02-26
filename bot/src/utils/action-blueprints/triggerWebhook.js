const axios = require('axios');

async function send(action, message, data) {
  const lastItem = data[data.length - 1]
  console.log(lastItem.data)

  axios.post(action.blueprint[0]["endpoint"], {
    data: lastItem
  })
  .then(function (response) {
    let p = new Promise((res) =>
    setTimeout(
      () =>
        res({
          status: "success",
          actionId: action.id,
          message: "action id: " + action.id + ": triggerWebhook success",
          data: response
        }),
      50
    )
  );
  return p;
  })
}

module.exports = {
  send,
};
