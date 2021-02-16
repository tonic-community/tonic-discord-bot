async function send(action, message) {
  const msg = action.blueprint[0]["message"];
  message.channel.send(msg);

  const time = action.blueprint[0]["time"];
  const filter = (m) => m.content.includes(action.blueprint[0]["filter"]);
  const collector = message.channel.createMessageCollector(filter, {
    time: time,
  });
  var result = [];
  var resultMsg = "no messages collected";

  collector.on("collect", (m) => {
    m.react('✔️');
    console.log(`Collected ${m.content}`);
  });

  collector.on("end", (collected) => {
    console.log("ending collection...")
    result = collected.map((message) => message.content);
    resultMsg = `Collected ${collected.size} items`;
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
      time+100
    )
  );
  return p;
}

module.exports = {
  send,
};
