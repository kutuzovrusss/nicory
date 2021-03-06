const db = require("../utils/database.js");

module.exports = {
  name: "remove-job",
  async execute(message, args) {
    const jobs = await (db.get(message.guild.id, "customJobs", []));
    if (!jobs[0]) {
      return message.reply("укажите работу!");
    }
    if (jobs.filter((el) => el.name === args[0]).length === 0) {
      return message.reply("Данная работа не была найдена!");
    }
    return db
      .set(
        message.guild.id,
        "customJobs",
        jobs.filter((el) => el.name !== args[0]),
      )
      .then(() => message.react("✅"));
  },
  module: "Экономика",
  description: "Удалить работу",
  usage: "remjob <название работы>",
  aliases: ["remjob", "удалить-работу"],
  permissions: ["ADMINISTRATOR"],
};
