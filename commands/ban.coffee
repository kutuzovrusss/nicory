getMember = require "../utils/getMember"

module.exports = 
  name: "ban"
  execute: (message, args, client, usage) ->  
    userId = getMember args[0]

    if !userId
      return usage()

    member = message.guild.members.cache.get userId

    if !member
      return usage()

    if member.roles.highest.position >= message.member.roles.highest.position
      return message.reply "вы не можете кикнуть этого участника!"

    reason = args.slice(1).join " "

    if !reason
      reason = "не указано"


    member.user.send "Вы были забанены на сервере #{message.guild.name} по причине `#{reason}`"
    message.react "✅"
    member.ban {reason:reason}
    

  module: "Модерация"
  description: "Забанить пользователя"
  usage: "ban <юзер> [причина]"
  aliases: ["бан"]