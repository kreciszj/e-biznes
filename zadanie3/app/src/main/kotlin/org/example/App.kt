package org.example

import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.behavior.channel.createMessage
import dev.kord.core.behavior.channel.createEmbed
import dev.kord.core.entity.channel.MessageChannel
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val channelId = "1359597704472301592"
    println("Hello World from Kotlin!")

    // Get token
    val botToken = System.getenv("DISCORD_BOT_TOKEN")
        ?: throw IllegalArgumentException("No DISCORD_BOT_TOKEN set in environment")

    val client = Kord(botToken)
    println("Logged in as: ${client.getSelf().username}")

    val channel = client.getChannel(Snowflake(channelId.toULong())) as? MessageChannel
    channel?.createMessage("Hello World!")
    println("Messages sent to channel $channelId")

    client.on<MessageCreateEvent> {
        val isMentioned = message.mentionedUserIds.contains(client.selfId)
        val content = message.content.trim()

        if (isMentioned) {
            if (content.contains("!ping", ignoreCase = true)) {
                message.channel.createMessage("pong!")
            }
            else {
                message.channel.createMessage("Hello! I see you mentioned me, ${message.author?.username}**.")
            }
        }
    }

    client.login()
}
