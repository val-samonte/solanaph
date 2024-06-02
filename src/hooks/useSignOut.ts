import bs58 from 'bs58'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { sign } from 'tweetnacl'
import { storedSessionKeypairAtom } from '@/components/Authentication'
import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'

export const useSignOut = () => {
  const { publicKey, disconnect } = useWallet()
  const router = useRouter()

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
      } catch (e) {
        console.error(e)
      }
      setStoredSession(null)
      router.push('/app')
    })()
    disconnect()
  }, [publicKey, router, setStoredSession])

  return signOut
}
