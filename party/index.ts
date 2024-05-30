import type * as Party from 'partykit/server'

type Message = {
  type: 'chat'
  owner: string
  data: string
  timestamp: number
}

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  messages: Message[] = []
  participants: string[] = []

  async onStart() {
    this.messages = (await this.room.storage.get<Message[]>('messages')) ?? []
    this.participants =
      (await this.room.storage.get<string[]>('participants')) ?? []
  }

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // todo:
    // call /api/user/:id/session
    // to validate if the user is indeed the owner of the
    // session keypair

    // when joining a specific p2p room
    // validate the signature of the hash of both
    // users engaging in the p2p chat
    // sign(hash([user1, user2].sort()))

    // do not do anything when joining the lobby

    if (this.room.id === 'solanaph-lobby') {
      if (!this.participants.includes(conn.id)) {
        this.participants.push(conn.id)
        this.room.storage.put('participants', this.participants)
        this.room.broadcast(
          JSON.stringify({
            type: 'system',
            participants: this.participants,
          }),
          [conn.id]
        )
      }
      conn.send(
        JSON.stringify({
          type: 'system',
          participants: this.participants,
          messages: this.messages.slice(-20),
        })
      )
    }
  }

  onClose(conn: Party.Connection) {
    this.participants = this.participants.filter((id) => id !== conn.id)
    this.room.storage.put('participants', this.participants)
    this.room.broadcast(
      JSON.stringify({
        type: 'system',
        participants: this.participants,
      })
    )
  }

  onMessage(messageString: string, sender: Party.Connection) {
    const message = JSON.parse(messageString) as Message

    switch (message.type) {
      case 'chat': {
        // manually assign message content to sanitize the message
        message.owner = sender.id
        message.data = message.data.slice(0, 256)
        message.timestamp = Date.now()
        this.messages.push(message)
        this.room.storage.put('messages', this.messages)
        this.room.broadcast(JSON.stringify(message), [sender.id])
      }
    }
  }
}

Server satisfies Party.Worker
