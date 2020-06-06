const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuarios, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores`);
    client.user.setActivity(`Eu estou em ${client.guilds.cache.size} servidores`);
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servido: ${guild.name} (id: ${guild.name}). População: ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;


    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if(comando === "ping"){
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latência da API é ${Math.round(client.ping)}ms`);
    }

});

client.login(config.token);