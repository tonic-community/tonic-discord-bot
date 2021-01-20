async function send(action, message){
  try {

    // IMPLEMENTATION needed
    // https://github.com/tonic-community/tonic-discord-bot/issues/1
    // thanks for contributing <3

    return {
      status: 'success',
      actionId: action.id,
      message: 'action id: '+action.id + ': sendEmbedd success',
    }
  }
  catch (err) {

    return {
      status: 'error',
      actionId: action.id,
      message: 'action id: '+action.id + ': sendEmbedd error',
    }
  }
}

module.exports = {
  send
}
