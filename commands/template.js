const removeCodeBlock = require("../utils/removeCodeBlock");
const invokation = require("../utils/contexts/invokation");
const template = require("../utils/renderTemplate");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "template",
  async execute(message, args) {
    const context = await invokation(message);
    const code = removeCodeBlock(args.join(" "));
    try {
		  const result = await template(code, context);
      message.channel.send(result);
    }
    catch (e) {
      const embed = new MessageEmbed()
        .setColor(0xff2222)
        .setTitle("Ошибка во время компиляции шаблона")
        .setDescription("```\n" + e + "```");
      message.channel.send(embed);
    }
  },
  module: "Утилиты",
  description: "Запуск шаблона сообщения",
  usage: "template <код>",
  aliases: ["шаблон", "hbs"],
  permissions: ["ADMINISTRATOR"],
};