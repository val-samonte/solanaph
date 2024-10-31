import type * as Party from 'partykit/server'
import bs58 from 'bs58'
import { sign } from 'tweetnacl'

type Message = {
  type: 'chat'
  owner: string
  data: string
  timestamp: number
}

// post an offer
// make a deal

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  messages: Message[] = []
  participants: string[] = []

  async onStart() {
    this.messages = (await this.room.storage.get<Message[]>('messages')) ?? []
    this.participants =
      (await this.room.storage.get<string[]>('participants')) ?? []
  }

  static async onBeforeConnect(request: Party.Request, lobby: Party.Lobby) {
    console.log(lobby.id)

    const token = new URL(request.url).searchParams.get('token') ?? ''
    const [address, signature] = token.split('.')

    if (!address) {
      return new Response('Unauthorized', { status: 401 })
    }

    const apiUrl =
      // 'https://solanaph.vercel.app' +
      'http://localhost:3000' + '/api/user/' + address + '/session'

    let sessionRegistered = ''

    try {
      const response = await fetch(apiUrl)

      if (!response.ok) {
        return new Response('Getting Session Failed', { status: 500 })
      }

      sessionRegistered = await response.text()
      console.log(sessionRegistered)
    } catch (e) {
      console.log(e)
      return new Response('Unauthorized', { status: 401 })
    }

    try {
      const message = new TextEncoder().encode(address)

      if (
        !sign.detached.verify(
          message,
          bs58.decode(signature),
          bs58.decode(sessionRegistered)
        )
      ) {
        return new Response('Unauthorized', { status: 401 })
      }
    } catch (e) {
      console.log(e)
      return new Response('Unauthorized', { status: 401 })
    }

    request.headers.set('X-Wallet-Address', address)

    return request
  }

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    if (this.room.id === 'solanaph-lobby') {
      const walletAddress = ctx.request.headers.get('X-Wallet-Address')
      conn.setState({ walletAddress })
      if (walletAddress) {
        if (!this.participants.includes(walletAddress)) {
          this.participants.push(walletAddress)
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
  }

  onClose(conn: Party.Connection) {
    this.participants = this.participants.filter(
      (id) => id !== (conn.state as any)?.walletAddress
    )
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
        message.owner = (sender.state as any)?.walletAddress
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
