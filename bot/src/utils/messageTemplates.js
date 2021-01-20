const Discord = require("discord.js")

let help = new Discord.MessageEmbed()
    .setTitle("🛎 Help")
    .setDescription("to use the " + process.env.DISCORD_BOT_PREFIX + "protocol command please use the follwoing syntax")
    .setFooter("docs.tonic.community")
    .setAuthor("Tonic Bot")
    .addField(process.env.DISCORD_BOT_PREFIX + "protocol list", "lists all protocols")
    .addField(process.env.DISCORD_BOT_PREFIX + "protocol view [protocol_name]", "views a single protocol")
    .addField(process.env.DISCORD_BOT_PREFIX + "protocol run [protocol_name]", "runs a single protocol")

let error = new Discord.MessageEmbed()
    .setTitle("Oops. Something went wrong. If error persists please contact your administrator")
    .setFooter("docs.tonic.community")
    .setAuthor("Tonic Bot")

let missingPrivileges = new Discord.MessageEmbed()
    .setTitle("Sorry you are missing a role.")
    .setDescription("You don't have the necessary priveleges to use this bot. Contact the server moderators.")
    .setFooter("www.tonic.community")
    .setAuthor("Tonic Bot")

// Protocol Helpers
let protocol_missingArg = new Discord.MessageEmbed()
    .setTitle("Sorry, there seems to be an argument missing")
    .setDescription("Please make sure to add the name of the protocol at the end of your command (see examples below)")
    .setFooter("docs.tonic.community")
    .setAuthor("Tonic Bot")
    .addField(process.env.DISCORD_BOT_PREFIX + "protocol view [protocol_name]", "views a single protocol")
    .addField(process.env.DISCORD_BOT_PREFIX + "protocol run [protocol_name]", "runs a single protocol")

let protocol_notFound = new Discord.MessageEmbed()
    .setTitle("Sorry, this protocol does not exist")
    .setDescription("you can create a protocol with this name in the backend and try again")
    .setFooter("docs.tonic.community")
    .setAuthor("Tonic Bot")

let protocol_list = new Discord.MessageEmbed()
    .setTitle("Here is a list of your protocols")
    .setDescription("Use the following command to view the protocols in detail```" + process.env.DISCORD_BOT_PREFIX + "protocol view *protocol_name*``` ")
    .setFooter("www.tonic.community")
    .setAuthor("Tonic Bot")

let protocol_view = new Discord.MessageEmbed()


module.exports.help = help;
module.exports.error = error;
module.exports.missingPrivileges = missingPrivileges;
module.exports.protocol_missingArg = protocol_missingArg;
module.exports.protocol_notFound = protocol_notFound;
module.exports.protocol_list = protocol_list;
module.exports.protocol_view = protocol_view;