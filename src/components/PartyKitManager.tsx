import cs from 'classnames'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import PartySocket from 'partysocket'
import usePartySocket from 'partysocket/react'
import { useEffect, useMemo } from 'react'
import { trimAddress } from '@/utils/trimAddress'
import { useWallet } from '@solana/wallet-adapter-react'

type PartyKitConnectionStatus = 'online' | 'connecting' | 'offline'
export const PartyKitConnectionStatusAtom =
  atom<PartyKitConnectionStatus>('connecting')
export const PartyKitWebsocketAtom = atom<PartySocket | null>(null)

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

  const ws = usePartySocket({
    host: process.env.NEXT_PUBLIC_PARTYKIT_SERVER, // or localhost:1999 in dev
    room: 'solanaph-lobby',
    id,
    onOpen() {
      console.log('connected')
      setConnectionStatus('online')
    },
    onMessage(e) {
      console.log('message', e.data)
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
