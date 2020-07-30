const Discord = require("discord.js");
const db = require('../utils/database');
const BaseContext = require("./BaseContext");

/**
 * @class
 * @classdesc Базовый контекст вызова для участника
 * @implements {BaseContext}
 */
class GuildMemberContext extends BaseContext {
  /**
   * @param {Discord.GuildMember} member - участник для создания контекста
   */
  constructor(member) {
    this.member = member;
  }
  /**
   * Получение контекста
   * 
   * @async
   * @returns {Promise<Object<string, any>>}
   */
  async getContext() {
    return {
      id: this.member.member.user.id,
      mention: this.member.member.toString(),
      nickname: this.member.member.nickname ?? this.member.member.user.username,
      tag: this.member.member.user.tag,
      bot: this.member.user.bot,
      name: this.member.user.username,
      discriminator: this.member.user.discriminator,
      joinedAt: this.member.member.joinedAt,
      createdAt: this.member.user.createdAt,
      avatar: this.member.user.avatarURL(),
      bio: await db.get(`${this.member.guild.id}_${this.member.user.id}`, 'bio', "Отсутствует"),
      exp: await db.get(`${this.member.guild.id}_${this.member.user.id}`, 'exp', 0)
    }
  }
}

module.exports = GuildMemberContext;