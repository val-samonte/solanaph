'use client'

import bs58 from 'bs58'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { hashv } from '@/utils/hashv'
import { trimAddress } from '@/utils/trimAddress'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

export default function ConnectPrompt({
  children,
  sessionHash,
}: Readonly<{ children: ReactNode; sessionHash: string }>) {
  const { setVisible } = useWalletModal()
  const { connecting, publicKey, disconnecting, signMessage } = useWallet()
  const [session, setSession] = useState<string>(sessionHash)

  const publicKeyHash = useMemo(() => {
    if (!publicKey) return null
    return bs58.encode(hashv([publicKey.toBuffer()]))
  }, [publicKey])

  const signIn = useCallback(async () => {
    if (!publicKey) return
    if (!signMessage) return

    const message = `Please sign this message to continue. ${Date.now().toString(
      16
    )}`
    const signature = bs58.encode(await signMessage(Buffer.from(message)))

    const payload = JSON.stringify({
      publicKey: publicKey.toBase58(),
      message,
      signature,
    })

    setSession('-')

    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      })

      if (response.ok) {
        window.location.reload()
      } else {
        throw new Error('Authentication failed')
      }
    } catch (e: any) {
      alert(e.message)
    }
  }, [publicKey, signMessage])

  const signOut = useCallback(async () => {
    await fetch('/api/signout')
    window.location.reload()
  }, [])

  useEffect(() => {
    if (!publicKeyHash) return
    if (!session) return
    if (session === '-') return

    if (publicKeyHash !== session) {
      setSession('-')
      signOut()
    }
  }, [publicKeyHash, session, signOut])

  if (connecting) return null // <>Connecting</>
  if (disconnecting) return null // <>Disconnecting</>
  if (session === '-') return null // <>Refresh page</>

  if (publicKeyHash === session) {
    return <>{children}</>
  }

  if (publicKey) {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-4'>
        <h1 className='text-3xl font-bold'>
          Hello {trimAddress(publicKey.toBase58())} Please sign in
        </h1>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      <h1 className='text-3xl font-bold'>Connect your wallet</h1>
      <p className='text-gray-600'>To continue, please connect your wallet.</p>
      <button onClick={() => setVisible(true)}>Connect</button>
    </div>
  )
}
