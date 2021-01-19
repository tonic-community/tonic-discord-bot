const Discord = require("discord.js")
const BaseCommand = require('../../utils/structures/BaseCommand');
const Api = require('../../utils/apiHandler');
const Actions = require('../../utils/actionsHandler');
const { reject } = require("async");


module.exports = class ProtocolCommand extends BaseCommand {
  constructor() {
    super('protocol', '', []);
  }

  run(client, message, args) {
    
      //###########################// 
     //define all message-embedds // 
    //###########################// 
    
    let help = new Discord.MessageEmbed()
      .setTitle("🛎 Help")
      .setDescription("to use the " + process.env.DISCORD_BOT_PREFIX + "protocol command please use the follwoing syntax")
      .setFooter("docs.tonic.community")
      .setAuthor("Tonic Bot")
      .addField(process.env.DISCORD_BOT_PREFIX + "protocol list", "lists all protocols")
      .addField(process.env.DISCORD_BOT_PREFIX + "protocol view [protocol_name]", "views a single protocol")
      .addField(process.env.DISCORD_BOT_PREFIX + "protocol run [protocol_name]", "runs a single protocol")

    let errorHelp = new Discord.MessageEmbed()
      .setTitle("Oops. Something went wrong. If error persists please contact your administrator")
      .setFooter("docs.tonic.community")
      .setAuthor("Tonic Bot")

    let missingArg = new Discord.MessageEmbed()
      .setTitle("Sorry, there seems to be an argument missing")
      .setDescription("Please make sure to add the name of the protocol at the end of your command (see examples below)")
      .setFooter("docs.tonic.community")
      .setAuthor("Tonic Bot")
      .addField(process.env.DISCORD_BOT_PREFIX + "protocol view [protocol_name]", "views a single protocol")
      .addField(process.env.DISCORD_BOT_PREFIX + "protocol run [protocol_name]", "runs a single protocol")

    let protocolList = new Discord.MessageEmbed()
      .setTitle("Here is a list of your protocols")
      .setDescription("Use the following command to view the protocols in detail```" + process.env.DISCORD_BOT_PREFIX + "protocol view *protocol_name*``` ")
      .setFooter("www.tonic.community")
      .setAuthor("Tonic Bot")
    
      let protocolView = new Discord.MessageEmbed()


    let missingPrivileges= new Discord.MessageEmbed()
    .setTitle("Sorry you are missing a role.")
    .setDescription("You don't have the necessary priveleges to use this bot. Contact the server moderators.")
    .setFooter("www.tonic.community")
    .setAuthor("Tonic Bot")

      // ############################################################# //
     // defining listProtocols() logic to list all existing protocols //
    // ############################################################# //

    function listProtocols() {

      Api.find("/protocols")
        .then(
          res => {
            for (var i in res) {
              protocolList.addField("🔹 " + res[i].name, res[i].description)
            }
            message.channel.send(protocolList)
          }
        ).catch(function (err) {
          console.log(err)
          errorHelp.setDescription(err)
          message.channel.send(errorHelp)
        });
    }

      // ############################################################### //
     // defining viewProtocol() logic to view a single protocol by name //
    // ############################################################### //

    function viewProtocol(protocolName) {

      Api.find("/protocols", { name: protocolName })
        .then(
          res => {
           protocolView
              .setTitle(res[0].name)
              .setDescription(res[0].description)
              message.channel.send(protocolView)
          }
        ).catch(function (err) {
          errorHelp.setDescription(err)
          message.channel.send(errorHelp)
        });
    }

     // ############################################################### //
    // defining runProtocol() logic to actually run a protocol by name //
   // ############################################################### //

    function runProtocol(protocolName) {

      Api.find("/protocols", { name: protocolName })
        .then(
          res => {

            const actionsCollection = res[0].actions

            for (var i = 0; i < actionsCollection.length; i++) {
              var currentAction = {
                id: actionsCollection[i].id,
                name: actionsCollection[i].name,
                invokedBy: message.member.name,}

              async function runAction() {
                  let r =  await Actions.run(actionsCollection[i], message)
                  if(r.status==="error"){
                    errorHelp
                    .setDescription("Error: Action with the name *"+currentAction.name+"* failed: "+r.message)

                    message.channel.send(errorHelp)
                  }
                  return
              }
              runAction()

            }
          }
        ).catch(function (err) {
          console.log(err)
          errorHelp.setDescription(err)
          message.channel.send(errorHelp)
        });
    }
      // ##################################################################################################### //
     // defining decision tree to handle different possible args and check if user hass necessary permissions //
    // ##################################################################################################### //

    if (message.member.roles.cache.some(r => r.name === process.env.BOT_MODERATOR_DISCORD_ROLE)) {

      if (args[0] === "help") {
        message.channel.send(help)
      } else if (args[0] === "list") {
        listProtocols();
      } else if (args[0] === "view") {
        if (args[1]) {
          viewProtocol(args[1]);
        } else {
          message.channel.send(missingArg)
        }
      } else if (args[0] === "run") {
        if (args[1]) {
          runProtocol(args[1]);
        } else {
          message.channel.send(missingArg)
        }
      } else {
        message.channel.send(help)
      }
    } else {
      message.channel.send("you don't have the necessary priveleges to use this bot");
    }
  }
}