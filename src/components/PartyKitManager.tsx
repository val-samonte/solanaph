import bs58 from 'bs58'
import cn from 'classnames'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import PartySocket from 'partysocket'
import usePartySocket from 'partysocket/react'
import { useEffect, useMemo } from 'react'
import { sign } from 'tweetnacl'
import { trimAddress } from '@/utils/trimAddress'
import { Keypair } from '@solana/web3.js'
import { walletAddressAtom } from './Authentication'

type PartyKitConnectionStatus = 'online' | 'connecting' | 'offline'

type ChatMessage = {
  type: 'chat'
  owner: string
  data: string
  timestamp: number
}

type SystemMessage = {
  type: 'system'
  participants?: string[]
  messages?: ChatMessage[]
}

type Message = ChatMessage | SystemMessage

export const PartyKitConnectionStatusAtom =
  atom<PartyKitConnectionStatus>('connecting')
export const PartyKitWebsocketAtom = atom<PartySocket | null>(null)

export const ParticipantsAtom = atom<string[]>([])
const MessagesBaseAtom = atom<ChatMessage[]>([])

export const MessagesAtom = atom(
  (get) => get(MessagesBaseAtom),
  (get, set, text) => {
    const ws = get(PartyKitWebsocketAtom)
    const address = get(walletAddressAtom)

    if (ws && address) {
      const messages = get(MessagesBaseAtom)
      const newMessage = {
        type: 'chat',
        owner: address,
        data: text,
        timestamp: Date.now(),
      } as ChatMessage
      set(MessagesBaseAtom, [...messages, newMessage])
      ws.send(JSON.stringify(newMessage))
    }
  }
)

export default function PartyKitManager() {
  const connectionStatus = useAtomValue(PartyKitConnectionStatusAtom)
  const address = useAtomValue(walletAddressAtom)

  const walletAddress = useMemo(
    () => (address ? trimAddress(address) : null),
    [address]
  )

  return (
    <>
      <div className='flex gap-4 items-center'>
        <span
          className={cn(
            'w-3 h-3 rounded-full',
            connectionStatus === 'online' && 'bg-green-500',
            connectionStatus === 'connecting' && 'bg-amber-500',
            connectionStatus === 'offline' && 'bg-red-500'
          )}
        />
        <span className='capitalize'>{connectionStatus}</span>
      </div>
      {address && <PartyKitWebsocket id={address} />}
      {walletAddress && (
        <div className='flex items-center ml-auto gap-1'>
          {connectionStatus !== 'offline' && (
            <span className='text-xs dark:text-gray-600'>
              {connectionStatus === 'online' ? 'Connected as' : 'Connecting as'}
            </span>
          )}
          <span>{walletAddress}</span>
        </div>
      )}
    </>
  )
}

function PartyKitWebsocket({ id }: { id: string }) {
  const setConnectionStatus = useSetAtom(PartyKitConnectionStatusAtom)
  const setPartySocket = useSetAtom(PartyKitWebsocketAtom)
  const setMessages = useSetAtom(MessagesBaseAtom)
  const setParticipants = useSetAtom(ParticipantsAtom)

  const ws = usePartySocket({
    host: process.env.NEXT_PUBLIC_PARTYKIT_SERVER, // or localhost:1999 in dev
    room: 'solanaph-lobby',
    query: async () => {
      const storedSessionJSON = JSON.parse(
        window.localStorage.getItem(`session_${id}`) ?? 'null'
      )
      if (!storedSessionJSON) return {}

      const sessionKeypair = Keypair.fromSecretKey(
        bs58.decode(storedSessionJSON)
      )

      const signature = bs58.encode(
        sign.detached(Buffer.from(id), sessionKeypair.secretKey)
      )

      return {
        token: id + '.' + signature,
      }
    },
    onOpen() {
      console.log('connected')
      setConnectionStatus('online')
    },
    onMessage(e) {
      const message = JSON.parse(e.data) as Message
      switch (message.type) {
        case 'system': {
          if (message.participants) {
            setParticipants(message.participants)
          }
          if (message.messages) {
            setMessages(message.messages)
          }
          break
        }
        case 'chat': {
          setMessages((prev) => [...prev, message])
          break
        }
      }
    },
    onClose(e) {
      console.log('closed', e.code)

      // switch (e.code) {
      // }
    },
    onError(e) {
      console.log('error', e)
    },
  })

  useEffect(() => {
    if (ws) {
      setPartySocket(ws)
    }
    return () => {
      ws?.close()
      setPartySocket(null)
    }
  }, [ws, setPartySocket])

  useEffect(() => {
    switch (ws.readyState) {
      case WebSocket.CONNECTING:
        setConnectionStatus('connecting')
        break
      case WebSocket.OPEN:
        setConnectionStatus('online')
        break
      case WebSocket.CLOSING:
      case WebSocket.CLOSED:
        setConnectionStatus('offline')
        break
    }
  }, [ws?.readyState, setConnectionStatus])

  return null
}
