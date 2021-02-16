async function send(action, message) {
  console.log("sending message...");
  const msg = action.blueprint[0]["message"];
  message.channel.send(msg);

  let p = new Promise((res) =>
    setTimeout(
      () =>
        res({
          status: "success",
          actionId: action.id,
          message: "action id: " + action.id + ": sendMessage success",
        }),
      50
    )
  );
  return p;
}

module.exports = {
  send,
};
