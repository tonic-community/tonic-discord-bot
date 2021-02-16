async function send(action, message) {
  // IMPLEMENTATION needed
  // https://github.com/tonic-community/tonic-discord-bot/issues/1
  // thanks for contributing <3

  let p = new Promise((res) =>
    setTimeout(
      () =>
        res({
          status: "success",
          actionId: action.id,
          message: "action id: " + action.id + ": sendEmbedd success",
        }),
      50
    )
  );
  return p;
}

module.exports = {
  send,
};
