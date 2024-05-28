import bs58 from 'bs58'
import cs from 'classnames'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { useCallback } from 'react'
import { sign } from 'tweetnacl'
import {
  ChatCircle,
  DotsNine,
  GearSix,
  Monitor,
  Swap,
  Wallet,
} from '@phosphor-icons/react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'
import { storedSessionKeypairAtom } from './ConnectPrompt'

export default function AppNav() {
  const { publicKey, disconnect } = useWallet()

  const setStoredSession = useSetAtom(
    storedSessionKeypairAtom(publicKey?.toBase58() || '')
  )

  const signOut = useCallback(async () => {
    await (async () => {
      if (!publicKey) return

      const storedSession = JSON.parse(
        window.localStorage.getItem(`session_${publicKey}`) ?? 'null'
      )
      if (!storedSession) return

      const sessionKeypair = Keypair.fromSecretKey(bs58.decode(storedSession))

      const message = `Signout ${publicKey.toBase58()}`
      const signature = sign.detached(
        Buffer.from(message),
        sessionKeypair.secretKey
      )

      try {
        const response = await fetch('/api/signout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            signature: bs58.encode(signature),
            session_publickey: sessionKeypair.publicKey.toBase58(),
          }),
        })

        if (!response.ok) {
          throw new Error('Signout failed')
        }

        setStoredSession(null)
        window.localStorage.removeItem(`session_${publicKey}`)
      } catch (e) {
        console.error(e)
      }
    })()
    disconnect()
  }, [publicKey, setStoredSession])

  return (
    <nav className='h-full w-11 flex flex-col gap-2'>
      <Image width={44} height={44} src='/logo.svg' alt='Solana Philippines' />
      <div className='flex flex-col gap-2'>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <Swap size={30} />
        </button>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <Monitor size={30} />
        </button>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <ChatCircle size={30} />
        </button>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <DotsNine size={30} />
        </button>
      </div>
      <div className='mt-auto flex flex-col gap-2'>
        <button
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <GearSix size={30} />
        </button>
        <button
          onClick={() => signOut()}
          className={cs(
            'w-11 h-11 flex items-center justify-center rounded-lg',
            'bg-transparent hover:bg-white/10',
            'transition-all duration-300'
          )}
        >
          <Wallet size={30} />
        </button>
      </div>
    </nav>
  )
}
