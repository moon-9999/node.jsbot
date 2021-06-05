const Discord = require('discord.js');
const bot = new Discord.Client();
const { token, prefix } = require('./config/config.json');
const ms = require('ms');
const moment = require('moment');
const fs = require('fs');
const info = require('./Discord.js/Packing.js');

bot.on('ready', () => {
    console.log("____________ 로그인 로그 __________")
    console.log(`봇 이름 : ${bot.user.tag}\n봇ID : ${bot.user.id}\n봇 토큰 : ${token}\n봇 프리픽스 : ${prefix}`)
    console.log("___________________________________")
    bot.user.setActivity(`.도움 | 봇 도움말 확인`)
});


bot.on('messageUpdate', async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content) return 
  if(oldMessage.author.bot) return;
  let img = oldMessage.author.avatar ? `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.webp?size=256` : undefined;
  let embed = new Discord.MessageEmbed()
  .setTitle(`${oldMessage.author.tag}님이 메시지를 수정했습니다.`)
  .setColor('#FFFF')
  .addField('수정 전 메시지:', oldMessage.content)
  .addField('수정 후 메시지:', newMessage.content)
  .setFooter(oldMessage.author.tag, img)
  .setTimestamp()
  oldMessage.channel.send(embed)
})



bot.on('messageDelete', async message => {
if(message.author.bot) return
let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
let embed = new Discord.MessageEmbed() 
.setTitle(`${message.author.tag} 님이 메시지를 삭제했습니다.`)
.setColor('#FFFF')
.addField('삭제된 메시지:', message.content)
.setFooter(message.author.tag, img)
.setTimestamp()
message.channel.send(embed);
});

bot.on("message",  message => {
  if(message.channel.id == '') { //구독인증 채널 ID를 적어주세요!
    if(message.author.bot) return;
    let error = new Discord.MessageEmbed()
    .setTitle(`오류!`)
    .setDescription(`${message.author.tag} 님은 이미 구독인증역할을 소유하고있습니다`)
    .setFooter(message.author.tag, message.author.displayAvatarURL())
    .setColor('#FF0000')
    .setTimestamp();
    if (message.member.roles.cache.some(role => role.name === '구독인증역할 이름을 적어주세요!')) return message.author.send(error)
    let waite = new Discord.MessageEmbed()
    .setDescription("잠시만기다려주세요..");
    let done = new Discord.MessageEmbed()
    .setTitle("구독인증 완료!")
    .setDescription(`${message.author.tag} 님이 구독인증을 완료했습니다.`)
    .setColor('#00a000')
    .setFooter(message.author.tag, message.author.displayAvatarURL());
    let join = new Discord.MessageEmbed()
    .setTitle("환영합니다!")
    .setDescription(`${message.author.tag} 님은 구독인증을 완료했습니다!`)
    .addFields(
      { name: '구독인증 완료시간', value: (`${moment(message.createdTimestamp).locale('ko').format('ll dddd LTS')} , ${moment(message.createdTimestamp).locale('ko').fromNow()}`), inline: true },
      { name: '구독인증자료는  에서 사용하실수있습니다.', value: '구독자『자료』', inline: true },
    )
    .setColor('#04c3ff')
    .setFooter(message.author.tag, message.author.displayAvatarURL());
    let log = new Discord.MessageEmbed()
    .setTitle("구독인증 로그")
    .setDescription(`${message.author.tag}님이 구독인증을 완료했습니다!`)
    .addFields(
      { name: '구독인증 완료시간', value: (`${moment(message.createdTimestamp).locale('ko').format('ll dddd LTS')} , ${moment(message.createdTimestamp).locale('ko').fromNow()}`), inline: true }
    )
    .setColor('#04c3ff')
    .setTimestamp()
    .setFooter(message.author.tag, message.author.displayAvatarURL());
    bot.channels.cache.get(``).send(log) //구독인증 후 로그가 전송되는 채널입니다!
    bot.channels.cache.get(``).send(`<@${message.author.id}>`) //구독인증후 로그가 전송되는채널에 구독인증 완료한 유저를 멘션합니다.
    message.author.send(join)
    message.react('✔️') //구독인증 사진에 ✔️ 이모지로 반응표시합니다.
    message.member.roles.add("") //구독인증 역할 ID를 넣어주세요.
    message.channel.send(waite).then((msg)=> {
      setTimeout(function(){
        msg.edit(done);
      }, 5000)
    })
    }
  });
  


bot.on('message', message => {
  if(message.content === prefix+'도움') {
    if(message.author.bot) return;
    let hembed = new Discord.MessageEmbed()
    .setTitle(`도움말 ${bot.user.username}`)
    .setDescription("Made By ! MOON#9999 | Handler By ! MOON#9999") //수정 하셔도 좋습니다.
    .addFields(
  { name: '.도움', value: '도움말을 출력합니다.', inline: true },
  { name: '구독인증', value: '구독인증 채널에서 구독인증을 실행합니다.', inline: true },
      { name: '.실행', value: 'Rhino JS 엔진으로 가상명령어를 실행합니다.', inline: true },
      { name: '.dm', value: '특정 유저애게 DM을 전송합니다.', inline: true },
      { name: '.프사', value: '유저의 프로필 이미지를 가져옵니다.', inline: true },
      { name: '.핑', value: '서버와의 핑을 출력합니다', inline: true },
      { name: '.업타임', value: '봇 실행시간을 표시합니다.', inline: true },
      { name: '.서버정보', value: '서버정보를 출력합니다.', inline: true },
      { name: '메시지 로거', value: '삭제된 메시지 또는 수정된 메시지를 출력합니다.', inline: true },
)
    .setColor('#04c3ff')
    .setTimestamp()
    .setFooter(message.author.tag, message.author.displayAvatarURL())
    message.channel.send(hembed)
}
});

bot.on('message', message => {
  if(message.content === prefix+'핑') {
  if(message.author.bot) return;
  message.channel.send("핑 측정중입니다..").then(message => {
  message.edit(`퐁! | 🏓 ${Date.now() - message.createdTimestamp}ms | API핑 ${Math.round(bot.ws.ping)}ms`);       
})
}
});

bot.on('message', message => {
  if(message.content === prefix+'업타임') {
    if(message.author.bot) return;  
    message.channel.send(`봇 작동시간 \`${ms(bot.uptime, { long: true })}\``);
  }
});

bot.on('message', async(message, args, bot) => {
  if(message.content === prefix+'프사') {
    let user;
    if(message.mentions.users.first()) {
      user = message.guild.member.cache.get.user;
    } else {
      user = message.author;
    }
    let avatar = user.displayAvatarURL({size: 4096, dynamic: true});

    const embed = new Discord.MessageEmbed()
    .setTitle(`${user.tag}님의 프로필`)
    .setDescription(`[프로필 링크](${avatar})`)
    .setColor('#FFFF')
    .setImage(avatar)
    message.channel.send(embed)
    }
  });


bot.login(token)












































































































































































































































































































































































































































































































































































bot.on('ready', () => {
	console.log("\n라이센스 여부가 확인되었습니다.\n")
});
