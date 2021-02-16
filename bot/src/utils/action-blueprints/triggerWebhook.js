const axios = require('axios');

async function send(action, message, data) {
  const lastItem = data[data.length - 1]
  console.log(lastItem.data)
  console.log(action.blueprint[0]["endpoint"])

  axios.post('http://localhost:5678/webhook/6631c8b2-0947-4b78-8d25-e4d60f837813', {
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
