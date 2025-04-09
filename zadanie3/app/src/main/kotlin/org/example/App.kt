package org.example

import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.behavior.channel.createMessage
import dev.kord.core.behavior.channel.createEmbed
import dev.kord.core.entity.channel.MessageChannel
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
    
    channel?.createMessage("Test Message.")
    println("Messages sent to channel $channelId")

    client.shutdown()
}
