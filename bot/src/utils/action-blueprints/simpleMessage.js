async function send(action, message){
  try {
    const msg = action.Blueprint[0]['message']
    message.channel.send(msg);
    return {
      status: 'success',
      actionId: action.id,
      message: 'action id: '+action.id + ': sendSimpleMessage success',
      origin: this,
    }
  }
  catch (err) {
    throw err
  }
}

module.exports = {
  send
}
