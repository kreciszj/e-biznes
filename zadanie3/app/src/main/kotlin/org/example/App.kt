package org.example

import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.behavior.channel.createMessage
import dev.kord.core.behavior.channel.createEmbed
import dev.kord.core.entity.channel.MessageChannel
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import kotlinx.coroutines.runBlocking
import dev.kord.gateway.Intent
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent


fun main() = runBlocking {
    val channelId = "1359597704472301592"
    val categories = listOf("Electronics", "Books", "Clothing", "Games", "Groceries")

    println("Hello World from Kotlin!")

    // Get token
    val botToken = System.getenv("DISCORD_BOT_TOKEN")
        ?: throw IllegalArgumentException("No DISCORD_BOT_TOKEN set in environment")

    val client = Kord(botToken)
    println("Logged in as: ${client.getSelf().username}")

    val channel = client.getChannel(Snowflake(channelId.toULong())) as? MessageChannel
    channel?.createMessage("Hello Discord!")
    println("Message: 'Hello Discord!' sent to channel $channelId")

    client.on<MessageCreateEvent> {
        if (message.author?.isBot == true) return@on
        println("Message received from ${message.author?.tag} '${message.content}'")

        val content = message.content.trim()
        when {
            content == "!ping" -> {
                message.channel.createMessage("pong!")
            }

            content.contains("!categories") -> {
                val formatted = categories.joinToString(separator = "\n") { "- $it" }

                message.channel.createEmbed {
                    title = "Available Categories"
                    description = formatted
                }
            }

            message.mentionedUserIds.contains(client.selfId) -> {
                message.channel.createMessage("Hello! I see you mentioned me, **${message.author?.username}**. What can I do for you?")
            }
        }
    }

    client.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}
