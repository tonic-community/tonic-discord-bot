async function send(action, message){
  try {
    console.log(action.blueprint[0]['message'])
    const msg = action.blueprint[0]['message']
    message.channel.send(msg);
    return {
      status: 'success',
      actionId: action.id,
      message: 'action id: '+action.id + ': sendMessage success',
      origin: this,
    }
  }
  catch (err) {
    return {
      status: 'error',
      actionId: action.id,
      message: 'action id: '+action.id + ': sendMessage error',
      origin: this,
    }
  }
}

module.exports = {
  send
}
