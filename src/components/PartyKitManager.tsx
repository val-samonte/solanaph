import cs from 'classnames'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import PartySocket from 'partysocket'
import usePartySocket from 'partysocket/react'
import { useEffect, useMemo } from 'react'
import { trimAddress } from '@/utils/trimAddress'
import { useWallet } from '@solana/wallet-adapter-react'

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

    if (ws) {
      const messages = get(MessagesBaseAtom)
      const newMessage = {
        type: 'chat',
        owner: ws.id,
        data: text,
        timestamp: Date.now(),
      } as ChatMessage
      set(MessagesBaseAtom, [...messages, newMessage])
      ws.send(JSON.stringify(newMessage))
    }
  }
)

export default function PartyKitManager() {
  const { publicKey } = useWallet()
  const connectionStatus = useAtomValue(PartyKitConnectionStatusAtom)

  const walletAddress = useMemo(
    () => (publicKey ? trimAddress(publicKey.toBase58()) : null),
    [publicKey]
  )

  return (
    <>
      <div className='flex gap-4 items-center'>
        <span
          className={cs(
            'w-3 h-3 rounded-full',
            connectionStatus === 'online' && 'bg-green-500',
            connectionStatus === 'connecting' && 'bg-amber-500',
            connectionStatus === 'offline' && 'bg-red-500'
          )}
        />
        <span className='capitalize'>{connectionStatus}</span>
      </div>
      {publicKey && <PartyKitWebsocket id={publicKey.toBase58()} />}
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
    id,
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
    onClose() {
      console.log('closed')
      setConnectionStatus('offline')
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

  return null
}
