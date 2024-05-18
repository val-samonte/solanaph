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
  const { connecting, connected, publicKey, disconnecting, signMessage } =
    useWallet()
  const [busy, setBusy] = useState(false)

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

    setBusy(true)

    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      })

      if (response.ok) {
        // Redirect to the original URL
        window.location.reload()
      } else {
        alert('Authentication failed')
      }
    } finally {
      setBusy(false)
    }
  }, [publicKey, signMessage, setBusy])

  const signOut = useCallback(async () => {
    setBusy(true)
    try {
      await fetch('/api/signout')
    } finally {
      setBusy(false)
    }
  }, [setBusy])

  useEffect(() => {
    // only signout if and only if both the publicKeyHash and sessionHash are present but not equal
    if (!publicKeyHash) return
    if (!sessionHash) return

    if (publicKeyHash !== sessionHash) {
      // sign out
      signOut().then(() => {
        window.location.reload()
      })
    }
  }, [publicKeyHash, sessionHash])

  if (busy || connecting || disconnecting) return null

  if (publicKeyHash === sessionHash) {
    return <>{children}</>
  }

  if (connected && publicKey) {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-4'>
        <h1 className='text-3xl font-bold'>
          Hello {trimAddress(publicKey.toBase58())} Please sign in
        </h1>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    )
  }

  if (!publicKey) {
    return (
      <div className='flex flex-col items-center justify-center h-full gap-4'>
        <h1 className='text-3xl font-bold'>Connect your wallet</h1>
        <p className='text-gray-600'>
          To continue, please connect your wallet.
        </p>
        <button onClick={() => setVisible(true)}>Connect</button>
      </div>
    )
  }

  return null
}
