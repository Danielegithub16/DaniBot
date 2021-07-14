require('events').EventEmitter.prototype._maxListeners = 100;
const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

bot.login("token");


bot.on('message', msg => {
    if (msg.content == '!instagram'){
        var id_canale = bot.channels.cache.get('860042259923861524');
        id_canale.send('questo è il mio profilo instagram vai cosa aspetti! https://www.instagram.com/daniele_foto_/ ')
    }
});



bot.on('message', msg => {
    if (msg.content == '!daniele'){
        var id_canale = bot.channels.cache.get('860042259923861524');
        id_canale.send('Daniele è molto inteligente')
    }
});


bot.on('message', msg => {
    if (msg.content == '!chisonoio'){
        var id_canale = bot.channels.cache.get('860042259923861524');
        id_canale.send('so Lillo')
    }
});


bot.on('message', msg => {
    if (msg.content == '!twitch'){
        var id_canale = bot.channels.cache.get('860042259923861524');
        id_canale.send('questo è il mio profilo twitch vai cosa aspetti!! https://www.twitch.tv/daniytapex')
    }
});


bot.on("message", msg => {
    if (msg.content == '!aiuto') {
        var id_canale = bot.channels.cache.get('860042259923861524');
        id_canale.send('se hai bisogno di aiuto contatta lo staff o il propietario del server discord oppure recati nella sezzione assistenza' + msg.author.toString());
    }
})







bot.on("message", (message) => {
    if (message.content.startsWith("!kick")) {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteKick) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!message.mentions.members.first().kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + ">" + " kiccato"))

    }

    if (message.content.startsWith("!ban")) {
        var utenteBan = message.mentions.members.first();

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteBan) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!utenteBan.kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteBan.ban()
            .then(() => message.channel.send("<@" + utenteBan + ">" + " è stato bannato"))

    }
})


bot.on("message", (message) => {
    if (message.content == "!reazione") {
        message.channel.send("Ciao")
            .then(function (message) {
                message.react("😍");
                message.react("😭");
            })
    }
})






bot.on("message", (message) => {
    if (message.content == "!scelta-reazione") {
        message.channel.send("Segli una reazione")
            .then(messaggio => {
                messaggio.react("👍");
                messaggio.react("👎");

                var filtro = (reaction, user) => ["👍", "👎"].includes(reaction.emoji.name) && user.id == message.author.id;

                messaggio.awaitReactions(filtro, { max: 1, time: 10000 })
                    .then(collected => {
                        var reazione = collected.first().emoji.name;
                        if (reazione == "👍") {
                            message.channel.send("OK, bravo");
                        }
                        if (reazione == "👎") {
                            message.channel.send("NO, arrivederci");
                        }

                    }).catch(collected => {
                        return message.channel.send("Tempo scaduto!");
                    })




            })
    }
})



bot.on("message", message => {
    if (message.content.startsWith("!clear")) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non hai il permesso');
            return;
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non ho il permesso');
            return;
        }

        var count = message.content.slice(7);
        count = parseInt(count);

        if (!count) {
            message.channel.send("Inserisci un numero valido")
            return
        }

        message.channel.bulkDelete(count, true)
        message.channel.send(count + " messaggi eliminati").then(msg => {
            msg.delete({ timeout: 100000 })
        })

    }
})


bot.on("message", message => {
    if (message.content.startsWith("!userinfo")) {
        if (message.content == "!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Non ho trovato questo utente")
            return
        }

        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.avatarURL())
            .addField("User id", "```" + utente.user.id + "```", true)
            .addField("Status", "```" + utente.user.presence.status + "```", true)
            .addField("Is a bot?", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField("Account created", "```" + utente.user.createdAt.toDateString() + "```", true)
            .addField("Joined this server", "```" + utente.joinedAt.toDateString() + "```", true)
            .addField("Permissions", "```" + elencoPermessi + "```", false)
            .addField("Roles", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)

        message.channel.send(embed)

    }
});




bot.on("message", message => {
    if (message.content == "!serverinfo") {
        var server = message.member.guild;

        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var utentiCount = server.memberCount - botCount;

        var categoryCount = server.channels.cache.filter(c => c.type == "category").size
        var textCount = server.channels.cache.filter(c => c.type == "text").size
        var voiceCount = server.channels.cache.filter(c => c.type == "voice").size

        var embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("Tutte le info su questo server")
            .setThumbnail(server.iconURL())
            .addField("Owner", "```" + server.owner.user.username + "```", true)
            .addField("Server id", "```" + server.id + "```", true)
            .addField("Server region", "```" + server.region + "```", true)
            .addField("Members", "```Total: " + server.memberCount + " - Users: " + utentiCount + " - Bots: " + botCount + "```", false)
            .addField("Channels", "```Category: " + categoryCount + " - Text: " + textCount + " - Voice: " + voiceCount + "```", false)
            .addField("Server created", "```" + server.createdAt.toDateString() + "```", true)
            .addField("Boost level", "```Level " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")```", true)

        message.channel.send(embed)

    }
});






bot.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return 

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction.message.id == "864597492674986004") { 
        if (messageReaction._emoji.name == "🕹️") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("864475696267788308");
        }
        if (messageReaction._emoji.name == "💻") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("864497513096151101");
        }
    }
})

bot.on("messageReactionRemove", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction.message.id == "864597492674986004") {
        if (messageReaction._emoji.name == "🕹️") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("864475696267788308");
        }
        if (messageReaction._emoji.name == "💻") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("864497513096151101");
        }
    }
})





bot.on("message", message => {
    if (message.content == "!ciao") {
        message.channel.send("Clicca sulla reazione per aprire un ticket")
            .then(msg => msg.react("📩")) //Personalizzare l'emoji della reaction
    }
})


bot.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction._emoji.name == "📩") { //Personalizzare l'emoji della reaction
        if (messageReaction.message.channel.id == "858377596961816586") { //Settare canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send("Hai gia un ticket aperto").catch(() => { })
                return
            }

            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent("858331350016589894") //Settare la categoria
                canale.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ])
                canale.send("Grazie per aver aperto un ticket")
            })
        }
    }
})

bot.on("message", message => {
    if (message.content == "!close") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }

    if (message.content.startsWith("!add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: true
                })

                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }

                if (utente.hasPermission("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: false
                })

                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
})



bot.on("guildMemberAdd", (member) => {
    //console.log(member.guild); Per avere tutte le info del utente e del server
    bot.channels.cache.get("858371530437165116").send("Ciao " + member.toString() + " benvunuto in **" + member.guild.name + "**\rSei il **" + member.guild.memberCount + "° membro**");
})

//ADDIO
bot.on("guildMemberRemove", (member) => {
    bot.channels.cache.get("858371530437165116").send("Ciao ciao" + member.toString() + ", torna presto!");
})



bot.on("guildMemberAdd", member => {
    var canale = bot.channels.cache.get("864877480144666654")
    canale.setName("👾│members: " + member.guild.memberCount) //Impostare il nome del canale
});
bot.on("guildMemberRemove", member => {
    var canale = bot.channels.cache.get("864877480144666654")
    canale.setName("👾│members: " + member.guild.memberCount) //Impostare il nome del canale
});


bot.on("guildMemberAdd", member => {
    member.roles.add("858392031209848853");
});

bot.on("message", message => {
    if(message.content == "lol"){
        message.react("🤣")
    }
});

bot.on("message", message => {
    if(message.content == "ciao"){
        message.react("<:ciao_amici:858396808492613664>")
    }
});
