const simpleMessage = require('./action-blueprints/simpleMessage');

async function sendSimpleMessage(action, message) {
  try {
    let r =  await simpleMessage.send(action, message)
    return {
      status: 'success',
      message: r.message,
    }
  }
  catch(err) {
    throw(err)
  }

}

async function run(action, message) {
  try {
    if (action.Blueprint[0] === undefined){
      return {
        status: 'error',
        message: 'action is missing Blueprint'
      }
    } else if (action.Blueprint[0]['__component'] === "action-blueprint.send-message"){
      let r =  await sendSimpleMessage(action, message)
      return {
        status: 'success',
        message: r.message,
      }
    }

  }
  catch (err) {
    return {
      status: 'error',
      message: err
    }
  }
}

module.exports = {
  run
}
