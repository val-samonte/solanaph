import bs58 from 'bs58'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import {
  storedSessionKeypairAtom,
  walletAddressAtom,
} from '@/components/Authentication'
import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'

export const useSignIn = () => {
  const { signMessage } = useWallet()
  const walletAddress = useAtomValue(walletAddressAtom)
  const setStoredSession = useSetAtom(
    storedSessionKeypairAtom(walletAddress || '')
  )

  const signIn = useCallback(async () => {
    if (!walletAddress) return
    if (!signMessage) return

    const sessionKeypair = Keypair.generate()
    const sessionPublicKey = sessionKeypair.publicKey.toBase58()
    const timestamp = Date.now().toString(16)
    const message = `Solana Philippines would like you to sign this message to continue\n ${sessionPublicKey} ${timestamp}`
    const signature = bs58.encode(await signMessage(Buffer.from(message)))

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          signature,
          owner_publickey: walletAddress,
        }),
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      setStoredSession(bs58.encode(sessionKeypair.secretKey))
    } catch (e) {
      console.error(e)
    }
  }, [walletAddress, signMessage])

  return signIn
}
