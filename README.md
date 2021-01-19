# tonic-discord-bot
The official repository of the tonic discord bot (community edition)

> ⚠️ This project is in a very early stage and heavilly work in progress. Breaking changes will occur. Use at own risk

## About

Tonic is a tool stack to create, share and run meeting, workshop and automation protocols in discord
Visit [https://tonic.community](www.tonic.community) for more information. Optional you can read the whitepaper here (slightly out of date): [https://www.notion.so/Tonic-Whitepaper-351f529410d0463a8f489d6fa065f4a7](Tonic Whitepaper)

## Development Setup

### Discord JS Bot
The discord bot uses discord.js and slappey as scaffolder.
[Slappey Documentation](https://www.npmjs.com/package/slappeyppey)

#### Create a discord Bot
https://discord.com/developers/docs/intro

Store the Discord Bot Token in the .env file and choose a prefix and a role for the bot moderator. The bot moderator role restricts access to the bot to the moderator
```
DISCORD_BOT_TOKEN="ODAwMzQ2MTk1MjQ3MzY2MTY1.YAQyeg..."
DISCORD_BOT_PREFIX="!"
BOT_MODERATOR_DISCORD_ROLE="admin"
```
### Backend
The bot requires an api endpoint. We recomend using strapi as the bot is optimized for this backend but any backend providing the expected data structure via api will work.

#### Setup strapi as backend
1. Setup strapi (Please refer to the strapi documentation to learn how to setup a strapi instance [https:/strapi.io](https://strapi.io))
2. Go to  http://localhost:1337/admin/plugins/content-manager/collectionType/plugins::users-permissions.user and create a new User for the tonic bot called tonic under Users in Strapi 
3. Use Postman to make a request with your credentials to your http://localhost:1337/auth/local (see https://strapi.io/documentation/developer-docs/latest/guides/auth-request.html#login-as-a-reader)
4. add the jwt token to you .env file

Your file should now look something like this:

```
DISCORD_BOT_TOKEN="ODAwMzQ2MTk1MjQ3MzY2MTY1.YAQyeg..."
DISCORD_BOT_PREFIX="!"
BACKEND_URL="http://localhost:1337"
BACKEND_TOKEN="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

For a deployed version check out the DigitalOcean One-click Strapi Droplet https://strapi.io/documentation/developer-docs/latest/installation/digitalocean-one-click.html

> ⚠️ This part is not finished. The bot expects a certain data structure which should be documented (and made available as strapi blueprint) here.

### Run the discord bot 

```sh
$ cd bot
$ npm install && npm run dev
```

## Concepts

### Protocols
tbd

### Actions
tbd

### Action-Bluepprints
tbd

## Disord Bot Commands
```
t_protocol list <name of flow>
t_protocol view <name of flow>
t_protocol run <name of flow>

```

## Release History

* 0.0.1
    * Work in progress

## Meta

Morris Clay – mail@morrisclay.com

Distributed under the CC BY-NC 4.0 license. See https://creativecommons.org/licenses/by-nc/4.0/ for more information.

[https://github.com/morrisclay/tonic](https://github.com/morrisclay/)

## Contributing

Please visit www.tonic.community/contribute to contribute.

### How to create a pull request
1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

### List of Contributers
Morris Clay
Niklas Eggbert