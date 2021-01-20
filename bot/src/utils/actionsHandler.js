const sendMessageAction = require('./action-blueprints/sendMessage');
const sendEmbeddAction = require('./action-blueprints/sendMessage');

async function sendMessage(action, message) {
  try {
    let r =  await sendMessageAction.send(action, message)
    return {
      status: 'success',
      message: r.message,
    }
  }
  catch(err) {
    throw(err)
  }

}

async function sendEmbedd(action, message) {
  try {
    let r =  await sendEmbeddAction.send(action, message)
    return {
      status: 'success',
      message: r.message,
    }
  }
  catch(err) {
    throw(err)
  }

}

//choose action

async function run(action, message) {
  console.log(action.blueprint[0])
  try {
    if (action.blueprint[0] === undefined){
      return {
        status: 'error',
        message: 'action is missing Blueprint'
      }
    } else if (action.blueprint[0]['__component'] === "action-blueprints.send-message"){
      let r =  await sendMessage(action, message)
     
      return {
        status: 'success',
        message: r.message,
      }
    } else if (action.blueprint[0]['__component'] === "action-blueprints.send-embedd"){
      console.log("embedd")

      let r =  await sendEmbedd(action, message)
     
      return {
        status: 'success',
        message: r.message,
      }
    } else {
        return {
          status: 'error',
          message: 'unable to find blueprint'
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
