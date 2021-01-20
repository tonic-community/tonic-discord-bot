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
  console.log(action.blueprint[0])
  try {
    if (action.blueprint[0] === undefined){
      return {
        status: 'error',
        message: 'action is missing Blueprint'
      }
    } else if (action.blueprint[0]['__component'] === "action-blueprints.send-message"){
      console.log("ok")

      let r =  await sendSimpleMessage(action, message)
     
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
