const Discord = require("discord.js")
const BaseCommand = require('../../utils/structures/BaseCommand');
const Api = require('../../utils/apiHandler');
const Actions = require('../../utils/actionsHandler');
const Messages = require('../../utils/messageTemplates');
const { reject } = require("async");

module.exports = class ProtocolCommand extends BaseCommand {
  constructor() {
    super('protocol', '', []);
  }

  run(client, message, args) {
     // ############################################################# //
    // minimal queue helper functions  //
    // ############################################################# //
    let data = [];
    let actions = []

    function walkQueue(actions) {
      runAction(actions[0])
        .then((res) => {
          data.push(res.data)
          console.log(`data is ${data[0]}`);
          next();
        })
        .catch((e) => {
          console.log(e);
        });
    }

    async function runAction(action) {
      let p = await Actions.run(action, message, data)
      return p
    }
  
    function next() {
      console.log("checking for more actions...");
      if (actions.length > 1) {
        actions = actions.slice(1);
        walkQueue(actions);
      } else {
        console.log("no more actions found.");
        finish();
      }
    }
    
    function finish() {
      console.log("data collected: ", data);
    }  

    // ############################################################# //
    // defining listProtocols() logic to list all existing protocols //
    // ############################################################# //

    function listProtocols() {

      Api.find("/protocols")
        .then(
          res => {
            var msg = Messages.protocol_list

            for (var i in res) {
              msg.addField("🔹 " + res[i].name, res[i].description)
            }

            message.channel.send(msg)
          }
        ).catch(function (err) {
          console.log(err)
          var msg = Messages.error
          msg.setDescription(err)
          message.channel.send(msg)
        });
    }

    // ############################################################### //
    // defining viewProtocol() logic to view a single protocol by name //
    // ############################################################### //

    function viewProtocol(protocolName) {

      Api.find("/protocols", { name: protocolName })
        .then(
          res => {
            if (res === 404) {
              message.channel.send(Messages.protocol_notFound)
              return
            }
            if (res == 403) {
              var msg = Messages.error
              msg.setDescription("403: The backend refused to connection to the bot")
              message.channel.send(msg)
              return
            }
          
            var msg = Messages.protocol_view
            msg
              .setTitle(res[0].name)
              .setDescription(res[0].description)
            message.channel.send(msg)
          }
        ).catch(function (err) {
          var msg = Messages.error
          msg.setDescription(err)
          message.channel.send(msg)
        });
    }

    // ############################################################### //
    // defining runProtocol() logic to actually run a protocol by name //
    // ############################################################### //

    function runProtocol(protocolName) {

      Api.find("/protocols", { name: protocolName })
        .then(
          res => {
            if (res === 404) {
              message.channel.send(Messages.protocol_notFound)
              return
            }
  
            if (res == 403) {
              var msg = Messages.error
              msg.setDescription("403: The backend refused to connection to the bot")
              message.channel.send(msg)
              return
            }
            actions = res[0].actions
   
            walkQueue(actions)
          }
        ).catch(function (err) {
          var msg = Messages.error
          msg
          .setDescription(err)
          message.channel.send(msg)
        });
    }
    // ##################################################################################################### //
    // defining decision tree to handle different possible args and check if user hass necessary permissions //
    // ##################################################################################################### //

    if (message.member.roles.cache.some(r => r.name === process.env.BOT_MODERATOR_DISCORD_ROLE)) {

      if (args[0] === "help") {
        message.channel.send(Messages.help)
      } else if (args[0] === "list") {
        listProtocols();
      } else if (args[0] === "view") {
        if (args[1]) {
          viewProtocol(args[1]);
        } else {
          message.channel.send(Messages.protocol_missingArg)
        }
      } else if (args[0] === "run") {
        if (args[1]) {
          runProtocol(args[1]);
        } else {
          message.channel.send(Messages.protocol_missingArg)
        }
      } else {
        message.channel.send(Messages.help)
      }
    } else {
      message.channel.send(Messages.missingPrivileges);
    }
  }
}